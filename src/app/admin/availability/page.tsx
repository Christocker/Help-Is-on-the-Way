"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Loading";
import { Availability } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function AdminAvailabilityPage() {
  const [slots, setSlots] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [maxBookings, setMaxBookings] = useState(1);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const fetchSlots = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from("availability")
        .select("*")
        .order("date", { ascending: true })
        .returns<Availability[]>();

      if (fetchError) throw fetchError;
      setSlots(data ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load availability"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  async function handleAddSlot(e: React.FormEvent) {
    e.preventDefault();
    if (!date || !timeSlot) return;

    setAdding(true);
    setMessage(null);
    try {
      const supabase = createClient();
      const { error: insertError } = await supabase
        .from("availability")
        .insert({
          date,
          time_slot: timeSlot,
          max_bookings: maxBookings,
          current_bookings: 0,
          is_available: true,
        });

      if (insertError) throw insertError;

      setDate("");
      setTimeSlot("");
      setMaxBookings(1);
      setMessage({ type: "success", text: "Time slot added successfully" });
      await fetchSlots();
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to add slot",
      });
    } finally {
      setAdding(false);
    }
  }

  async function handleToggle(slot: Availability) {
    setMessage(null);
    try {
      const supabase = createClient();
      const newState = !slot.is_available;
      const { error: updateError } = await supabase
        .from("availability")
        .update({ is_available: newState })
        .eq("id", slot.id);

      if (updateError) throw updateError;

      setSlots((prev) =>
        prev.map((s) =>
          s.id === slot.id ? { ...s, is_available: newState } : s
        )
      );
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to update slot",
      });
    }
  }

  async function handleUpdateMaxBookings(slot: Availability, newMax: number) {
    setMessage(null);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from("availability")
        .update({ max_bookings: newMax })
        .eq("id", slot.id);

      if (updateError) throw updateError;

      setSlots((prev) =>
        prev.map((s) =>
          s.id === slot.id ? { ...s, max_bookings: newMax } : s
        )
      );
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err instanceof Error ? err.message : "Failed to update max bookings",
      });
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
        <h1 className="text-2xl font-bold text-foreground">Availability</h1>
        <Card>
          <div className="text-center py-12">
            <p className="text-destructive font-medium">Failed to load</p>
            <p className="text-sm text-muted mt-1">{error}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={fetchSlots}
            >
              Retry
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const groupedByDate = slots.reduce<Record<string, Availability[]>>(
    (acc, slot) => {
      if (!acc[slot.date]) acc[slot.date] = [];
      acc[slot.date].push(slot);
      return acc;
    },
    {}
  );
  const dateKeys = Object.keys(groupedByDate).sort();

  return (
    <div className="space-y-8 fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Availability</h1>
        <p className="mt-1 text-sm text-muted">
          Manage available dates and time slots
        </p>
      </div>

      <Card>
        <h2 className="text-sm font-semibold text-foreground mb-4">
          Add New Time Slot
        </h2>
        <form onSubmit={handleAddSlot} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <Input
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <Input
              label="Time Slot"
              type="time"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              required
            />
            <Input
              label="Max Bookings"
              type="number"
              min={1}
              max={50}
              value={maxBookings}
              onChange={(e) => setMaxBookings(Number(e.target.value))}
              required
            />
          </div>
          <Button type="submit" size="sm" isLoading={adding}>
            Add Slot
          </Button>
        </form>
      </Card>

      {message && (
        <div
          className={cn(
            "rounded-lg border px-4 py-3 text-sm",
            message.type === "success"
              ? "bg-accent/10 border-accent/30 text-accent"
              : "bg-destructive-light border-red-200 text-destructive"
          )}
        >
          {message.text}
        </div>
      )}

      {dateKeys.length === 0 ? (
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
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="mt-3 text-sm font-medium text-foreground">
              No availability slots
            </p>
            <p className="mt-1 text-xs text-muted">
              Add dates and time slots above to start accepting bookings.
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {dateKeys.map((dateKey) => (
            <Card key={dateKey} padding="sm">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {formatDate(dateKey)}
              </h3>
              <div className="space-y-2">
                {groupedByDate[dateKey]
                  .sort((a, b) => a.time_slot.localeCompare(b.time_slot))
                  .map((slot) => (
                    <div
                      key={slot.id}
                      className="flex flex-wrap items-center gap-3 rounded-lg border border-border px-4 py-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">
                            {slot.time_slot}
                          </span>
                          <Badge
                            variant={
                              slot.is_available ? "success" : "error"
                            }
                            dot
                          >
                            {slot.is_available ? "Available" : "Unavailable"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted mt-0.5">
                          Booked: {slot.current_bookings} / {slot.max_bookings}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={slot.max_bookings}
                          onChange={(e) =>
                            handleUpdateMaxBookings(
                              slot,
                              Number(e.target.value)
                            )
                          }
                          className="rounded-lg border border-border px-2 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-primary-light/40"
                        >
                          {Array.from({ length: 10 }, (_, i) => i + 1).map(
                            (n) => (
                              <option key={n} value={n}>
                                Max: {n}
                              </option>
                            )
                          )}
                        </select>
                        <Button
                          variant={slot.is_available ? "secondary" : "outline"}
                          size="sm"
                          onClick={() => handleToggle(slot)}
                        >
                          {slot.is_available ? "Disable" : "Enable"}
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
