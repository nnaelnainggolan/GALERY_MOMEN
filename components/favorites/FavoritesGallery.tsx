"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Download, Heart, Share2 } from "lucide-react";
import { PhotoFrame } from "@/components/gallery/PhotoFrame";
import { useLanguage } from "@/components/language/LanguageProvider";
import type { Photo } from "@/types/photo";

const PhotoViewer = dynamic(() =>
  import("@/components/gallery/PhotoViewer").then((mod) => mod.PhotoViewer)
);

export function FavoritesGallery({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(-1);
  const { dict } = useLanguage();

  if (photos.length === 0) {
    return (
      <p className="py-24 text-center text-sm text-secondary">
        {dict.favoritesEmpty}
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, i) => (
          <div key={photo.id} className="group relative">
            <button
              onClick={() => setIndex(i)}
              className="block w-full"
              aria-label={`Open ${photo.title ?? "photograph"}`}
            >
              <PhotoFrame photo={photo} className="aspect-[4/5] w-full" />
            </button>
            <div className="mt-3 flex items-center justify-between">
              {photo.caption && (
                <p className="font-serif text-sm italic text-secondary">
                  &quot;{photo.caption}&quot;
                </p>
              )}
              <div className="flex gap-3 text-secondary">
                <button aria-label="Unfavorite">
                  <Heart size={15} fill="currentColor" />
                </button>
                <button aria-label="Download">
                  <Download size={15} />
                </button>
                <button aria-label="Share">
                  <Share2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <PhotoViewer
        photos={photos}
        index={index}
        onClose={() => setIndex(-1)}
        onNavigate={setIndex}
      />
    </>
  );
}
