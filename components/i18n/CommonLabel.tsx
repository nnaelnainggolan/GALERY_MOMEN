"use client";

import { useLanguage } from "@/components/language/LanguageProvider";
import type { Dict } from "@/lib/i18n/translations";

export function CommonLabel({ id }: { id: keyof Dict["common"] }) {
  const { dict } = useLanguage();
  return <>{dict.common[id]}</>;
}
