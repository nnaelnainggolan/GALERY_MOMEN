"use client";

import { useLanguage } from "@/components/language/LanguageProvider";
import type { Dict } from "@/lib/i18n/translations";

type SectionKey = keyof Dict["sections"];

export function Eyebrow({ section }: { section: SectionKey }) {
  const { dict } = useLanguage();
  return <>{dict.sections[section].eyebrow}</>;
}
