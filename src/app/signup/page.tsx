import Link from "next/link";
import { SignUpForm } from "./SignUpForm";
import { signUp } from "@/app/auth/actions";
import { Logo } from "@/components/layout/Logo";

interface SignUpPageProps {
  searchParams: Promise<{ error?: string; success?: string }>;
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const { error, success } = await searchParams;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-navy via-primary-900 to-primary-700 px-4 py-10">
      <div className="absolute inset-0 bg-dots opacity-40" aria-hidden="true" />
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent-light/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-primary-light/20 blur-3xl" aria-hidden="true" />

      <div className="relative w-full max-w-md rounded-2xl bg-card p-6 sm:p-8 fade-in card-elevation-lg">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo
            imgClassName="h-14 w-14"
            textClassName="text-navy"
            subtitle="Mental Healthcare Access"
          />
          {success ? (
            <>
              <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent-50">
                <svg className="h-7 w-7 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <h1 className="mt-4 text-2xl font-bold text-foreground">
                Check your email
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                We&apos;ve sent a confirmation link to your email address. Click
                the link in the email to activate your account and get started.
              </p>
            </>
          ) : (
            <>
              <h1 className="mt-4 text-2xl font-bold text-foreground">
                Create Account
              </h1>
              <p className="mt-1 text-sm text-muted">
                Join today and get free access to professional mental health care
              </p>
            </>
          )}
        </div>

        {error && (
          <div
            className="mb-6 rounded-lg bg-destructive-light border border-red-200 px-4 py-3 text-sm text-destructive"
            role="alert"
          >
            {error}
          </div>
        )}

        {success ? (
          <div className="space-y-4">
            <p className="rounded-lg bg-surface px-4 py-3 text-center text-xs text-muted">
              If you don&apos;t see the email, check your spam or junk folder.
              The confirmation link expires after 24 hours.
            </p>
            <Link href="/login" className="block">
              <button
                type="button"
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface cursor-pointer"
              >
                Go to Sign In
              </button>
            </Link>
            <p className="text-center text-sm text-muted">
              Didn&apos;t receive it?{" "}
              <Link
                href="/signup"
                className="font-medium text-primary hover:text-primary-dark transition-colors"
              >
                Try again
              </Link>
            </p>
          </div>
        ) : (
          <>
            <SignUpForm action={signUp} />

            <p className="mt-6 text-center text-sm text-muted">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:text-primary-dark transition-colors"
              >
                Sign In
              </Link>
            </p>

            <p className="mt-4 text-center text-xs leading-relaxed text-muted-light">
              By creating an account you agree to receive a confirmation link by
              email. Your information is kept confidential and secure.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
