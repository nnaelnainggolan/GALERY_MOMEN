import { Section } from "@/components/layout/Section";
import { TranslatedHeading } from "@/components/layout/TranslatedHeading";
import { AlbumList } from "@/components/albums/AlbumList";
import { getAlbums } from "@/lib/data/albums";

export const dynamic = "force-dynamic";

export default async function AlbumsPage() {
  const albums = await getAlbums();

  return (
    <Section className="pb-24 pt-40 md:pt-48">
      <TranslatedHeading section="albums" />
      <div className="mt-14">
        <AlbumList albums={albums} />
      </div>
    </Section>
  );
}
