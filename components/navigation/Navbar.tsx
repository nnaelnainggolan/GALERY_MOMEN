"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, Plus } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "./Logo";
import { useLanguage } from "@/components/language/LanguageProvider";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { dict } = useLanguage();

  const links = [
    { label: dict.nav.home, href: "/" },
    { label: dict.nav.gallery, href: "/gallery" },
    { label: dict.nav.albums, href: "/albums" },
    { label: dict.nav.favorites, href: "/favorites" },
    { label: dict.nav.about, href: "/about" },
  ];

  return (
    <>
      <header
        className="fixed left-1/2 top-4 z-[100] w-[92vw] max-w-[1200px] -translate-x-1/2 rounded-2xl border border-border bg-card/70 px-5 backdrop-blur-md md:w-[80vw]"
        style={{ height: 62 }}
      >
        <div className="flex h-full items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8 rounded-full" />
            <span className="hidden text-sm font-medium tracking-widest2 sm:inline">
              MEMORIES
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs tracking-widest2 text-secondary transition-colors duration-300 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              href="/favorites"
              aria-label="Favorites"
              className="hidden h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 hover:-translate-y-0.5 sm:flex"
            >
              <Heart size={16} />
            </Link>
            <ThemeToggle />
            <LanguageToggle />
            <Link
              href="/upload"
              className="ml-1 hidden items-center gap-1.5 rounded-full border border-border bg-primary px-4 py-2 text-xs tracking-widest2 text-bg transition-transform duration-300 hover:-translate-y-0.5 sm:flex"
            >
              <Plus size={13} /> {dict.nav.add}
            </Link>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={links}
      />
    </>
  );
}
