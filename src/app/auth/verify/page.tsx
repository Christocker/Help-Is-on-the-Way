import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Logo } from "@/components/layout/Logo";
import { ResendVerification } from "@/components/auth/ResendVerification";

interface VerifyPageProps {
  searchParams: Promise<{ status?: string; email?: string }>;
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const { status, email } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAlreadyVerified = Boolean(user?.email_confirmed_at);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-navy via-primary-900 to-primary-700 px-4 py-10">
      <div className="absolute inset-0 bg-dots opacity-40" aria-hidden="true" />
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent-light/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-primary-light/20 blur-3xl" aria-hidden="true" />

      <div className="relative w-full max-w-md rounded-2xl bg-card p-6 sm:p-8 fade-in card-elevation-lg text-center">
        <Logo imgClassName="h-14 w-14" textClassName="text-navy" subtitle="Mental Healthcare Access" />

        {isAlreadyVerified ? (
          <VerifiedState />
        ) : status === "expired" ? (
          <ExpiredState email={email} />
        ) : status === "invalid" ? (
          <InvalidState email={email} />
        ) : (
          <UnverifiedState email={email} />
        )}
      </div>
    </main>
  );
}

function VerifiedState() {
  return (
    <div className="mt-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-50">
        <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </div>
      <h1 className="mt-5 text-2xl font-bold text-foreground">
        Your account is already verified
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Your email address has already been verified. You&apos;re all set — continue
        to your dashboard.
      </p>
      <div className="mt-8">
        <Link
          href="/dashboard"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all duration-200 hover:bg-primary-dark"
        >
          Continue to Dashboard
        </Link>
      </div>
    </div>
  );
}

function ExpiredState({ email }: { email?: string }) {
  return (
    <div className="mt-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
        <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>
      <h1 className="mt-5 text-2xl font-bold text-foreground">
        Verification link expired
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        This verification link is no longer valid. Please request a new
        verification email.
      </p>
      <div className="mt-8 border-t border-border pt-6 text-left">
        <ResendVerification email={email} />
      </div>
    </div>
  );
}

function InvalidState({ email }: { email?: string }) {
  return (
    <div className="mt-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
        <svg className="h-8 w-8 text-destructive" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
      </div>
      <h1 className="mt-5 text-2xl font-bold text-foreground">
        Invalid verification link
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        This verification link is not valid. Please request a new verification
        email to activate your account.
      </p>
      <div className="mt-8 border-t border-border pt-6 text-left">
        <ResendVerification email={email} />
      </div>
    </div>
  );
}

function UnverifiedState({ email }: { email?: string }) {
  return (
    <div className="mt-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-50">
        <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>
      <h1 className="mt-5 text-2xl font-bold text-foreground">
        Your email address has not been verified
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Your account is still awaiting email verification. Please verify your
        email address to continue. Your account will remain pending — nothing
        will be deleted.
      </p>
      <div className="mt-8 border-t border-border pt-6 text-left">
        <ResendVerification email={email} />
      </div>
    </div>
  );
}
