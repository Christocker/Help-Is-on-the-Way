import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { signUp } from "@/app/auth/actions";
import Link from "next/link";
import { SignUpForm } from "./SignUpForm";

interface SignUpPageProps {
  searchParams: Promise<{ error?: string; message?: string }>;
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const { error } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-md fade-in" padding="lg">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
          <p className="text-sm text-muted mt-1">
            Join Help Is on the Way today
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-destructive-light border border-red-200 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

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
      </Card>
    </main>
  );
}
