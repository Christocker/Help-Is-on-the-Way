import { AuthShell } from "@/components/layout/AuthShell";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { resetPassword } from "@/app/auth/actions";
import Link from "next/link";

interface ForgotPasswordPageProps {
  searchParams: Promise<{ error?: string; success?: string }>;
}

export default async function ForgotPasswordPage({
  searchParams,
}: ForgotPasswordPageProps) {
  const { error, success } = await searchParams;

  return (
    <AuthShell
      title="Forgot Password"
      subtitle="We'll send a reset link to your email"
      icon={
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      }
      footer={
        <p className="text-center text-sm text-muted">
          Remembered your password?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:text-primary-dark transition-colors"
          >
            Back to Sign In
          </Link>
        </p>
      }
    >
      {error && (
        <div
          className="mb-6 rounded-lg bg-destructive-light border border-red-200 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {error}
        </div>
      )}

      {success ? (
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-4 rounded-xl bg-primary-50 border border-primary-100 px-4 py-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <p className="text-sm text-primary-800">{success}</p>
          </div>
          <Link href="/login" className="block">
            <Button type="button" variant="outline" size="lg" className="w-full">
              Back to Sign In
            </Button>
          </Link>
        </div>
      ) : (
        <form action={resetPassword} className="space-y-5">
          <Input
            id="email"
            name="email"
            type="email"
            label="Email address"
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
          >
            Send Reset Link
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
