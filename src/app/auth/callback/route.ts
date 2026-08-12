import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/";
  const error_code = searchParams.get("error_code");
  const error_description = searchParams.get("error_description") ?? "";

  // Only allow local redirects to avoid open-redirect vulnerabilities.
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/";
  const redirectTo = `${origin}${safeNext}`;

  const supabase = await createClient();

  // Supabase may redirect to this route with an error already attached
  // (e.g. expired or invalid link).
  if (error_code) {
    const isExpired =
      error_code === "otp_expired" ||
      error_description.toLowerCase().includes("expired");

    const dest = new URL(origin);
    dest.pathname = "/auth/verify";
    dest.searchParams.set("status", isExpired ? "expired" : "invalid");
    return NextResponse.redirect(dest);
  }

  // token_hash style links (used by recovery emails)
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type: type as "email" | "signup" | "magiclink" | "invite" | "recovery",
      token_hash,
    });

    if (error) {
      const dest = new URL(origin);
      dest.pathname = "/auth/verify";
      dest.searchParams.set(
        "status",
        error.message.toLowerCase().includes("expired") ? "expired" : "invalid"
      );
      return NextResponse.redirect(dest);
    }

    // Password recovery → go to the update-password page with a live session.
    if (type === "recovery") {
      return NextResponse.redirect(redirectTo);
    }

    return NextResponse.redirect(
      `${origin}/auth/confirm?verified=1`
    );
  }

  // PKCE code exchange (the standard flow)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      const dest = new URL(origin);
      dest.pathname = "/auth/verify";
      dest.searchParams.set(
        "status",
        error.message.toLowerCase().includes("expired") ? "expired" : "invalid"
      );
      return NextResponse.redirect(dest);
    }

    // If this was a recovery/password reset code, go to the requested page.
    if (safeNext !== "/") {
      return NextResponse.redirect(redirectTo);
    }

    return NextResponse.redirect(
      `${origin}/auth/confirm?verified=1`
    );
  }

  // No recognizable token or code — invalid state
  const dest = new URL(origin);
  dest.pathname = "/auth/verify";
  dest.searchParams.set("status", "invalid");
  return NextResponse.redirect(dest);
}
