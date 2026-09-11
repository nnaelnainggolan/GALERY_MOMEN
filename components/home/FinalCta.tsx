"use client";

import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { useLanguage } from "@/components/language/LanguageProvider";

export function FinalCta() {
  const { dict } = useLanguage();

  return (
    <>
      <h2 className="font-sans text-[clamp(3rem,9vw,8rem)] font-extrabold leading-[0.88]">
        {dict.cta.lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h2>
      <p className="mx-auto mt-8 max-w-md text-sm text-secondary">
        {dict.cta.subtitle}
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/gallery"
          className="flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-xs tracking-widest2 text-bg transition-transform duration-300 hover:-translate-y-0.5"
        >
          {dict.cta.openArchive} <ArrowRight size={14} />
        </Link>
        <Link
          href="/upload"
          className="flex items-center gap-2 rounded-full border border-border px-7 py-4 text-xs tracking-widest2 transition-transform duration-300 hover:-translate-y-0.5"
        >
          {dict.cta.addMemory} <Plus size={14} />
        </Link>
      </div>
    </>
  );
}
