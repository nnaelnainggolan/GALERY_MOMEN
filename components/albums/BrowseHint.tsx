"use client";

import { useLanguage } from "@/components/language/LanguageProvider";

export function BrowseHint() {
  const { dict } = useLanguage();
  return <p className="eyebrow mb-6 text-center">{dict.album.browseHint}</p>;
}
