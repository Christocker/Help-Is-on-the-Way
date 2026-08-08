import { AuthShell } from "@/components/layout/AuthShell";
import { signIn } from "@/app/auth/actions";
import Link from "next/link";
import { LoginForm } from "./LoginForm";

interface LoginPageProps {
  searchParams: Promise<{ error?: string; message?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error, message } = await searchParams;

  return (
    <AuthShell
      title="Sign in to your account"
      subtitle="Welcome back. Access your appointments and book new sessions."
      footer={
        <p className="text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-primary hover:text-primary-dark transition-colors"
          >
            Sign Up
          </Link>
        </p>
      }
    >
      {message && (
        <div className="mb-6 rounded-lg bg-primary-50 border border-primary-100 px-4 py-3 text-sm text-primary-800">
          {message}
        </div>
      )}

      {error && (
        <div
          className="mb-6 rounded-lg bg-destructive-light border border-red-200 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {error}
        </div>
      )}

      <LoginForm action={signIn} />
    </AuthShell>
  );
}
