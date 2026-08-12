import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AuthShell } from "@/components/layout/AuthShell";
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
  const supabase = await createClient();

  // The user must arrive here with a live session (via the auth callback that
  // exchanges the recovery code). If there's no session, they can't update
  // their password — send them back to request a new reset link.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/forgot-password?error=" + encodeURIComponent("Please request a new password reset link and open it in the same browser."));
  }

  return (
    <AuthShell
      title="Update Password"
      subtitle="Create a new password for your account"
      icon={
        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
        </svg>
      }
      footer={
        <p className="text-center text-sm text-muted">
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

      <UpdatePasswordForm action={updatePassword} />
    </AuthShell>
  );
}
