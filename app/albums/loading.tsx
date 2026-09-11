import { Section } from "@/components/layout/Section";

export default function AlbumsLoading() {
  return (
    <Section className="pb-24 pt-40 md:pt-48">
      <div className="mb-14 h-10 w-56 animate-pulse rounded bg-card" />
      <div className="border-t border-border">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="border-b border-border py-8 md:py-10">
            <div className="h-8 w-2/3 animate-pulse rounded bg-card md:w-1/3" />
          </div>
        ))}
      </div>
    </Section>
  );
}
