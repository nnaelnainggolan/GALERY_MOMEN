import type { Lang } from "@/lib/i18n/translations";

/**
 * Formats a "yyyy-mm" grouping key as a display label in the given
 * language's locale (e.g. "JUNE 2025" for en, "JUNI 2025" for id).
 */
export function formatMonthLabel(key: string, lang: Lang): string {
  const [year, month] = key.split("-").map(Number);
  const date = new Date(year, month - 1, 1);
  const locale = lang === "id" ? "id-ID" : "en-US";
  return date
    .toLocaleDateString(locale, { month: "long", year: "numeric" })
    .toUpperCase();
}
