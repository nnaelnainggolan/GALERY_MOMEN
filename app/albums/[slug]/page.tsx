import { notFound } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { AlbumDetailHeader } from "@/components/albums/AlbumDetailHeader";
import { BrowseHint } from "@/components/albums/BrowseHint";
import { PhotoStack } from "@/components/gallery/PhotoStack";
import { MemoryGrid } from "@/components/gallery/MemoryGrid";
import { getAlbumBySlug } from "@/lib/data/albums";
import { getPhotosByAlbumId } from "@/lib/data/photos";
import { placeholderPhotos } from "@/data/placeholders";

export const dynamic = "force-dynamic";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function AlbumDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const album = await getAlbumBySlug(params.slug);
  if (!album) notFound();

  // Real Supabase album ids are UUIDs; placeholder albums use readable
  // fake ids (e.g. "album-summer-2025") and pair with placeholder photos.
  const photos = UUID_RE.test(album.id)
    ? await getPhotosByAlbumId(album.id)
    : placeholderPhotos.filter((p) => p.albumId === album.id);

  return (
    <Section className="pb-24 pt-40 md:pt-48">
      <AlbumDetailHeader
        title={album.title}
        description={album.description}
        count={photos.length}
      />

      {photos.length > 0 && (
        <div className="mt-16">
          <BrowseHint />
          <PhotoStack photos={photos} />
        </div>
      )}

      <div className="mt-24">
        <MemoryGrid photos={photos} />
      </div>
    </Section>
  );
}
