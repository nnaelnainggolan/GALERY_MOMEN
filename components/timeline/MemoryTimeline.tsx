"use client";

import { TimelineItem } from "./TimelineItem";
import { placeholderPhotos } from "@/data/placeholders";
import { useLanguage } from "@/components/language/LanguageProvider";

export function MemoryTimeline() {
  const { dict } = useLanguage();

  return (
    <div className="relative">
      {/* Single continuous line running through every entry, instead of
          a repeated top border per row — reads as one coherent timeline. */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-border md:block" />

      {dict.timeline.map((entry, i) => (
        <TimelineItem
          key={entry.year}
          year={entry.year}
          title={entry.title}
          description={entry.description}
          photo={placeholderPhotos[i * 3]}
          align={i % 2 === 0 ? "left" : "right"}
        />
      ))}
    </div>
  );
}
