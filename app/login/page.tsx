"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/components/language/LanguageProvider";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { dict } = useLanguage();

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/gallery");
    router.refresh();
  }

  async function handleGoogleSignIn() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/gallery` },
    });
  }

  return (
    <div className="flex min-h-[100svh] items-center justify-center px-6 pt-24">
      <div className="w-full max-w-sm">
        <p className="text-center font-serif text-2xl">MEMORIES</p>
        <h1 className="mt-8 text-center text-3xl">{dict.login.welcome}</h1>
        <p className="mt-2 text-center text-sm text-secondary">
          {dict.login.subtitle}
        </p>

        <form onSubmit={handleSignIn} className="mt-10 space-y-6">
          <div>
            <label className="mb-2 block text-xs tracking-widest2 text-secondary">
              {dict.login.email}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-border bg-transparent py-2 text-sm outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs tracking-widest2 text-secondary">
              {dict.login.password}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-border bg-transparent py-2 text-sm outline-none"
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary py-3.5 text-xs tracking-widest2 text-bg transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-50"
          >
            {loading ? dict.login.signingIn : dict.login.signIn}
          </button>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="mt-4 w-full rounded-full border border-border py-3.5 text-xs tracking-widest2 transition-transform duration-300 hover:-translate-y-0.5"
        >
          {dict.login.google}
        </button>

        <Link
          href="/"
          className="mt-8 block text-center text-xs tracking-widest2 text-secondary hover:text-primary"
        >
          {dict.login.forgot}
        </Link>
      </div>
    </div>
  );
}
