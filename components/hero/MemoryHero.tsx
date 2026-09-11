"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MemoryStack } from "./MemoryStack";
import { HeroTypography } from "./HeroTypography";
import { ScrollIndicator } from "./ScrollIndicator";
import { useLanguage } from "@/components/language/LanguageProvider";
import type { Photo } from "@/types/photo";

// Not needed until a photo in the stack is actually clicked, so it's
// split into its own chunk instead of bloating the hero's initial JS.
const PhotoViewer = dynamic(() =>
  import("@/components/gallery/PhotoViewer").then((mod) => mod.PhotoViewer)
);
export function MemoryHero({ photos }: { photos: Photo[] }) {
  const [selected, setSelected] = useState<Photo | null>(null);
  const { dict } = useLanguage();
  const selectedIndex = selected
    ? photos.findIndex((p) => p.id === selected.id)
    : -1;

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden pb-10">
      <div className="pointer-events-none absolute inset-x-0 top-24 flex justify-center opacity-[0.06]">
        <span className="font-sans text-[18vw] font-black tracking-tight">
          MEMORIES
        </span>
      </div>

      <div className="relative mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-1 items-center gap-10 px-6 pt-40 pb-10 md:grid-cols-2 md:px-10 md:pt-20">
        <div>
          <p className="eyebrow mb-6">{dict.hero.eyebrow}</p>
          <HeroTypography
            lines={[...dict.hero.lines]}
            outlinedLine={dict.hero.outlined}
          />
          <p className="mt-8 max-w-sm text-sm text-secondary">
            {dict.hero.subtitle}
          </p>
        </div>

        <MemoryStack photos={photos} onSelect={setSelected} />
      </div>

      <div className="relative flex justify-center">
        <ScrollIndicator label={dict.hero.scroll} />
      </div>

      <PhotoViewer
        photos={photos}
        index={selectedIndex}
        onClose={() => setSelected(null)}
        onNavigate={(i) => setSelected(photos[i])}
      />
    </section>
  );
}
