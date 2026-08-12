import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EmailConfirmed } from "@/components/auth/EmailConfirmed";

export default async function AuthConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ verified?: string }>;
}) {
  const { verified } = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // No session → redirect to verify page so the user has a clear next step.
  if (!user) {
    redirect("/auth/verify?status=expired");
  }

  // When the callback successfully exchanged the code, it adds ?verified=1.
  // We trust this and show the confirmed state even if the email_confirmed_at
  // timestamp hasn't fully propagated yet.
  const isVerified = Boolean(verified);

  // If we didn't come from a successful exchange and the email isn't
  // confirmed, we can't show the success page — redirect to verify.
  if (!isVerified && !user.email_confirmed_at) {
    const dest = new URL(
      "/auth/verify",
      "https://help-is-on-the-way.vercel.app"
    );
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

  return (
    <EmailConfirmed email={user.email ?? ""} dashboardHref={dashboardHref} />
  );
}
