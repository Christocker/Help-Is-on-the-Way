"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { normalizePhoneNumber } from "@/lib/utils";

function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL || "https://help-is-on-the-way.vercel.app"
  );
}

function redirectNotConfigured(backTo: string): never {
  redirect(
    `${backTo}?error=${encodeURIComponent(
      "The app isn't connected to its database yet. Please try again later."
    )}`
  );
}

export async function resendVerificationEmail(email: string) {
  if (!isSupabaseConfigured()) {
    return { ok: false as const, error: "Email service is not configured." };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: `${siteUrl()}/auth/callback?email=${encodeURIComponent(email)}`,
    },
  });

  if (error) {
    return { ok: false as const, error: error.message };
  }

  return { ok: true as const };
}

export async function signUp(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirectNotConfigured("/signup");
  }

  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const first_name = formData.get("first_name") as string;
  const middle_name = formData.get("middle_name") as string;
  const last_name = formData.get("last_name") as string;
  const contact_number = normalizePhoneNumber(
    (formData.get("contact_number") as string) ?? ""
  );

  const full_name = [first_name.trim(), middle_name?.trim(), last_name.trim()]
    .filter(Boolean)
    .join(" ");

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        first_name: first_name.trim(),
        middle_name: middle_name?.trim() || null,
        last_name: last_name.trim(),
        contact_number: contact_number || null,
        role: "client",
      },
      emailRedirectTo: `${siteUrl()}/auth/callback?email=${encodeURIComponent(email)}`,
    },
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect(`/signup?success=1&email=${encodeURIComponent(email)}`);
}

export async function signIn(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirectNotConfigured("/login");
  }

  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Unverified account → send the user to the verification page with the
    // email pre-filled so they can resend, instead of a raw error.
    const msg = error.message.toLowerCase();
    if (msg.includes("not confirmed") || msg.includes("email not verified")) {
      redirect(
        `/auth/verify?email=${encodeURIComponent(email)}`
      );
    }
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .single();

  revalidatePath("/", "layout");

  if (profile?.role === "admin") {
    redirect("/admin");
  }
  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
  redirect("/login");
}

export async function resetPassword(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirectNotConfigured("/forgot-password");
  }

  const supabase = await createClient();

  const email = formData.get("email") as string;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl()}/update-password`,
  });

  if (error) {
    redirect(`/forgot-password?error=${encodeURIComponent(error.message)}`);
  }

  redirect(
    "/forgot-password?success=" +
      encodeURIComponent("Check your email for the reset link")
  );
}

export async function updatePassword(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirectNotConfigured("/update-password");
  }

  const supabase = await createClient();

  const password = formData.get("password") as string;

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    redirect(`/update-password?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect("/login?message=" + encodeURIComponent("Password updated successfully. Please sign in."));
}
