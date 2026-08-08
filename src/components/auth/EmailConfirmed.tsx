"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface EmailConfirmedProps {
  email: string;
  dashboardHref: string;
}

export function EmailConfirmed({ email, dashboardHref }: EmailConfirmedProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown <= 0) {
      router.push(dashboardHref);
      router.refresh();
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, router, dashboardHref]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-navy via-primary-900 to-primary-700 px-4 py-10">
      <div className="absolute inset-0 bg-dots opacity-40" aria-hidden="true" />
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent-light/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-primary-light/20 blur-3xl" aria-hidden="true" />

      <div className="relative w-full max-w-md rounded-2xl bg-card p-6 sm:p-8 fade-in card-elevation-lg text-center">
        <div className="flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-md">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </div>
          <span className="mt-3 text-base font-bold text-navy">Help Is on the Way</span>
        </div>

        <div className="mt-8 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-50">
          <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>

        <h1 className="mt-5 text-2xl font-bold text-foreground">
          Your account has been confirmed!
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Your email address has been verified. You&apos;re all set,{" "}
          <span className="font-semibold text-foreground">{email}</span>!
        </p>

        <div className="mt-8 rounded-xl bg-primary-50 border border-primary-100 px-4 py-4">
          <p className="text-sm font-medium text-primary-800">
            Redirecting to your dashboard in {countdown} second{countdown !== 1 ? "s" : ""}…
          </p>
        </div>

        <div className="mt-6">
          <Link
            href={dashboardHref}
            onClick={(e) => {
              e.preventDefault();
              router.push(dashboardHref);
              router.refresh();
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all duration-200 hover:bg-primary-dark"
          >
            Go to Dashboard Now
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
