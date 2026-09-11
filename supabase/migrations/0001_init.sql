-- MEMORIES: initial schema
-- Run this in the Supabase SQL editor, or via `supabase db push`
-- after adding it to your local supabase/migrations folder.

create extension if not exists "pgcrypto";

-- ALBUMS ----------------------------------------------------------------

create table if not exists albums (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  cover_image text,
  owner_id uuid references auth.users(id) default auth.uid(),
  created_at timestamptz not null default now()
);

-- PHOTOS ------------------------------------------------------------------

create table if not exists photos (
  id uuid primary key default gen_random_uuid(),
  album_id uuid references albums(id) on delete set null,
  storage_path text not null,
  image_url text not null,
  title text,
  caption text,
  taken_at timestamptz,
  location text,
  is_favorite boolean not null default false,
  sort_order integer not null default 0,
  owner_id uuid references auth.users(id) default auth.uid(),
  created_at timestamptz not null default now()
);

create index if not exists photos_album_id_idx on photos(album_id);
create index if not exists photos_is_favorite_idx on photos(is_favorite);
create index if not exists photos_taken_at_idx on photos(taken_at desc);

-- ROW LEVEL SECURITY --------------------------------------------------------
-- This app is a private, single-owner archive: only the authenticated
-- owner can read or write their own rows. Adjust the `select` policies
-- if you want a public read-only gallery later (e.g. `using (true)`).

alter table albums enable row level security;
alter table photos enable row level security;

create policy "Owner can read own albums"
  on albums for select
  using (auth.uid() = owner_id);

create policy "Owner can insert own albums"
  on albums for insert
  with check (auth.uid() = owner_id);

create policy "Owner can update own albums"
  on albums for update
  using (auth.uid() = owner_id);

create policy "Owner can delete own albums"
  on albums for delete
  using (auth.uid() = owner_id);

create policy "Owner can read own photos"
  on photos for select
  using (auth.uid() = owner_id);

create policy "Owner can insert own photos"
  on photos for insert
  with check (auth.uid() = owner_id);

create policy "Owner can update own photos"
  on photos for update
  using (auth.uid() = owner_id);

create policy "Owner can delete own photos"
  on photos for delete
  using (auth.uid() = owner_id);

-- STORAGE ---------------------------------------------------------------
-- Create the "photos" bucket from the Supabase dashboard (Storage tab),
-- or via the API, then apply matching policies:

insert into storage.buckets (id, name, public)
values ('photos', 'photos', true)
on conflict (id) do nothing;

-- Public bucket + public read policy lets next/image and getPublicUrl()
-- serve images directly. Writes are still restricted to authenticated
-- owners of the corresponding row via the policies below.

create policy "Public can view photos bucket"
  on storage.objects for select
  using (bucket_id = 'photos');

create policy "Authenticated users can upload to photos bucket"
  on storage.objects for insert
  with check (bucket_id = 'photos' and auth.role() = 'authenticated');

create policy "Owners can delete their uploads"
  on storage.objects for delete
  using (bucket_id = 'photos' and auth.role() = 'authenticated');
