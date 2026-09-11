"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useLanguage } from "@/components/language/LanguageProvider";
import type { Photo } from "@/types/photo";

interface PhotoViewerProps {
  photos: Photo[];
  index: number; // -1 = closed
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function PhotoViewer({
  photos,
  index,
  onClose,
  onNavigate,
}: PhotoViewerProps) {
  const isOpen = index >= 0 && index < photos.length;
  const photo = isOpen ? photos[index] : null;
  const { lang } = useLanguage();

  const goPrev = useCallback(() => {
    if (!isOpen) return;
    onNavigate((index - 1 + photos.length) % photos.length);
  }, [index, isOpen, onNavigate, photos.length]);

  const goNext = useCallback(() => {
    if (!isOpen) return;
    onNavigate((index + 1) % photos.length);
  }, [index, isOpen, onNavigate, photos.length]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {isOpen && photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-black/95 px-4 py-10 text-white"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={onClose}
            aria-label="Close viewer"
            className="absolute right-6 top-6 rounded-full p-2 hover:bg-white/10"
          >
            <X size={22} />
          </button>

          <span className="mb-4 font-mono text-xs tracking-widest2 text-white/60">
            {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </span>

          <div className="relative flex w-full flex-1 items-center justify-center">
            <button
              onClick={goPrev}
              aria-label="Previous photo"
              className="absolute left-0 z-10 rounded-full p-2 hover:bg-white/10 md:left-6"
            >
              <ChevronLeft size={28} />
            </button>

            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="relative h-[60vh] w-full max-w-3xl md:h-[70vh]"
            >
              <Image
                src={photo.imageUrl}
                alt={photo.title ?? photo.caption ?? "A stored memory"}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </motion.div>

            <button
              onClick={goNext}
              aria-label="Next photo"
              className="absolute right-0 z-10 rounded-full p-2 hover:bg-white/10 md:right-6"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          <div className="mt-6 text-center">
            {(photo.takenAt || photo.location) && (
              <p className="text-xs tracking-widest2 text-white/60">
                {formatDate(photo.takenAt, lang === "id" ? "id-ID" : "en-US")}
                {photo.takenAt && photo.location ? " · " : ""}
                {photo.location?.toUpperCase()}
              </p>
            )}
            {photo.caption && (
              <p className="mt-2 font-serif text-lg text-white/90">
                &quot;{photo.caption}&quot;
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
