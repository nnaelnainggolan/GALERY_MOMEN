import { createClient } from "@/lib/supabase/server";
import { albumFromRow, type Album, type AlbumRow } from "@/types/album";
import { placeholderAlbums } from "@/data/placeholders";

type AlbumWithCount = AlbumRow & { photos: { count: number }[] };

export async function getAlbums(): Promise<Album[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("albums")
    .select("*, photos(count)")
    .order("created_at", { ascending: false });

  if (error) console.error("getAlbums:", error.message);
  if (!data || data.length === 0) return placeholderAlbums;

  return (data as AlbumWithCount[]).map((row) =>
    albumFromRow(row, row.photos?.[0]?.count ?? 0)
  );
}

export async function getAlbumBySlug(slug: string): Promise<Album | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("albums")
    .select("*, photos(count)")
    .eq("slug", slug)
    .maybeSingle();

  if (error) console.error("getAlbumBySlug:", error.message);
  if (!data) return placeholderAlbums.find((a) => a.slug === slug) ?? null;

  const row = data as AlbumWithCount;
  return albumFromRow(row, row.photos?.[0]?.count ?? 0);
}
