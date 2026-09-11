"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language/LanguageProvider";

export function Footer() {
  const { dict } = useLanguage();

  return (
    <footer className="mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10">
      <div className="flex flex-col justify-between gap-8 border-t border-border pt-10 md:flex-row md:items-center">
        <span className="font-serif text-lg">MEMORIES</span>
        <nav className="flex flex-wrap gap-6 text-xs tracking-widest2 text-secondary">
          <Link href="/gallery" className="hover:text-primary">{dict.nav.gallery}</Link>
          <Link href="/albums" className="hover:text-primary">{dict.nav.albums}</Link>
          <Link href="/favorites" className="hover:text-primary">{dict.nav.favorites}</Link>
          <Link href="/about" className="hover:text-primary">{dict.nav.about}</Link>
        </nav>
      </div>
      <p className="mt-8 text-[10px] tracking-widest2 text-secondary">
        {dict.footer.tagline} — © 2026
      </p>
    </footer>
  );
}
