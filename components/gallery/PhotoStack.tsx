"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PhotoFrame } from "./PhotoFrame";
import type { Photo } from "@/types/photo";

interface PhotoStackProps {
  photos: Photo[];
}

const rotations = [-4, 3, -2, 5, -3, 4, -5];

export function PhotoStack({ photos }: PhotoStackProps) {
  const [order, setOrder] = useState(photos);

  function sendToBack(id: string) {
    setOrder((prev) => {
      const rest = prev.filter((p) => p.id !== id);
      const moved = prev.find((p) => p.id === id);
      return moved ? [...rest, moved] : prev;
    });
  }

  if (order.length === 0) return null;

  return (
    <div className="relative mx-auto flex h-[420px] w-full max-w-sm items-center justify-center">
      <AnimatePresence>
        {order
          .slice(0, 5)
          .reverse()
          .map((photo, i, arr) => {
            const isTop = i === arr.length - 1;
            const depth = arr.length - 1 - i;

            return (
              <motion.div
                key={photo.id}
                className="absolute h-[340px] w-[280px]"
                style={{ zIndex: i }}
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: depth * 6,
                  rotate: rotations[depth % rotations.length],
                }}
                exit={{ x: 260, opacity: 0, rotate: 18, transition: { duration: 0.4 } }}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.x) > 120) sendToBack(photo.id);
                }}
                onClick={() => isTop && sendToBack(photo.id)}
                whileTap={{ cursor: "grabbing" }}
              >
                <PhotoFrame
                  photo={photo}
                  forceStyle="simple"
                  className="h-full w-full border-[3px] border-bg shadow-[0_20px_45px_-18px_rgba(0,0,0,0.4)]"
                />
              </motion.div>
            );
          })}
      </AnimatePresence>
    </div>
  );
}
