import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { MemoryGrid } from "@/components/gallery/MemoryGrid";
import { MonthHeading } from "@/components/gallery/MonthHeading";
import { getGalleryPhotos } from "@/lib/data/photos";
import { groupPhotosByMonth } from "@/lib/month-groups";
import { formatMonthLabel } from "@/lib/month-label";

export const dynamic = "force-dynamic";

interface MonthPageProps {
  params: { month: string };
}

export function generateMetadata({ params }: MonthPageProps): Metadata {
  return { title: `${formatMonthLabel(params.month, "en")} — Memories` };
}

export default async function MonthPage({ params }: MonthPageProps) {
  const photos = await getGalleryPhotos();
  const groups = groupPhotosByMonth(photos);
  const group = groups.find((g) => g.key === params.month);

  if (!group) notFound();

  return (
    <Section className="pb-24 pt-40 md:pt-48">
      <MonthHeading monthKey={group.key} count={group.photos.length} />
      <div className="mt-14">
        <MemoryGrid photos={group.photos} />
      </div>
    </Section>
  );
}
