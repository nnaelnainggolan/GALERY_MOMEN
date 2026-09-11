"use client";

import { useLanguage } from "@/components/language/LanguageProvider";

export function AboutParagraph() {
  const { dict } = useLanguage();
  return (
    <p className="mt-10 max-w-2xl font-serif text-2xl leading-relaxed md:text-3xl">
      {dict.about.paragraph}
    </p>
  );
}
