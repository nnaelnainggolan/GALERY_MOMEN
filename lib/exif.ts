import exifr from "exifr";

export interface ExifDateResult {
  /** yyyy-mm-dd — usable directly in <input type="date"> and as taken_at */
  isoDate: string;
  raw: Date;
}

/**
 * Reads EXIF metadata straight from the file the user selected (no upload
 * needed) and returns the date/month/year the photo was actually taken.
 * Falls back through DateTimeOriginal -> CreateDate -> ModifyDate, since
 * not every camera/app writes all three. Returns null when the file has
 * no usable EXIF date (common for screenshots, PNGs, edited exports).
 */
export async function extractPhotoDate(file: File): Promise<ExifDateResult | null> {
  try {
    const output = await exifr.parse(file, [
      "DateTimeOriginal",
      "CreateDate",
      "ModifyDate",
    ]);

    const raw: Date | undefined =
      output?.DateTimeOriginal ?? output?.CreateDate ?? output?.ModifyDate;

    if (!raw || Number.isNaN(raw.getTime())) return null;

    return { isoDate: raw.toISOString().slice(0, 10), raw };
  } catch {
    return null;
  }
}
