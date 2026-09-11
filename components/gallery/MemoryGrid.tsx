"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MemoryCard } from "./MemoryCard";
import type { Photo } from "@/types/photo";
import { cn } from "@/lib/utils";

const PhotoViewer = dynamic(() =>
  import("./PhotoViewer").then((mod) => mod.PhotoViewer)
);

interface MemoryGridProps {
  photos: Photo[];
}

// Cycles through varied aspect ratios so the mosaic still reads as
// editorial (not a uniform tile wall) while the CSS multi-column layout
// below packs each photo into the shortest column — unlike CSS Grid rows,
// this never leaves leftover gaps no matter how the heights land.
const aspects = [
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[16/11]",
  "aspect-[5/4]",
  "aspect-[3/4]",
  "aspect-[4/5]",
  "aspect-square",
];

export function MemoryGrid({ photos }: MemoryGridProps) {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <div className="columns-2 gap-4 sm:columns-3 md:gap-6 lg:columns-4">
        {photos.map((photo, i) => (
          <div key={photo.id} className="mb-4 break-inside-avoid md:mb-6">
            <MemoryCard
              photo={photo}
              onClick={() => setIndex(i)}
              className={cn("w-full", aspects[i % aspects.length])}
            />
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
