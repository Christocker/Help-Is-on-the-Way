import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Loading";
import { formatDate, formatTime } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import type { Notification } from "@/lib/types";

async function markAllAsRead(userId: string) {
  "use server";

  const supabase = await createClient();

  await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("client_id", userId)
    .eq("is_read", false);

  revalidatePath("/notifications");
}

async function markAsRead(notificationId: string) {
  "use server";

  const supabase = await createClient();

  await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", notificationId);

  revalidatePath("/notifications");
}

export default async function NotificationsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: notifications } = (await supabase
    .from("notifications")
    .select("*")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false })) as {
    data: Notification[] | null;
  };

  const hasUnread = notifications?.some((n) => !n.is_read) ?? false;

  return (
    <div className="max-w-2xl space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Notifications
          </h1>
          <p className="mt-1 text-muted">
            Stay updated on your appointment status.
          </p>
        </div>
        {hasUnread && notifications && notifications.length > 0 && (
          <form action={markAllAsRead.bind(null, user.id)}>
            <button
              type="submit"
              className="text-sm text-primary hover:text-primary-dark font-medium cursor-pointer transition-colors"
            >
              Mark all as read
            </button>
          </form>
        )}
      </div>

      {!notifications || notifications.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-muted">
            You don&apos;t have any notifications yet.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={
                !notification.is_read
                  ? "border-l-4 border-l-primary"
                  : undefined
              }
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    {!notification.is_read && (
                      <Badge variant="info" dot>
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted">
                    {formatDate(notification.created_at)} at{" "}
                    {formatTime(
                      new Date(notification.created_at).toTimeString().slice(0, 5)
                    )}
                  </p>
                </div>
                {!notification.is_read && (
                  <form action={markAsRead.bind(null, notification.id)}>
                    <button
                      type="submit"
                      className="text-xs text-primary hover:text-primary-dark font-medium cursor-pointer transition-colors shrink-0"
                    >
                      Mark read
                    </button>
                  </form>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export function NotificationsSkeleton() {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-5 w-64 mt-2" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  );
}
