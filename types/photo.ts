export type PhotoFrameStyle = "simple" | "physical" | "editorial" | "polaroid";

export interface Photo {
  id: string;
  albumId: string;
  imageUrl: string;
  thumbUrl?: string;
  title?: string;
  caption?: string;
  location?: string;
  takenAt?: string; // ISO date
  isFavorite: boolean;
  sortOrder: number;
  width?: number;
  height?: number;
  frameStyle?: PhotoFrameStyle;
}

export interface PhotoRow {
  id: string;
  album_id: string;
  storage_path: string;
  image_url: string;
  title: string | null;
  caption: string | null;
  taken_at: string | null;
  location: string | null;
  is_favorite: boolean;
  sort_order: number;
  created_at: string;
}

export function photoFromRow(row: PhotoRow): Photo {
  return {
    id: row.id,
    albumId: row.album_id,
    imageUrl: row.image_url,
    title: row.title ?? undefined,
    caption: row.caption ?? undefined,
    location: row.location ?? undefined,
    takenAt: row.taken_at ?? undefined,
    isFavorite: row.is_favorite,
    sortOrder: row.sort_order,
  };
}
