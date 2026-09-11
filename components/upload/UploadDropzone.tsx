"use client";

import { useCallback, useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language/LanguageProvider";

interface UploadDropzoneProps {
  onFilesSelected: (files: File[]) => void;
}

export function UploadDropzone({ onFilesSelected }: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { dict } = useLanguage();

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;
      onFilesSelected(Array.from(fileList).filter((f) => f.type.startsWith("image/")));
    },
    [onFilesSelected]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center transition-colors duration-300",
        isDragging ? "bg-card" : "hover:bg-card/60"
      )}
    >
      <UploadCloud size={28} className="text-secondary" />
      <div>
        <p className="text-sm">{dict.upload.dropHint}</p>
        <p className="mt-1 text-xs tracking-widest2 text-secondary">
          {dict.upload.selectHint}
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
