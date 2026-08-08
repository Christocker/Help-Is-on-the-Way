"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

function redirectNotConfigured(backTo: string): never {
  redirect(
    `${backTo}?error=${encodeURIComponent(
      "The app isn't connected to its database yet. Please try again later."
    )}`
  );
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
  const contact_number = formData.get("contact_number") as string;

  const full_name = [first_name.trim(), middle_name?.trim(), last_name.trim()]
    .filter(Boolean)
    .join(" ");

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://help-is-on-the-way.vercel.app";

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
      emailRedirectTo: `${siteUrl}/auth/callback`,
    },
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect("/signup?success=1");
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
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
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
    redirectTo: `${
      process.env.NEXT_PUBLIC_SITE_URL || "https://help-is-on-the-way.vercel.app"
    }/update-password`,
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
