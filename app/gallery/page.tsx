import { Section } from "@/components/layout/Section";
import { TranslatedHeading } from "@/components/layout/TranslatedHeading";
import { GalleryClient } from "@/components/gallery/GalleryClient";
import { MonthGroups } from "@/components/gallery/MonthGroups";
import { CommonLabel } from "@/components/i18n/CommonLabel";
import { getGalleryPhotos } from "@/lib/data/photos";
import { groupPhotosByMonth } from "@/lib/month-groups";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const photos = await getGalleryPhotos();
  const monthGroups = groupPhotosByMonth(photos);

  return (
    <Section className="pb-24 pt-40 md:pt-48">
      <TranslatedHeading section="gallery" />

      {monthGroups.length > 1 && (
        <div className="mt-14">
          <p className="eyebrow mb-6">
            <CommonLabel id="browseByMonth" />
          </p>
          <MonthGroups groups={monthGroups} />
        </div>
      )}

      <div className="mt-16">
        <p className="eyebrow mb-6">
          <CommonLabel id="allPhotos" />
        </p>
        <GalleryClient photos={photos} />
      </div>
    </Section>
  );
}
