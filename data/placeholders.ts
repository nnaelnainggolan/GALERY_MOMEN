import type { Photo } from "@/types/photo";
import type { Album } from "@/types/album";

// Deterministic placeholder images so layout is stable during development.
// Swap these for real Supabase Storage URLs once the owner uploads photographs.
function seedUrl(seed: string, w: number, h: number) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

export const placeholderAlbums: Album[] = [
  {
    id: "album-summer-2025",
    title: "SUMMER 2025",
    slug: "summer-2025",
    description: "Days I wish lasted longer.",
    coverImage: seedUrl("summer2025", 900, 1200),
    photoCount: 24,
  },
  {
    id: "album-campus-life",
    title: "CAMPUS LIFE",
    slug: "campus-life",
    description: "Small moments from university.",
    coverImage: seedUrl("campuslife", 900, 1200),
    photoCount: 38,
  },
  {
    id: "album-travels",
    title: "TRAVELS",
    slug: "travels",
    description: "Places that became memories.",
    coverImage: seedUrl("travels", 900, 1200),
    photoCount: 56,
  },
];

const frameStyles: Photo["frameStyle"][] = [
  "editorial",
  "physical",
  "simple",
  "polaroid",
];

export const placeholderPhotos: Photo[] = Array.from({ length: 24 }).map(
  (_, i) => {
    const album = placeholderAlbums[i % placeholderAlbums.length];
    const orientation = i % 3 === 0 ? "portrait" : i % 3 === 1 ? "landscape" : "square";
    const [w, h] =
      orientation === "portrait"
        ? [900, 1200]
        : orientation === "landscape"
        ? [1400, 933]
        : [1000, 1000];

    return {
      id: `photo-${i + 1}`,
      albumId: album.id,
      imageUrl: seedUrl(`memory-${i}`, w, h),
      title: `Memory ${i + 1}`,
      caption:
        i % 2 === 0
          ? "One of those days I wish I could replay."
          : "A perfect afternoon.",
      location: i % 2 === 0 ? "Medan, Indonesia" : "Yogyakarta, Indonesia",
      takenAt: new Date(2025, i % 12, ((i * 3) % 27) + 1).toISOString(),
      isFavorite: i % 5 === 0,
      sortOrder: i,
      width: w,
      height: h,
      frameStyle: frameStyles[i % frameStyles.length],
    };
  }
);

export const heroStackPhotos = placeholderPhotos.slice(0, 5);
export const featuredPhotos = placeholderPhotos.slice(0, 5);
export const favoritePhotos = placeholderPhotos.filter((p) => p.isFavorite);

export const timelineEntries = [
  { year: "2021", title: "First memories", description: "Where the archive begins." },
  { year: "2022", title: "New places", description: "A year of first trips." },
  { year: "2023", title: "Important people", description: "The faces that stayed." },
  { year: "2024", title: "New chapter", description: "Everything changed, quietly." },
  { year: "2025", title: "More moments", description: "Small adventures, often." },
  { year: "2026", title: "Still collecting memories", description: "The archive continues." },
];
