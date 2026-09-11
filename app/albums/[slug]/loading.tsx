import { Section } from "@/components/layout/Section";
import { GridSkeleton } from "@/components/layout/GridSkeleton";

export default function AlbumDetailLoading() {
  return (
    <Section className="pb-24 pt-40 md:pt-48">
      <div className="mb-4 h-10 w-56 animate-pulse rounded bg-card" />
      <div className="mb-16 h-4 w-40 animate-pulse rounded bg-card" />
      <GridSkeleton count={9} />
    </Section>
  );
}
