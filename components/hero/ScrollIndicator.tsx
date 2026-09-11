"use client";

import { motion } from "framer-motion";

export function ScrollIndicator({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="eyebrow">{label}</span>
      <motion.span
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="text-secondary"
      >
        ↓
      </motion.span>
    </div>
  );
}
