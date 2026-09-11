"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PhotoFrame } from "@/components/gallery/PhotoFrame";
import type { Photo } from "@/types/photo";

interface MemoryStackProps {
  photos: Photo[];
  onSelect?: (photo: Photo) => void;
}

// A calmer, tighter arrangement than a scattered pile — small offsets
// and modest rotation so it reads as "neatly fanned" rather than tossed.
const baseTransforms = [
  { x: -18, y: 6, rotate: -4 },
  { x: 12, y: -6, rotate: 3 },
  { x: -6, y: 14, rotate: -2 },
  { x: 20, y: 2, rotate: 4 },
  { x: -10, y: -12, rotate: -3 },
  { x: 24, y: -8, rotate: 3 },
  { x: -22, y: 12, rotate: 2 },
];

// Where each photo travels once the stack "spreads" on hover/tap.
const spreadTransforms = [
  { x: -190, y: 40, rotate: -10 },
  { x: 150, y: -60, rotate: 6 },
  { x: -20, y: 120, rotate: -3 },
  { x: 210, y: 70, rotate: 10 },
  { x: -230, y: -60, rotate: -8 },
  { x: 260, y: -10, rotate: 8 },
  { x: -80, y: -110, rotate: -6 },
];

export function MemoryStack({ photos, onSelect }: MemoryStackProps) {
  const [active, setActive] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const items = photos.slice(0, 7);

  return (
    <div
      className="relative ml-auto -translate-x-14 flex h-[360px] w-full max-w-[420px] items-center justify-center md:h-[440px]"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onTouchStart={() => setActive((prev) => !prev)}
      
    >
      {items.map((photo, i) => {
        const base = baseTransforms[i % baseTransforms.length];
        const spread = spreadTransforms[i % spreadTransforms.length];
        // With reduced motion, skip the spread-apart animation and just
        // show the settled stack — no large transforms to compute/paint.
        const target = prefersReducedMotion ? base : active ? spread : base;

        return (
          <motion.button
            key={photo.id}
            type="button"
            aria-label={`View ${photo.title ?? "photograph"}`}
            className="absolute h-[240px] w-[190px] cursor-[inherit] md:h-[300px] md:w-[240px]"
            style={{ zIndex: active ? 10 - i : items.length - i }}
            initial={false}
            animate={{
              x: target.x,
              y: target.y,
              rotate: target.rotate,
              scale: !prefersReducedMotion && active ? 1.02 : 1,
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={() => onSelect?.(photo)}
          >
            <PhotoFrame
              photo={photo}
              forceStyle="simple"
              className="h-full w-full border-[3px] border-bg shadow-[0_18px_40px_-15px_rgba(0,0,0,0.35)]"
            />
          </motion.button>
        );
      })}
    </div>
  );
}
