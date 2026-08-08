import { Skeleton } from "@/components/ui/Loading";
import { Card } from "@/components/ui/Card";

export default function AppointmentsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Appointments</h1>
        <p className="mt-1 text-sm text-muted">Loading appointments...</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-48" />
      </div>

      <Card padding="none">
        <div className="divide-y divide-border">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-56" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-8 w-24" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
