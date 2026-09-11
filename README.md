# Memories — Personal Photo Archive

A premium, editorial-style personal photo archive built with Next.js (App
Router), TypeScript, Tailwind CSS, Framer Motion, and Supabase.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (monochrome editorial theme, light/dark via CSS variables)
- Framer Motion (photo stack, scroll reveals, page transitions)
- Lucide React (icons)
- Supabase (Postgres, Auth, Storage)

## 1. Install dependencies

```bash
npm install
```

## 2. Create a Supabase project

1. Go to https://supabase.com and create a new project.
2. In **Project Settings → API**, copy the Project URL and the `anon`
   public key.
3. Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Never put `SUPABASE_SERVICE_ROLE_KEY` in a `NEXT_PUBLIC_` variable or import
it in client components — it isn't used by this app's client code at all.

## 3. Run the database migration

Open the Supabase SQL editor and run the contents of
`supabase/migrations/0001_init.sql`. This creates:

- `albums` and `photos` tables
- Row Level Security policies so only the authenticated owner can read or
  write their own rows (this is a private archive by default — see the
  comment in the SQL file if you want a public read-only gallery later)
- A public `photos` Storage bucket with matching storage policies

## 4. Enable authentication

In **Authentication → Providers**:

- Email/password is on by default.
- To enable "Continue with Google," turn on the Google provider and add
  your OAuth client ID/secret (see Supabase's Google auth guide).

Create your own user account (Authentication → Users → Add user, or sign
up from `/login` once the app is running) — every photo/album row is
scoped to whichever user uploaded it.

## 5. Run the app

```bash
npm run dev
```

Visit http://localhost:3000. `/gallery`, `/albums`, `/favorites`, and
`/upload` require sign-in (enforced in `middleware.ts`); the home page,
`/about`, and `/login` are public.

## Placeholder photos

Homepage, `/gallery`, `/albums`, `/albums/[slug]`, and `/favorites` fetch
real data from Supabase (`lib/data/photos.ts`, `lib/data/albums.ts`) via
server components. If a query comes back empty — no photos yet, or you're
viewing as a signed-out visitor — that section falls back to the
deterministic placeholder images in `data/placeholders.ts` so the layout
never looks broken. Once you upload real photos for a category, they
replace the placeholders automatically; no code changes needed.

`MemoryTimeline` still always uses placeholder photos illustratively,
since timeline entries aren't tied to specific albums in the schema.

## Automatic photo date detection

`/upload` reads each photo's EXIF metadata (`DateTimeOriginal` /
`CreateDate` / `ModifyDate`) directly in the browser via `lib/exif.ts` —
no server round-trip needed. Each thumbnail in the preview grid shows the
detected date, and the shared Date field auto-fills from the first photo
that has one (still editable/overridable). At save time, each photo uses
its own detected date; the manual Date field is only used as a fallback
for photos with no EXIF data (e.g. screenshots or edited exports).

## Automatic month grouping

`/gallery` automatically buckets every photo by the month it was taken
(`lib/month-groups.ts`, derived from `takenAt` — the same date EXIF
detection fills in at upload). Each month becomes a card with a cover
photo and count; clicking one opens `/gallery/month/[month]` (e.g.
`/gallery/month/2025-06`), a dedicated page showing every photo from that
month in the same editorial grid used elsewhere. Photos with no date
land in an "undated" bucket shown for visibility but not clickable.
No manual tagging or folder organizing needed — this updates automatically
as photos are added.

## Language toggle (EN/ID)

A language switcher lives in the navbar (desktop) and mobile menu,
labeled "EN / ID". It flips all UI chrome — navigation, hero copy,
section headings, gallery filters/sort, upload form, login form, about
page, timeline entries, and date formatting (English vs Indonesian month
names) — between English and Indonesian, persisted to localStorage
(`components/language/LanguageProvider.tsx`, dictionary in
`lib/i18n/translations.ts`).

Photo captions and locations are always exactly what you typed — they're
your content, not UI chrome, so the toggle never touches them.

## Performance notes

A few things are already handled to keep the app feeling light:

- **Middleware only calls Supabase auth on protected routes**
  (`/gallery`, `/albums`, `/favorites`, `/upload`). Public pages (home,
  about, login) skip that network round-trip entirely.
- **`PhotoViewer` (the fullscreen lightbox) is code-split** via
  `next/dynamic` in every place it's used — it's not needed until a
  photo is actually clicked, so it doesn't bloat the initial bundle of
  gallery-heavy pages.
- **`MemoryGrid` uses CSS multi-column masonry**, not a JS layout
  library — zero extra runtime cost, and it never leaves gaps.
- **`MemoryStack` respects `prefers-reduced-motion`** (via Framer
  Motion's `useReducedMotion`) and skips the spread-apart animation
  entirely for users who've asked for reduced motion.
- **`loading.tsx` skeletons** on `/`, `/gallery`, `/gallery/month/[month]`,
  `/albums`, `/albums/[slug]`, and `/favorites` — since those pages fetch
  from Supabase on every request, the skeleton shows instantly during
  navigation instead of a blank screen.

If it still feels heavy once real photos are in place, the next-biggest
wins are usually:

1. **Compress images before upload.** Right now `/upload` sends the
   original file straight to Storage. Resizing to something like
   2000px on the long edge and re-encoding as WebP client-side (e.g.
   with a small canvas-based resize step) before upload can cut file
   size by 70–90% with no visible quality loss on screen.
2. **Serve resized thumbnails, not full-size images, in grids.**
   `next/image` optimizes *delivery* format/sizing on Vercel, but if
   you self-host or use a different platform, next/image's built-in
   optimizer may not run — check that `next/image` is actually resizing
   on your deployment. Supabase's paid Storage image transformation
   (`?width=&height=`) is another option if you're on a plan that
   includes it.
3. **Run `npm run build && npm run start` to test real performance.**
   `npm run dev` is always slower (no minification, no production
   React) — perceived "heaviness" during development is not
   representative of production.

## Project structure

```
app/                  routes (home, gallery, albums, favorites, upload, about, login)
components/
  navigation/         Navbar, MobileMenu, ThemeToggle
  theme/              ThemeProvider (light/dark, persisted)
  background/         BackgroundWaves (subtle contour lines)
  hero/               MemoryHero, MemoryStack, HeroTypography, ScrollIndicator
  gallery/            PhotoFrame, MemoryCard, FeaturedMemories, MemoryGrid,
                      PhotoViewer (lightbox), PhotoStack (drag-to-browse)
  albums/             AlbumList, AlbumRow, AlbumPreview
  favorites/          FavoritesGallery
  upload/             UploadDropzone, UploadPreview, UploadModal (Storage + DB)
  timeline/           MemoryTimeline, TimelineItem
  layout/             Section, SectionHeading, PageTransition, Footer
lib/supabase/         browser + server Supabase clients
types/                Photo, Album (+ Supabase row mappers)
data/                 placeholder content + filter/sort options
supabase/migrations/  SQL schema + RLS policies
middleware.ts         session refresh + route protection
```

## Notes on the design system

- Colors are monochrome CSS variables in `app/globals.css`, switched via a
  `.dark` class on `<html>` — photographs are the only source of color.
- Three photo frame styles (`simple`, `physical`, `editorial`) plus a
  `polaroid` variant live in `components/gallery/PhotoFrame.tsx`; assign
  `frameStyle` per photo in your data.
- The signature `MemoryStack` component overlaps 4–7 photos with subtle
  rotation/offset and spreads them apart on hover (tap on mobile) using
  Framer Motion — this is the visual anchor of the homepage and should
  not be replaced with a grid.
- Respects `prefers-reduced-motion` globally via `app/globals.css`.

## Known follow-ups before production

- Wire real Supabase queries into `/gallery`, `/albums`, `/favorites`,
  and the homepage (currently placeholder data for preview purposes).
- Add image compression/thumbnail generation on upload (e.g. a Supabase
  Edge Function or a client-side resize step before upload) — the schema
  and storage path already support it.
- Add a "sign up" flow on `/login` if you want to self-register rather
  than creating your account from the Supabase dashboard.
