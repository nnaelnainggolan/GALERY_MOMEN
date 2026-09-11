export interface Album {
  id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: string;
  photoCount: number;
  createdAt?: string;
}

export interface AlbumRow {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  cover_image: string | null;
  created_at: string;
}

export function albumFromRow(row: AlbumRow, photoCount = 0): Album {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description ?? undefined,
    coverImage: row.cover_image ?? undefined,
    photoCount,
    createdAt: row.created_at,
  };
}
