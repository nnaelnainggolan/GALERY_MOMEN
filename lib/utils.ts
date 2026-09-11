import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso?: string, locale: string = "en-US") {
  if (!iso) return "";
  return new Date(iso)
    .toLocaleDateString(locale, {
      month: "long",
      day: "2-digit",
      year: "numeric",
    })
    .toUpperCase();
}
