"use client";

import { useState } from "react";
import { UploadDropzone } from "./UploadDropzone";
import { UploadPreview, type PendingFile } from "./UploadPreview";
import { createClient } from "@/lib/supabase/client";
import { extractPhotoDate } from "@/lib/exif";
import { useLanguage } from "@/components/language/LanguageProvider";

export function UploadModal() {
  const [files, setFiles] = useState<PendingFile[]>([]);
  const [album, setAlbum] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [caption, setCaption] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const { dict } = useLanguage();

  function addFiles(newFiles: File[]) {
    const entries: PendingFile[] = newFiles.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      progress: 0,
      takenAt: null,
      checkingDate: true,
    }));

    setFiles((prev) => [...prev, ...entries]);

    // Read each file's EXIF date in the background — no need to wait
    // for it before showing the preview grid.
    entries.forEach((entry) => {
      extractPhotoDate(entry.file).then((result) => {
        setFiles((prev) =>
          prev.map((f) =>
            f.previewUrl === entry.previewUrl
              ? { ...f, takenAt: result?.isoDate ?? null, checkingDate: false }
              : f
          )
        );
        // Auto-fill the shared date field from the first detected date,
        // but never overwrite something the user already typed.
        if (result) {
          setDate((prev) => prev || result.isoDate);
        }
      });
    });
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    if (files.length === 0) {
      setStatus(dict.upload.needPhoto);
      return;
    }

    setSaving(true);
    setStatus(null);
    const supabase = createClient();

    try {
      // Resolve or create the album by title.
      let albumId: string | null = null;
      if (album.trim()) {
        const slug = album.trim().toLowerCase().replace(/\s+/g, "-");
        const { data: existing } = await supabase
          .from("albums")
          .select("id")
          .eq("slug", slug)
          .maybeSingle();

        if (existing) {
          albumId = existing.id;
        } else {
          const { data: created, error } = await supabase
            .from("albums")
            .insert({ title: album.trim(), slug })
            .select("id")
            .single();
          if (error) throw error;
          albumId = created.id;
        }
      }

      for (let i = 0; i < files.length; i++) {
        const { file, takenAt } = files[i];
        const path = `${albumId ?? "unsorted"}/${crypto.randomUUID()}-${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("photos")
          .upload(path, file, { upsert: false });
        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("photos").getPublicUrl(path);

        const { error: insertError } = await supabase.from("photos").insert({
          album_id: albumId,
          storage_path: path,
          image_url: publicUrl,
          caption: caption || null,
          // Prefer the date read from the photo's own EXIF data; only
          // fall back to the manually entered field when EXIF is missing.
          taken_at: takenAt ?? date ?? null,
          location: location || null,
          is_favorite: isFavorite,
          sort_order: i,
        });
        if (insertError) throw insertError;

        setFiles((prev) =>
          prev.map((f, idx) => (idx === i ? { ...f, progress: 100 } : f))
        );
      }

      setStatus(dict.upload.saved);
      setFiles([]);
      setCaption("");
      setLocation("");
      setDate("");
    } catch (err) {
      console.error(err);
      setStatus(
        err instanceof Error
          ? `${dict.upload.errorPrefix} ${err.message}`
          : dict.upload.errorGeneric
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="eyebrow mb-3">{dict.upload.title}</p>
      <UploadDropzone onFilesSelected={addFiles} />
      <UploadPreview files={files} onRemove={removeFile} />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label={dict.upload.album}>
          <input
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            placeholder="Summer 2025"
            className="field"
          />
        </Field>
        <Field label={dict.upload.date} hint={dict.upload.dateHint}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="field"
          />
        </Field>
        <Field label={dict.upload.location}>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Medan, Indonesia"
            className="field"
          />
        </Field>
        <label className="flex items-center gap-2 self-end pb-2 text-sm">
          <input
            type="checkbox"
            checked={isFavorite}
            onChange={(e) => setIsFavorite(e.target.checked)}
          />
          {dict.upload.favorite}
        </label>
        <Field label={dict.upload.caption} full>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={3}
            placeholder={dict.upload.captionPlaceholder}
            className="field resize-none"
          />
        </Field>
      </div>

      {status && <p className="mt-4 text-sm text-secondary">{status}</p>}

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-8 w-full rounded-full bg-primary py-4 text-xs tracking-widest2 text-bg transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-50"
      >
        {saving ? dict.upload.saving : dict.upload.save}
      </button>

      <style jsx global>{`
        .field {
          width: 100%;
          background: transparent;
          border-bottom: 1px solid var(--color-border);
          padding: 8px 0;
          font-size: 0.875rem;
          outline: none;
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
  full,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
  hint?: string;
}) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <label className="mb-2 block text-xs tracking-widest2 text-secondary">
        {label.toUpperCase()}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-[11px] text-secondary">{hint}</p>}
    </div>
  );
}
