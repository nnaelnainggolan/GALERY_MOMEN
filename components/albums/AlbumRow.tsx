"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import type { Album } from "@/types/album";
import { useLanguage } from "@/components/language/LanguageProvider";

interface AlbumRowProps {
  album: Album;
  number: number;
}

export function AlbumRow({ album, number }: AlbumRowProps) {
  const [hovered, setHovered] = useState(false);
  const { dict } = useLanguage();

  return (
    <Link
      href={`/albums/${album.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative block border-b border-border py-8 transition-colors duration-300 hover:bg-card/40 md:py-10"
    >
      <div className="flex items-center justify-between gap-6 px-2">
        <div className="flex items-baseline gap-6">
          <span className="font-mono text-sm text-secondary">
            {String(number).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-serif text-2xl md:text-4xl">{album.title}</h3>
            <p className="mt-1 text-sm text-secondary">{album.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <span className="hidden text-xs tracking-widest2 text-secondary sm:inline">
            {album.photoCount} {dict.common.photos}
          </span>
          <motion.span animate={{ x: hovered ? 6 : 0 }} transition={{ duration: 0.3 }}>
            <ArrowRight size={18} />
          </motion.span>
        </div>
      </div>

      {hovered && album.coverImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: -3 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute right-16 top-1/2 hidden h-40 w-32 -translate-y-1/2 overflow-hidden rounded-md border border-border shadow-xl md:block"
        >
          <Image src={album.coverImage} alt={album.title} fill className="object-cover" />
        </motion.div>
      )}
    </Link>
  );
}
