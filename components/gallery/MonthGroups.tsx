"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatMonthLabel } from "@/lib/month-label";
import { useLanguage } from "@/components/language/LanguageProvider";
import type { MonthGroup } from "@/lib/month-groups";

export function MonthGroups({ groups }: { groups: MonthGroup[] }) {
  const { lang, dict } = useLanguage();

  if (groups.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {groups.map((group) => {
        const cover = group.photos[0];
        const isUndated = group.key === "undated";
        const label = isUndated
          ? dict.common.noDate
          : formatMonthLabel(group.key, lang);
        const countLabel = `${group.photos.length} ${
          group.photos.length === 1 ? dict.common.photo : dict.common.photos
        }`;

        const content = (
          <>
            {cover && (
              <Image
                src={cover.imageUrl}
                alt={label}
                fill
                sizes="(max-width: 768px) 45vw, 22vw"
                className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="font-serif text-lg text-white">{label}</p>
              <p className="text-[10px] tracking-widest2 text-white/70">
                {countLabel}
              </p>
            </div>
          </>
        );

        if (isUndated) {
          return (
            <div
              key={group.key}
              className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border opacity-60"
            >
              {content}
            </div>
          );
        }

        return (
          <Link
            key={group.key}
            href={`/gallery/month/${group.key}`}
            className={cn(
              "group relative block aspect-[4/5] overflow-hidden rounded-xl border border-border"
            )}
          >
            {content}
          </Link>
        );
      })}
    </div>
  );
}
