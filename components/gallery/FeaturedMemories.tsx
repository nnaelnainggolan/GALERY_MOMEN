"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { MemoryCard } from "./MemoryCard";
import { useLanguage } from "@/components/language/LanguageProvider";
import type { Photo } from "@/types/photo";
import dynamic from "next/dynamic";

const PhotoViewer = dynamic(() =>
  import("./PhotoViewer").then((mod) => mod.PhotoViewer)
);

export function FeaturedMemories({ photos: featuredPhotos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(-1);
  const { dict } = useLanguage();

  return (
    <Section className="py-24 md:py-32">
      <SectionHeading
        eyebrow={dict.sections.featured.eyebrow}
        heading={dict.sections.featured.heading}
      />

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-6 md:gap-8">
        <MemoryCard
          photo={featuredPhotos[0]}
          onClick={() => setIndex(0)}
          className="aspect-[4/5] md:col-span-3 md:row-span-2"
        />
        <MemoryCard
          photo={featuredPhotos[1]}
          onClick={() => setIndex(1)}
          className="aspect-square md:col-span-3 md:translate-y-10"
        />
        <MemoryCard
          photo={featuredPhotos[2]}
          onClick={() => setIndex(2)}
          className="aspect-[16/10] md:col-span-3"
        />
        <MemoryCard
          photo={featuredPhotos[3]}
          onClick={() => setIndex(3)}
          className="aspect-[4/5] md:col-span-2 md:-translate-y-6"
        />
        <MemoryCard
          photo={featuredPhotos[4]}
          onClick={() => setIndex(4)}
          className="aspect-[4/5] md:col-span-4"
        />
      </div>

      <PhotoViewer
        photos={featuredPhotos}
        index={index}
        onClose={() => setIndex(-1)}
        onNavigate={setIndex}
      />
    </Section>
  );
}
