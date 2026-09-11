"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { formatDate, cn } from "@/lib/utils";
import { useLanguage } from "@/components/language/LanguageProvider";
import type { Photo } from "@/types/photo";

interface MemoryCardProps {
  photo: Photo;
  className?: string;
  onClick?: () => void;
  sizes?: string;
}

export function MemoryCard({ photo, className, onClick, sizes }: MemoryCardProps) {
  const { lang } = useLanguage();
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -6 }}
      className={cn(
        "group relative block overflow-hidden rounded-xl border border-border text-left",
        className
      )}
    >
      <div className="relative h-full w-full">
        <Image
          src={photo.imageUrl}
          alt={photo.title ?? photo.caption ?? "A stored memory"}
          fill
          sizes={sizes ?? "(max-width: 768px) 90vw, 32vw"}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {photo.takenAt && (
            <p className="text-[10px] tracking-widest2 text-white/80">
              {formatDate(photo.takenAt, lang === "id" ? "id-ID" : "en-US")}
            </p>
          )}
          {photo.location && (
            <p className="text-[10px] tracking-widest2 text-white/60">
              {photo.location}
            </p>
          )}
          {photo.caption && (
            <p className="mt-1 font-serif text-sm italic text-white">
              &quot;{photo.caption}&quot;
            </p>
          )}
        </div>
      </div>
    </motion.button>
  );
}
