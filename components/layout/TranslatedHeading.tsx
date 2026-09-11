"use client";

import { SectionHeading } from "./SectionHeading";
import { useLanguage } from "@/components/language/LanguageProvider";
import type { Dict } from "@/lib/i18n/translations";

type SectionKey = keyof Dict["sections"];

export function TranslatedHeading({ section }: { section: SectionKey }) {
  const { dict } = useLanguage();
  const { eyebrow, heading } = dict.sections[section];
  return <SectionHeading eyebrow={eyebrow} heading={heading} />;
}
