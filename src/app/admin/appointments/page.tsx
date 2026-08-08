"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Loading";
import {
  AppointmentWithDetails,
  AppointmentStatus,
  STATUS_LABELS,
} from "@/lib/types";
import { formatDate, formatTime, getInitials, cn } from "@/lib/utils";

const STATUS_OPTIONS: AppointmentStatus[] = [
  "pending",
  "submitted",
  "under_review",
  "confirmed",
  "rescheduled",
  "cancelled",
  "completed",
];

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

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentWithDetails[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentWithDetails | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from("appointments")
        .select(
          "*, profiles!appointments_client_id_fkey(full_name, email, contact_number), categories!appointments_category_id_fkey(name), events!appointments_event_id_fkey(name)"
        )
        .order("created_at", { ascending: false })
        .returns<AppointmentWithDetails[]>();

      if (fetchError) throw fetchError;
      setAppointments(data ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load appointments"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const filtered = appointments
    .filter((a) =>
      statusFilter === "all" ? true : a.status === statusFilter
    )
    .filter((a) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (a.profiles?.full_name ?? "").toLowerCase().includes(q);
    })
    .sort((a, b) => {
      const cmp = a.requested_date.localeCompare(b.requested_date);
      return sortOrder === "desc" ? -cmp || 0 : cmp || 0;
    });

  async function handleStatusChange(newStatus: AppointmentStatus) {
    if (!selectedAppointment) return;
    setSaving(true);
    setSaveMessage(null);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from("appointments")
        .update({ status: newStatus })
        .eq("id", selectedAppointment.id);

      if (updateError) throw updateError;

      setSelectedAppointment({ ...selectedAppointment, status: newStatus });
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === selectedAppointment.id ? { ...a, status: newStatus } : a
        )
      );
      setSaveMessage({ type: "success", text: "Status updated successfully" });
    } catch (err) {
      setSaveMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to update status",
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveDetails(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedAppointment) return;
    setSaving(true);
    setSaveMessage(null);

    const form = e.currentTarget as HTMLFormElement;
    const adminNotes = (
      form.elements.namedItem("admin_notes") as HTMLTextAreaElement
    )?.value;
    const argaoReference = (
      form.elements.namedItem("argao_reference") as HTMLInputElement
    )?.value;

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from("appointments")
        .update({
          admin_notes: adminNotes || null,
          argao_reference: argaoReference || null,
        })
        .eq("id", selectedAppointment.id);

      if (updateError) throw updateError;

      const updated = {
        ...selectedAppointment,
        admin_notes: adminNotes || null,
        argao_reference: argaoReference || null,
      };
      setSelectedAppointment(updated);
      setAppointments((prev) =>
        prev.map((a) => (a.id === selectedAppointment.id ? updated : a))
      );
      setSaveMessage({
        type: "success",
        text: "Details saved successfully",
      });
    } catch (err) {
      setSaveMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to save details",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Appointments</h1>
        <Card>
          <div className="text-center py-12">
            <p className="text-destructive font-medium">Failed to load</p>
            <p className="text-sm text-muted mt-1">{error}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={fetchAppointments}
            >
              Retry
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Appointments</h1>
          <p className="mt-1 text-sm text-muted">
            {filtered.length} appointment{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Input
          placeholder="Search by client name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-64"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-border px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-light/40 focus:border-primary-light"
        >
          <option value="all">All Statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="rounded-lg border border-border px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-light/40 focus:border-primary-light"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
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
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
            <p className="mt-3 text-sm font-medium text-foreground">
              {searchQuery || statusFilter !== "all"
                ? "No matching appointments"
                : "No appointments yet"}
            </p>
            <p className="mt-1 text-xs text-muted">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your filters."
                : "Appointments will appear when clients book."}
            </p>
          </div>
        </Card>
      ) : (
        <Card padding="none">
          <div className="divide-y divide-border">
            {filtered.map((apt) => (
              <div
                key={apt.id}
                className="flex flex-wrap items-center gap-3 px-6 py-4 hover:bg-surface transition-colors"
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
                    {formatDate(apt.requested_date)} at{" "}
                    {formatTime(apt.requested_time)}
                  </p>
                </div>
                <Badge
                  variant={statusVariantMap[apt.status]}
                  className="shrink-0"
                >
                  {STATUS_LABELS[apt.status]}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setSelectedAppointment(
                      selectedAppointment?.id === apt.id ? null : apt
                    )
                  }
                >
                  {selectedAppointment?.id === apt.id ? "Close" : "Manage"}
                </Button>

                {selectedAppointment?.id === apt.id && (
                  <div className="w-full bg-surface rounded-lg border border-border p-4 mt-1 slide-in-right">
                    <AppointmentDetail
                      appointment={selectedAppointment}
                      onStatusChange={handleStatusChange}
                      onSaveDetails={handleSaveDetails}
                      saving={saving}
                      saveMessage={saveMessage}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

function AppointmentDetail({
  appointment,
  onStatusChange,
  onSaveDetails,
  saving,
  saveMessage,
}: {
  appointment: AppointmentWithDetails;
  onStatusChange: (status: AppointmentStatus) => void;
  onSaveDetails: (e: React.FormEvent) => void;
  saving: boolean;
  saveMessage: { type: "success" | "error"; text: string } | null;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Appointment Details
        </h3>
        <dl className="space-y-2 text-sm">
          <DetailRow label="Client" value={appointment.profiles?.full_name} />
          <DetailRow
            label="Email"
            value={appointment.profiles?.email}
            mono
          />
          <DetailRow
            label="Contact"
            value={appointment.profiles?.contact_number ?? "-"}
          />
          <DetailRow label="Category" value={appointment.categories?.name} />
          <DetailRow label="Event" value={appointment.events?.name} />
          <DetailRow
            label="Date"
            value={formatDate(appointment.requested_date)}
          />
          <DetailRow
            label="Time"
            value={formatTime(appointment.requested_time)}
          />
          <DetailRow
            label="Client Notes"
            value={appointment.client_notes || "-"}
          />
          <DetailRow
            label="Argao Reference"
            value={appointment.argao_reference || "-"}
          />
          <DetailRow label="Status">
            <Badge variant={statusVariantMap[appointment.status]}>
              {STATUS_LABELS[appointment.status]}
            </Badge>
          </DetailRow>
        </dl>
      </div>

      <form onSubmit={onSaveDetails} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Update Status
          </label>
          <select
            value={appointment.status}
            onChange={(e) =>
              onStatusChange(e.target.value as AppointmentStatus)
            }
            disabled={saving}
            className="w-full rounded-lg border border-border px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-light/40 focus:border-primary-light disabled:opacity-50"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={`admin_notes_${appointment.id}`}
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Admin Notes
          </label>
          <textarea
            id={`admin_notes_${appointment.id}`}
            name="admin_notes"
            rows={3}
            defaultValue={appointment.admin_notes ?? ""}
            disabled={saving}
            className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm transition-colors duration-200 placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-primary-light/40 focus:border-primary-light disabled:opacity-50 resize-y"
            placeholder="Add internal notes..."
          />
        </div>

        <div>
          <label
            htmlFor={`argao_ref_${appointment.id}`}
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Argao Reference
          </label>
          <input
            id={`argao_ref_${appointment.id}`}
            name="argao_reference"
            type="text"
            defaultValue={appointment.argao_reference ?? ""}
            disabled={saving}
            placeholder="e.g. ARG-12345"
            className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm transition-colors duration-200 placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-primary-light/40 focus:border-primary-light disabled:opacity-50"
          />
        </div>

        <Button type="submit" size="sm" isLoading={saving}>
          Save Changes
        </Button>

        {saveMessage && (
          <p
            className={cn(
              "text-xs",
              saveMessage.type === "success"
                ? "text-accent"
                : "text-destructive"
            )}
          >
            {saveMessage.text}
          </p>
        )}
      </form>
    </div>
  );
}

function DetailRow({
  label,
  value,
  mono,
  children,
}: {
  label: string;
  value?: string | null;
  mono?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-light shrink-0">{label}</dt>
      <dd
        className={cn(
          "text-foreground text-right truncate",
          mono && "font-mono text-xs"
        )}
      >
        {children ?? value ?? "-"}
      </dd>
    </div>
  );
}
