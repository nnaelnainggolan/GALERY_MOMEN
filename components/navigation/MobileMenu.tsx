"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useLanguage } from "@/components/language/LanguageProvider";
import { LanguageToggle } from "./LanguageToggle";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const { dict } = useLanguage();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[200] flex flex-col bg-bg px-8 py-8"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm tracking-widest2">MEMORIES</span>
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <button onClick={onClose} aria-label="Close menu">
                <X size={22} />
              </button>
            </div>
          </div>

          <nav className="mt-16 flex flex-1 flex-col justify-center gap-6">
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.5 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-serif text-4xl"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <Link
            href="/upload"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-full border border-border bg-primary py-4 text-xs tracking-widest2 text-bg"
          >
            <Plus size={14} /> {dict.nav.add}
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
