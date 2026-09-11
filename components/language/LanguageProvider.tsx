"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { translations, type Lang, type Dict } from "@/lib/i18n/translations";

interface LanguageContextValue {
  lang: Lang;
  dict: Dict;
  setLang: (lang: Lang) => void;
  toggleLanguage: () => void;
}

const defaultValue: LanguageContextValue = {
  lang: "en",
  dict: translations.en,
  setLang: () => {},
  toggleLanguage: () => {},
};

const LanguageContext = createContext<LanguageContextValue>(defaultValue);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("memories-lang") as Lang | null;
    if (stored === "en" || stored === "id") setLangState(stored);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem("memories-lang", lang);
    document.documentElement.lang = lang;
  }, [lang, mounted]);

  const setLang = (next: Lang) => setLangState(next);
  const toggleLanguage = () => setLangState((prev) => (prev === "en" ? "id" : "en"));

  return (
    <LanguageContext.Provider
      value={{ lang, dict: translations[lang], setLang, toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
