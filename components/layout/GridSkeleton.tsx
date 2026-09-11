export function GridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="columns-2 gap-4 sm:columns-3 md:gap-6 lg:columns-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="mb-4 animate-pulse break-inside-avoid rounded-xl border border-border bg-card md:mb-6"
          style={{ aspectRatio: i % 3 === 0 ? "3/4" : i % 3 === 1 ? "1/1" : "4/5" }}
        />
      ))}
    </div>
  );
}
