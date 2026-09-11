import { createClient } from "@/lib/supabase/server";
import { photoFromRow, type Photo, type PhotoRow } from "@/types/photo";
import {
  placeholderPhotos,
  featuredPhotos as placeholderFeatured,
  favoritePhotos as placeholderFavorites,
} from "@/data/placeholders";

// Every function here tries Supabase first (subject to RLS — an
// unauthenticated visitor simply gets no rows back) and falls back to
// placeholder content whenever the real result set is empty. This keeps
// every page looking populated even before photos exist for a given
// album/category, per the "placeholder as filler" behavior.

export async function getFeaturedPhotos(limit = 5): Promise<Photo[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("photos")
    .select("*")
    .order("sort_order", { ascending: true })
    .limit(limit);

  if (error) console.error("getFeaturedPhotos:", error.message);
  if (!data || data.length === 0) return placeholderFeatured;

  const real = (data as PhotoRow[]).map(photoFromRow);
  // The featured layout expects `limit` photos. If there aren't enough
  // real ones yet, pad with placeholders so the grid never breaks.
  if (real.length < limit) {
    return [...real, ...placeholderFeatured].slice(0, limit);
  }
  return real;
}

export async function getFavoritePhotos(): Promise<Photo[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("photos")
    .select("*")
    .eq("is_favorite", true)
    .order("taken_at", { ascending: false });

  if (error) console.error("getFavoritePhotos:", error.message);
  if (!data || data.length === 0) return placeholderFavorites;
  return (data as PhotoRow[]).map(photoFromRow);
}

export async function getGalleryPhotos(): Promise<Photo[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("photos")
    .select("*")
    .order("taken_at", { ascending: false });

  if (error) console.error("getGalleryPhotos:", error.message);
  if (!data || data.length === 0) return placeholderPhotos;
  return (data as PhotoRow[]).map(photoFromRow);
}

export async function getPhotosByAlbumId(albumId: string): Promise<Photo[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("photos")
    .select("*")
    .eq("album_id", albumId)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getPhotosByAlbumId:", error.message);
    return [];
  }
  return (data as PhotoRow[]).map(photoFromRow);
}
