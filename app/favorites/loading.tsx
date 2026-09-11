import { Section } from "@/components/layout/Section";

export default function FavoritesLoading() {
  return (
    <Section className="pb-24 pt-40 md:pt-48">
      <div className="mb-16 h-10 w-56 animate-pulse rounded bg-card" />
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[4/5] w-full animate-pulse rounded-md border border-border bg-card"
          />
        ))}
      </div>
    </Section>
  );
}
