import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  AppointmentWithDetails,
  STATUS_LABELS,
  AppointmentStatus,
} from "@/lib/types";
import { formatDate, formatTime, getInitials } from "@/lib/utils";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const { data: appointments, error } = await supabase
    .from("appointments")
    .select(
      "*, profiles!appointments_client_id_fkey(full_name, email, contact_number), categories!appointments_category_id_fkey(name), events!appointments_event_id_fkey(name)"
    )
    .order("created_at", { ascending: false })
    .returns<AppointmentWithDetails[]>();

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <Card>
          <div className="text-center py-12">
            <p className="text-destructive font-medium">
              Failed to load dashboard data
            </p>
            <p className="text-sm text-muted mt-1">{error.message}</p>
          </div>
        </Card>
      </div>
    );
  }

  const allAppointments = appointments ?? [];
  const today = new Date().toISOString().split("T")[0];
  const firstOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  )
    .toISOString()
    .split("T")[0];

  const todayAppointments = allAppointments.filter(
    (a) => a.requested_date != null && a.requested_date === today
  );
  const monthAppointments = allAppointments.filter(
    (a) => a.requested_date != null && a.requested_date >= firstOfMonth
  );

  const stats = [
    {
      label: "Total Appointments",
      value: allAppointments.length,
      detail: `${monthAppointments.length} this month`,
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          />
        </svg>
      ),
      accent: "text-primary-600",
      bg: "bg-primary-50",
    },
    {
      label: "Pending",
      value: allAppointments.filter((a) => a.status === "pending").length,
      detail: `${todayAppointments.filter((a) => a.status === "pending").length} today`,
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      accent: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Confirmed",
      value: allAppointments.filter((a) => a.status === "confirmed").length,
      detail: `${monthAppointments.filter((a) => a.status === "confirmed").length} this month`,
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      accent: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Completed",
      value: allAppointments.filter((a) => a.status === "completed").length,
      detail: `${todayAppointments.filter((a) => a.status === "completed").length} today`,
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
          />
        </svg>
      ),
      accent: "text-gray-600",
      bg: "bg-gray-50",
    },
  ];

  const recentAppointments = allAppointments.slice(0, 10);
  const statusVariantMap: Record<
    AppointmentStatus,
    "default" | "success" | "warning" | "error" | "info"
  > = {
    pending: "warning",
    submitted: "info",
    under_review: "default",
    confirmed: "success",
    rescheduled: "warning",
    cancelled: "error",
    completed: "default",
  };

  return (
    <div className="space-y-8 fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">
          Overview of appointments and activity
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted">{stat.label}</p>
                <p className="mt-1 text-3xl font-bold text-foreground tabular-nums">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted-light">{stat.detail}</p>
              </div>
              <div className={`rounded-lg p-2.5 ${stat.bg} ${stat.accent}`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Recent Appointments
            </h2>
            <Link
              href="/admin/appointments"
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              View all
            </Link>
          </div>

          {recentAppointments.length === 0 ? (
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
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
                <p className="mt-3 text-sm font-medium text-foreground">
                  No appointments yet
                </p>
                <p className="mt-1 text-xs text-muted">
                  Appointments will appear here when clients book.
                </p>
              </div>
            </Card>
          ) : (
            <Card padding="none">
              <div className="divide-y divide-border">
                {recentAppointments.map((apt) => (
                  <Link
                    key={apt.id}
                    href={`/admin/appointments`}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-surface transition-colors"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-sm font-medium text-primary-800">
                      {apt.profiles?.full_name
                        ? getInitials(apt.profiles.full_name)
                        : "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {apt.profiles?.full_name ?? "Unknown Client"}
                      </p>
                      <p className="text-xs text-muted truncate">
                        {apt.categories?.name ?? "Unknown"} &middot;{" "}
                        {apt.events?.name ?? "Unknown"}
                      </p>
                      <p className="text-xs text-muted-light">
                        {apt.requested_date && apt.requested_time
                          ? `${formatDate(apt.requested_date)} at ${formatTime(apt.requested_time)}`
                          : "Schedule: To be arranged"}
                      </p>
                    </div>
                    <Badge
                      variant={statusVariantMap[apt.status]}
                      className="shrink-0"
                    >
                      {STATUS_LABELS[apt.status]}
                    </Badge>
                  </Link>
                ))}
              </div>
            </Card>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Quick Links
          </h2>
          <div className="space-y-3">
            <QuickLinkCard
              href="/admin/appointments"
              label="Appointments"
              description="View and manage all appointments"
              icon={
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
              }
            />
            <QuickLinkCard
              href="/admin/categories"
              label="Categories"
              description="Manage service categories"
              icon={
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                  />
                </svg>
              }
            />
            <QuickLinkCard
              href="/admin/events"
              label="Events"
              description="Manage events and services"
              icon={
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                  />
                </svg>
              }
            />
            <QuickLinkCard
              href="/admin/availability"
              label="Availability"
              description="Manage available time slots"
              icon={
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickLinkCard({
  href,
  label,
  description,
  icon,
}: {
  href: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <Card hover padding="sm" className="cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary">
            {icon}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">{label}</p>
            <p className="text-xs text-muted truncate">{description}</p>
          </div>
          <svg
            className="h-4 w-4 shrink-0 text-muted-light"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </Card>
    </Link>
  );
}
