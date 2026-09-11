"use client";

import { motion } from "framer-motion";
import { PhotoFrame } from "@/components/gallery/PhotoFrame";
import type { Photo } from "@/types/photo";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  photo?: Photo;
  align: "left" | "right";
}

export function TimelineItem({
  year,
  title,
  description,
  photo,
  align,
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="relative grid grid-cols-1 items-center gap-8 py-14 md:grid-cols-2 md:gap-16"
    >
      {/* Marker on the continuous center line (drawn by MemoryTimeline) */}
      <span className="pointer-events-none absolute left-1/2 top-1/2 hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-bg bg-primary md:block" />

      <div className={cn(align === "right" && "md:order-2")}>
        <span className="font-serif text-6xl text-secondary md:text-7xl">
          {year}
        </span>
        <h3 className="mt-4 text-2xl font-medium">{title}</h3>
        <p className="mt-2 max-w-md text-sm text-secondary">{description}</p>
      </div>

      {photo && (
        <PhotoFrame
          photo={photo}
          rotate={align === "left" ? 2 : -2}
          className={cn(
            "aspect-[4/3] w-full max-w-md justify-self-center",
            align === "right" && "md:order-1"
          )}
        />
      )}
    </motion.div>
  );
}
