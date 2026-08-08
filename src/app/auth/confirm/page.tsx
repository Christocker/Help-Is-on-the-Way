import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Logo } from "@/components/layout/Logo";
import { redirect } from "next/navigation";

export default async function AuthConfirmPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single()
    : { data: null };

  const isAdmin = profile?.role === "admin";
  const nextHref = isAdmin ? "/admin" : "/dashboard";

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-navy via-primary-900 to-primary-700 px-4 py-10">
      <div className="absolute inset-0 bg-dots opacity-40" aria-hidden="true" />
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent-light/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-primary-light/20 blur-3xl" aria-hidden="true" />

      <div className="relative w-full max-w-md rounded-2xl bg-card p-6 sm:p-8 fade-in card-elevation-lg text-center">
        <Logo imgClassName="h-14 w-14" textClassName="text-navy" subtitle="Mental Healthcare Access" />

        <div className="mt-8 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-50">
          <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>

        <h1 className="mt-5 text-2xl font-bold text-foreground">
          Your email has been confirmed
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Thank you for verifying your email address,{" "}
          <span className="font-semibold text-foreground">{user.email}</span>.
          You&apos;re now ready to access your account and book a session.
        </p>

        <div className="mt-8 space-y-3">
          <Link
            href={nextHref}
            className="block w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all duration-200 hover:bg-primary-dark"
          >
            Continue to {isAdmin ? "Admin Panel" : "Dashboard"}
          </Link>
          <Link
            href="/book"
            className="block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
          >
            Book a Session
          </Link>
        </div>
      </div>
    </main>
  );
}
