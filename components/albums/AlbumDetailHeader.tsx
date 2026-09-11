"use client";

import { SectionHeading } from "@/components/layout/SectionHeading";
import { useLanguage } from "@/components/language/LanguageProvider";

export function AlbumDetailHeader({
  title,
  description,
  count,
}: {
  title: string;
  description?: string;
  count: number;
}) {
  const { dict } = useLanguage();
  const countLabel = `${count} ${count === 1 ? dict.common.photo : dict.common.photos}`;

  return (
    <>
      <SectionHeading eyebrow={countLabel} heading={title} />
      {description && (
        <p className="mt-4 max-w-md text-sm text-secondary">{description}</p>
      )}
    </>
  );
}
