"use client";

import { X } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/components/language/LanguageProvider";

export interface PendingFile {
  file: File;
  previewUrl: string;
  progress: number; // 0-100, 100 = done
  takenAt: string | null; // yyyy-mm-dd, detected from EXIF (or null)
  checkingDate: boolean;
}

interface UploadPreviewProps {
  files: PendingFile[];
  onRemove: (index: number) => void;
}

export function UploadPreview({ files, onRemove }: UploadPreviewProps) {
  const { dict, lang } = useLanguage();

  if (files.length === 0) return null;

  return (
    <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
      {files.map((item, i) => (
        <div key={item.previewUrl}>
          <div className="relative aspect-square overflow-hidden rounded-lg border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.previewUrl}
              alt={item.file.name}
              className="h-full w-full object-cover"
            />
            <button
              onClick={() => onRemove(i)}
              aria-label="Remove photo"
              className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white"
            >
              <X size={12} />
            </button>
            {item.progress > 0 && item.progress < 100 && (
              <div className="absolute inset-x-0 bottom-0 h-1 bg-black/20">
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            )}
          </div>
          <p className="mt-1.5 truncate text-[10px] tracking-wide text-secondary">
            {item.checkingDate
              ? dict.upload.checkingDate
              : item.takenAt
              ? formatDate(item.takenAt, lang === "id" ? "id-ID" : "en-US")
              : dict.upload.noDateDetected}
          </p>
        </div>
      ))}
    </div>
  );
}
