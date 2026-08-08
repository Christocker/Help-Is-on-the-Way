import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EmailConfirmed } from "@/components/auth/EmailConfirmed";

export default async function AuthConfirmPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // No session → not verified (or link processed without session). Route to
  // the verify page so the user gets a meaningful state, not a dead end.
  if (!user) {
    redirect("/auth/verify?status=expired");
  }

  // If the account isn't actually confirmed, don't pretend it is. The auth
  // provider marks the email confirmed server-side only when a valid, unexpired
  // token is used — so an unconfirmed account here means the link was invalid
  // or expired.
  if (!user.email_confirmed_at) {
    const dest = new URL("/auth/verify", "https://help-is-on-the-way.vercel.app");
    if (user.email) dest.searchParams.set("email", user.email);
    redirect(`${dest.pathname}${dest.search}`);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === "admin";
  const dashboardHref = isAdmin ? "/admin" : "/dashboard";

  return <EmailConfirmed email={user.email ?? ""} dashboardHref={dashboardHref} />;
}
