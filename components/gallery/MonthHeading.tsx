"use client";

import { SectionHeading } from "@/components/layout/SectionHeading";
import { formatMonthLabel } from "@/lib/month-label";
import { useLanguage } from "@/components/language/LanguageProvider";

export function MonthHeading({
  monthKey,
  count,
}: {
  monthKey: string;
  count: number;
}) {
  const { lang, dict } = useLanguage();
  const label = formatMonthLabel(monthKey, lang);
  const countLabel = `${count} ${count === 1 ? dict.common.photo : dict.common.photos}`;

  return <SectionHeading eyebrow={countLabel} heading={label} />;
}
