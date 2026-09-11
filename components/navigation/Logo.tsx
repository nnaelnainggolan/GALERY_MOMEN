"use client";

import Image from "next/image";
import { useTheme } from "@/components/theme/ThemeProvider";

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * Swaps between two logo image files depending on the active theme.
 * Drop your two exported images into /public with these exact names:
 *
 *   /public/logo-light.png  — shown in LIGHT mode (logo for light backgrounds)
 *   /public/logo-dark.png   — shown in DARK mode (logo for dark backgrounds)
 *
 * If your files are .svg or .jpg instead, just change the extensions
 * in the two paths below to match.
 */
export function Logo({ className, size = 32 }: LogoProps) {
  const { theme } = useTheme();

  return (
    <Image
      src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
      alt="Memories"
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}
