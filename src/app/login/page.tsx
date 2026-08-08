import { Card } from "@/components/ui/Card";
import { signIn } from "@/app/auth/actions";
import Link from "next/link";
import { LoginForm } from "./LoginForm";

interface LoginPageProps {
  searchParams: Promise<{ error?: string; message?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error, message } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
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
          <h1 className="text-2xl font-bold text-foreground">Help Is on the Way</h1>
          <p className="text-sm text-muted mt-1">Sign in to your account</p>
        </div>

        {message && (
          <div className="mb-6 rounded-lg bg-primary-50 border border-primary-100 px-4 py-3 text-sm text-primary-800">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-lg bg-destructive-light border border-red-200 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <LoginForm action={signIn} />

        <p className="mt-6 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-primary hover:text-primary-dark transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </Card>
    </main>
  );
}
