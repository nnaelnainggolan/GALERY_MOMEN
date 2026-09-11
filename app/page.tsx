import { MemoryHero } from "@/components/hero/MemoryHero";
import { AlbumList } from "@/components/albums/AlbumList";
import { FavoritesGallery } from "@/components/favorites/FavoritesGallery";
import { MemoryTimeline } from "@/components/timeline/MemoryTimeline";
import { Section } from "@/components/layout/Section";
import { TranslatedHeading } from "@/components/layout/TranslatedHeading";
import { FinalCta } from "@/components/home/FinalCta";
import { getFeaturedPhotos, getFavoritePhotos } from "@/lib/data/photos";
import { getAlbums } from "@/lib/data/albums";

// Renders on each request (Supabase reads depend on the visitor's auth
// session via cookies), so real photos show up as soon as they exist —
// falling back to placeholders per-section when a category is still empty.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [heroPhotos, albums, favorites] = await Promise.all([
    getFeaturedPhotos(7),
    getAlbums(),
    getFavoritePhotos(),
  ]);

  return (
    <>
      {/* 01 — HERO */}
      <MemoryHero photos={heroPhotos} />

      {/* 02 — ARCHIVE TIMELINE */}
      <Section className="py-24 md:py-32">
        <TranslatedHeading section="timeline" />
        <div className="mt-16">
          <MemoryTimeline />
        </div>
      </Section>

      {/* 03 — ALBUMS */}
      <Section className="py-24 md:py-32">
        <TranslatedHeading section="albums" />
        <div className="mt-14">
          <AlbumList albums={albums} />
        </div>
      </Section>

      {/* 04 — FAVORITE MOMENTS */}
      <Section className="py-24 md:py-32">
        <TranslatedHeading section="favorites" />
        <div className="mt-14">
          <FavoritesGallery photos={favorites.slice(0, 3)} />
        </div>
      </Section>

      {/* 05 — FINAL CTA */}
      <Section className="py-32 text-center md:py-40">
        <FinalCta />
      </Section>
    </>
  );
}
