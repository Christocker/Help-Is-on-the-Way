import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/Sidebar";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: profile }, { count: unreadCount }] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, email")
      .eq("id", user.id)
      .single(),
    supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("client_id", user.id)
      .eq("is_read", false),
  ]);

  const displayName = profile?.full_name ?? user.email?.split("@")[0] ?? "User";
  const displayEmail = profile?.email ?? user.email ?? "";

  return (
    <div className="min-h-screen">
      <Sidebar
        user={{
          full_name: displayName,
          email: displayEmail,
        }}
        unreadNotifications={unreadCount ?? 0}
      />
      <main className="lg:pl-64">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
