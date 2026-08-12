import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Loading";
import { Button } from "@/components/ui/Button";
import { formatDate, formatTime } from "@/lib/utils";
import { STATUS_LABELS, STATUS_DESCRIPTIONS } from "@/lib/types";
import type { AppointmentWithDetails } from "@/lib/types";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: appointments } = await supabase
    .from("appointments")
    .select("*, categories(*), events(*)")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const { count: unreadCount } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("client_id", user.id)
    .eq("is_read", false);

  const latestAppointment = appointments?.[0] as
    | AppointmentWithDetails
    | undefined;

  return (
    <div className="space-y-6 fade-in">
      <section>
        <Card className="bg-gradient-to-br from-primary-50/70 to-white border-primary-100/50">
          <h1 className="text-2xl font-bold text-foreground">
            Welcome, {profile?.full_name ?? "there"}.
          </h1>
          <p className="mt-2 text-muted leading-relaxed">
            We&apos;re glad you&apos;re here. Your mental health journey
            matters, and we&apos;re honored to support you every step of the
            way. Take your time, explore your options, and reach out whenever
            you need us.
          </p>
        </Card>
      </section>

      <section>
        <Card>
          <p className="text-sm leading-relaxed text-muted">
            HELP IS ON THE WAY creates a community-based mental health first
            response network, leveraging youth leaders, student councils, SK
            officials, and volunteers to provide direct mental health support,
            peer support, practical PFA, and linkages to crisis hotlines or
            community support when necessary. We want to champion the power of
            peer support and community care to ensure that no one feels alone
            in their mental health struggles. Through conversation, connection,
            and compassion, we bring bayanihan into mental wellness.
          </p>
        </Card>
      </section>

      <section>
        <Card>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/book">
              <Button>Book a Session</Button>
            </Link>
            <Link href="/notifications">
              <Button variant="outline">
                Notifications
                {unreadCount != null && unreadCount > 0 && (
                  <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      <section>
        <Card>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Upcoming Appointment
          </h2>
          {latestAppointment ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <Badge
                  variant={
                    latestAppointment.status === "confirmed"
                      ? "success"
                      : latestAppointment.status === "cancelled"
                        ? "error"
                        : latestAppointment.status === "rescheduled"
                          ? "warning"
                          : latestAppointment.status === "under_review" ||
                              latestAppointment.status === "submitted"
                            ? "info"
                            : "default"
                  }
                  dot
                >
                  {STATUS_LABELS[latestAppointment.status]}
                </Badge>
                <span className="text-xs text-muted">
                  {STATUS_DESCRIPTIONS[latestAppointment.status]}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted">Category: </span>
                  <span className="font-medium text-foreground">
                    {latestAppointment.categories?.name ?? "—"}
                  </span>
                </div>
                <div>
                  <span className="text-muted">Event: </span>
                  <span className="font-medium text-foreground">
                    {latestAppointment.events?.name ?? "—"}
                  </span>
                </div>
                <div>
                  <span className="text-muted">Schedule: </span>
                  <span className="font-medium text-foreground">
                    {latestAppointment.requested_date &&
                    latestAppointment.requested_time
                      ? `${formatDate(latestAppointment.requested_date)} at ${formatTime(latestAppointment.requested_time)}`
                      : "To be arranged"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted mb-4">
                You don&apos;t have any upcoming appointments yet.
              </p>
              <Link href="/book">
                <Button>Book a Session</Button>
              </Link>
            </div>
          )}
        </Card>
      </section>

      <section>
        <Card>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Important Information
          </h2>
          <p className="text-sm text-muted mb-4">
            Please review our instructions to understand how the booking
            process works and how to prepare for your appointment.
          </p>
          <Link href="/instructions">
            <Button variant="outline">View Instructions</Button>
          </Link>
        </Card>
      </section>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-28 w-full" />
    </div>
  );
}
