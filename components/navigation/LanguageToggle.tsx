"use client";

import { useLanguage } from "@/components/language/LanguageProvider";

export function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Switch language"
      className="flex h-9 items-center justify-center rounded-full px-2.5 text-[11px] font-medium tracking-widest2 transition-transform duration-300 hover:-translate-y-0.5"
    >
      <span className={lang === "en" ? "text-primary" : "text-secondary"}>EN</span>
      <span className="mx-1 text-secondary">/</span>
      <span className={lang === "id" ? "text-primary" : "text-secondary"}>ID</span>
    </button>
  );
}
