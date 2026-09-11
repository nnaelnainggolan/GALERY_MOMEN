"use client";

import { useMemo, useState } from "react";
import { MemoryGrid } from "@/components/gallery/MemoryGrid";
import {
  galleryFilters,
  sortOptions,
  type GalleryFilter,
  type SortOption,
} from "@/data/categories";
import { useLanguage } from "@/components/language/LanguageProvider";
import type { Photo } from "@/types/photo";
import { cn } from "@/lib/utils";

export function GalleryClient({ photos }: { photos: Photo[] }) {
  const [filter, setFilter] = useState<GalleryFilter>("ALL");
  const [sort, setSort] = useState<SortOption>("Newest");
  const { dict } = useLanguage();

  const filtered = useMemo(() => {
    let list = [...photos];
    if (filter === "FAVORITES") list = list.filter((p) => p.isFavorite);
    // PEOPLE / PLACES / EVENTS are placeholders until category metadata
    // exists in the schema — they currently fall back to the full set.

    list.sort((a, b) => {
      const aDate = new Date(a.takenAt ?? 0).getTime();
      const bDate = new Date(b.takenAt ?? 0).getTime();
      return sort === "Newest" ? bDate - aDate : aDate - bDate;
    });

    return list;
  }, [photos, filter, sort]);

  return (
    <>
      <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3">
          {galleryFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border border-border px-4 py-1.5 text-[11px] tracking-widest2 transition-colors duration-300",
                filter === f ? "bg-primary text-bg" : "hover:bg-card"
              )}
            >
              {dict.gallery.filters[f]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs tracking-widest2 text-secondary">
          {dict.gallery.sortBy}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="bg-transparent text-primary outline-none"
          >
            {sortOptions.map((s) => (
              <option key={s} value={s}>
                {dict.gallery.sort[s]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-12">
        <MemoryGrid photos={filtered} />
      </div>
    </>
  );
}
