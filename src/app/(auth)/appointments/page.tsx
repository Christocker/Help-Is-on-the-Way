import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Loading";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";
import { formatDate, formatTime } from "@/lib/utils";
import {
  STATUS_LABELS,
  STATUS_DESCRIPTIONS,
  type AppointmentStatus,
  type AppointmentWithDetails,
} from "@/lib/types";
import Link from "next/link";

function statusBadgeVariant(
  status: AppointmentStatus
): "default" | "success" | "warning" | "error" | "info" {
  switch (status) {
    case "confirmed":
    case "completed":
      return "success";
    case "cancelled":
      return "error";
    case "rescheduled":
      return "warning";
    case "under_review":
    case "submitted":
      return "info";
    default:
      return "default";
  }
}

export default async function AppointmentsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: appointments } = (await supabase
    .from("appointments")
    .select("*, categories(*), events(*)")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false })) as {
    data: AppointmentWithDetails[] | null;
  };

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          My Appointments
        </h1>
        <p className="mt-1 text-muted">
          View and track all your appointment requests.
        </p>
      </div>

      {!appointments || appointments.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-muted mb-4">
            You don&apos;t have any appointments yet.
          </p>
          <Link href="/book">
            <Button>Book a Session</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <Card key={appt.id} hover>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      variant={statusBadgeVariant(appt.status)}
                      dot
                    >
                      {STATUS_LABELS[appt.status]}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {appt.events?.name ?? "Unknown Event"}
                  </h3>
                  <p className="text-sm text-muted">
                    {appt.categories?.name ?? "Unknown Category"}
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                    <span className="text-muted">
                      Schedule:{" "}
                      <span className="font-medium text-foreground">
                        {appt.requested_date && appt.requested_time
                          ? `${formatDate(appt.requested_date)} at ${formatTime(appt.requested_time)}`
                          : "To be arranged"}
                      </span>
                    </span>
                  </div>
                  <p className="text-xs text-muted mt-1">
                    {STATUS_DESCRIPTIONS[appt.status]}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export function AppointmentsSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-5 w-64 mt-2" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-36 w-full" />
        <Skeleton className="h-36 w-full" />
        <Skeleton className="h-36 w-full" />
      </div>
    </div>
  );
}
