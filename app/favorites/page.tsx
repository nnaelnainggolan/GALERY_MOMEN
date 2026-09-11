import { Section } from "@/components/layout/Section";
import { TranslatedHeading } from "@/components/layout/TranslatedHeading";
import { FavoritesGallery } from "@/components/favorites/FavoritesGallery";
import { getFavoritePhotos } from "@/lib/data/photos";

export const dynamic = "force-dynamic";

export default async function FavoritesPage() {
  const photos = await getFavoritePhotos();

  return (
    <Section className="pb-24 pt-40 md:pt-48">
      <TranslatedHeading section="favoritesPage" />
      <div className="mt-16">
        <FavoritesGallery photos={photos} />
      </div>
    </Section>
  );
}
