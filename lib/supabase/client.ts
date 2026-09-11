"use client";

import { createBrowserClient } from "@supabase/ssr";

// Uses only the public URL and anon key. Row Level Security policies
// (see supabase/migrations/0001_init.sql) are what actually protect
// private data — the anon key is safe to ship to the browser.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
