import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Profile } from "@/lib/types";
import { getInitials } from "@/lib/utils";

export default async function AdminClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;
  const supabase = await createClient();

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "client")
    .order("created_at", { ascending: false })
    .returns<Profile[]>();

  if (error) {
    return (
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Clients</h1>
        </div>
        <Card>
          <div className="text-center py-12">
            <p className="text-destructive font-medium">Failed to load clients</p>
            <p className="text-sm text-muted mt-1">{error.message}</p>
          </div>
        </Card>
      </div>
    );
  }

  const allProfiles = profiles ?? [];

  const filtered = search
    ? allProfiles.filter((p) =>
        (p.full_name ?? "").toLowerCase().includes(search.toLowerCase()) ||
        (p.email ?? "").toLowerCase().includes(search.toLowerCase())
      )
    : allProfiles;

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Clients</h1>
          <p className="mt-1 text-sm text-muted">
            {filtered.length} client{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <form className="w-full sm:w-64">
          <Input
            name="search"
            placeholder="Search by name or email..."
            defaultValue={search ?? ""}
          />
        </form>
      </div>

      {filtered.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-muted-light"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
            <p className="mt-3 text-sm font-medium text-foreground">
              {search ? "No matching clients" : "No clients yet"}
            </p>
            <p className="mt-1 text-xs text-muted">
              {search
                ? "Try a different search term."
                : "Clients will appear when they create accounts."}
            </p>
          </div>
        </Card>
      ) : (
        <Card padding="none">
          <div className="divide-y divide-border">
            {filtered.map((profile) => (
              <div
                key={profile.id}
                className="flex flex-wrap items-center gap-4 px-6 py-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-sm font-medium text-primary-800">
                  {getInitials(profile.full_name)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {profile.full_name}
                  </p>
                  <p className="text-xs text-muted">{profile.email}</p>
                  <p className="text-xs text-muted-light">
                    {profile.contact_number || "No contact number"}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 ml-auto">
                  <Badge variant="info">Client</Badge>
                  <span className="text-xs text-muted-light">
                    Joined{" "}
                    {new Date(profile.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
