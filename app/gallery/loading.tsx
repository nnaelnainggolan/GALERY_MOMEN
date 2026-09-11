import { Section } from "@/components/layout/Section";
import { GridSkeleton } from "@/components/layout/GridSkeleton";

export default function GalleryLoading() {
  return (
    <Section className="pb-24 pt-40 md:pt-48">
      <div className="mb-16 h-10 w-64 animate-pulse rounded bg-card" />
      <GridSkeleton count={12} />
    </Section>
  );
}
