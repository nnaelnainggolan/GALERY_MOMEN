import type { Photo } from "@/types/photo";

export interface MonthGroup {
  /** "2025-06" (year-month) or "undated" for photos with no taken_at */
  key: string;
  photos: Photo[];
}

/**
 * Groups photos by the month they were taken (year-month, derived from
 * `takenAt` — which itself is usually set automatically from a photo's
 * EXIF date at upload time). Photos with no date land in an "undated"
 * bucket at the end so nothing silently disappears.
 *
 * Display labels are intentionally NOT computed here — they depend on
 * the active language (locale-aware month names), so that's handled by
 * the UI layer via `lib/month-label.ts`.
 */
export function groupPhotosByMonth(photos: Photo[]): MonthGroup[] {
  const buckets = new Map<string, Photo[]>();

  for (const photo of photos) {
    const key = photo.takenAt ? photo.takenAt.slice(0, 7) : "undated";
    const existing = buckets.get(key);
    if (existing) existing.push(photo);
    else buckets.set(key, [photo]);
  }

  const groups: MonthGroup[] = Array.from(buckets.entries()).map(
    ([key, groupPhotos]) => ({ key, photos: groupPhotos })
  );

  groups.sort((a, b) => {
    if (a.key === "undated") return 1;
    if (b.key === "undated") return -1;
    return b.key.localeCompare(a.key); // newest month first
  });

  return groups;
}
