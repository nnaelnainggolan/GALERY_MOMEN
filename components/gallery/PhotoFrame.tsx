"use client";

import Image from "next/image";
import { cn, formatDate } from "@/lib/utils";
import { useLanguage } from "@/components/language/LanguageProvider";
import type { Photo, PhotoFrameStyle } from "@/types/photo";

interface PhotoFrameProps {
  photo: Photo;
  className?: string;
  rotate?: number;
  priority?: boolean;
  sizes?: string;
  /** Overrides the photo's own frameStyle — used by stack-style
   * components (MemoryStack, PhotoStack) so every photo gets a
   * consistent, clearly separated border regardless of what style
   * happens to be assigned to that particular photo. Without this,
   * "editorial" (borderless) photos blend into each other when
   * overlapped, looking like a messy blob instead of a tidy stack. */
  forceStyle?: PhotoFrameStyle;
}

// STYLE A "simple": clean rounded image
// STYLE B "physical": warm paper border + caption strip
// STYLE C "editorial": no visible frame, subtle radius only
// "polaroid": sophisticated polaroid-inspired frame
export function PhotoFrame({
  photo,
  className,
  rotate = 0,
  priority,
  sizes = "(max-width: 768px) 90vw, 40vw",
  forceStyle,
}: PhotoFrameProps) {
  const style = forceStyle ?? photo.frameStyle ?? "editorial";
  const { lang } = useLanguage();

  const image = (
    <div className="relative h-full w-full overflow-hidden rounded-[6px]">
      <Image
        src={photo.imageUrl}
        alt={photo.title ?? photo.caption ?? "A stored memory"}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );

  if (style === "physical") {
    return (
      <figure
        className={cn(
          "bg-paper rounded-md border border-border p-2 pb-8 shadow-sm",
          className
        )}
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
          <Image
            src={photo.imageUrl}
            alt={photo.title ?? photo.caption ?? "A stored memory"}
            fill
            sizes={sizes}
            className="object-cover"
          />
        </div>
        <figcaption className="mt-2 px-1 text-[10px] tracking-wide text-secondary">
          {photo.takenAt &&
            formatDate(photo.takenAt, lang === "id" ? "id-ID" : "en-US")}
          {photo.location ? ` · ${photo.location}` : ""}
        </figcaption>
      </figure>
    );
  }

  if (style === "polaroid") {
    return (
      <figure
        className={cn("rounded-sm p-3 pb-9 shadow-sm", className)}
        style={{ backgroundColor: "#F2F0E8", transform: `rotate(${rotate}deg)` }}
      >
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={photo.imageUrl}
            alt={photo.title ?? photo.caption ?? "A stored memory"}
            fill
            sizes={sizes}
            className="object-cover"
          />
        </div>
        {photo.caption && (
          <figcaption className="mt-2 text-center font-serif text-xs text-black/70">
            {photo.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  if (style === "simple") {
    return (
      <div
        className={cn("overflow-hidden rounded-xl border border-border", className)}
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        {image}
      </div>
    );
  }

  // editorial
  return (
    <div className={className} style={{ transform: `rotate(${rotate}deg)` }}>
      {image}
    </div>
  );
}
