import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { updatePassword } from "@/app/auth/actions";
import Link from "next/link";
import { UpdatePasswordForm } from "./UpdatePasswordForm";

interface UpdatePasswordPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function UpdatePasswordPage({
  searchParams,
}: UpdatePasswordPageProps) {
  const { error } = await searchParams;

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
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Update Password
          </h1>
          <p className="text-sm text-muted mt-1">
            Create a new password for your account
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-destructive-light border border-red-200 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <UpdatePasswordForm action={updatePassword} />

        <p className="mt-6 text-center text-sm text-muted">
          <Link
            href="/login"
            className="font-medium text-primary hover:text-primary-dark transition-colors"
          >
            Back to Sign In
          </Link>
        </p>
      </Card>
    </main>
  );
}
