import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminSdk } from "@supabase/supabase-js";

async function emailIsConfirmed(email: string | null): Promise<boolean> {
  if (!email) return false;
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return false;
    const admin = createAdminSdk(url, key, { auth: { persistSession: false } });
    const { data } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
    const user = data?.users?.find(
      (u) => u.email?.toLowerCase() === email.toLowerCase()
    );
    return Boolean(user?.email_confirmed_at);
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const error_code = searchParams.get("error_code");
  const error_description = searchParams.get("error_description") ?? "";
  const email = searchParams.get("email");

  const supabase = await createClient();

  // Supabase may redirect to this route with an error already attached
  // (e.g. expired or invalid link). Detect and route to the right state.
  if (error_code) {
    const isExpired =
      error_code === "otp_expired" ||
      error_description.toLowerCase().includes("expired");

    // If the error is a "not recognized / already used" code but the email is
    // actually confirmed (e.g. the link was processed by a mail-app preview),
    // treat it as a successful verification instead of a dead-end.
    if (!isExpired && (await emailIsConfirmed(email))) {
      return NextResponse.redirect(`${origin}/auth/confirm`);
    }

    const dest = new URL(origin);
    dest.pathname = "/auth/verify";
    if (email) dest.searchParams.set("email", email);
    dest.searchParams.set("status", isExpired ? "expired" : "invalid");
    return NextResponse.redirect(dest);
  }

  // token_hash style links (some Supabase email templates use these)
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type: type as "email" | "signup" | "magiclink" | "invite",
      token_hash,
    });

    if (error) {
      if (await emailIsConfirmed(email)) {
        return NextResponse.redirect(`${origin}/auth/confirm`);
      }
      const dest = new URL(origin);
      dest.pathname = "/auth/verify";
      if (email) dest.searchParams.set("email", email);
      dest.searchParams.set(
        "status",
        error.message.toLowerCase().includes("expired") ? "expired" : "invalid"
      );
      return NextResponse.redirect(dest);
    }

    return NextResponse.redirect(`${origin}/auth/confirm`);
  }

  // PKCE code exchange (the standard flow)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      // The code may have been consumed already (e.g. by a mail-app preview or
      // opened in a different browser without the PKCE verifier cookie), while
      // the email itself was confirmed by the auth provider. Let the user
      // through if the account is genuinely verified.
      if (await emailIsConfirmed(email)) {
        return NextResponse.redirect(`${origin}/auth/confirm`);
      }
      const dest = new URL(origin);
      dest.pathname = "/auth/verify";
      if (email) dest.searchParams.set("email", email);
      dest.searchParams.set(
        "status",
        error.message.toLowerCase().includes("expired") ? "expired" : "invalid"
      );
      return NextResponse.redirect(dest);
    }

    // Successfully verified → confirmation success page
    return NextResponse.redirect(`${origin}/auth/confirm`);
  }

  // No recognizable token → check if the account is confirmed anyway.
  if (await emailIsConfirmed(email)) {
    return NextResponse.redirect(`${origin}/auth/confirm`);
  }

  // Otherwise invalid state
  const dest = new URL(origin);
  dest.pathname = "/auth/verify";
  if (email) dest.searchParams.set("email", email);
  dest.searchParams.set("status", "invalid");
  return NextResponse.redirect(dest);
}
