import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // If a custom "next" was requested, honor it; otherwise show the
      // email-confirmed confirmation screen.
      if (next) {
        return NextResponse.redirect(`${origin}${next}`);
      }
      return NextResponse.redirect(`${origin}/auth/confirm`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=authCallbackFailed`);
}
