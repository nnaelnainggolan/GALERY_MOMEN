export const galleryFilters = [
  "ALL",
  "RECENT",
  "FAVORITES",
  "PEOPLE",
  "PLACES",
  "EVENTS",
] as const;

export type GalleryFilter = (typeof galleryFilters)[number];

export const sortOptions = ["Newest", "Oldest"] as const;
export type SortOption = (typeof sortOptions)[number];
