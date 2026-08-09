"use client";

import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface StepDateTimeProps {
  selectedDate: string | null;
  selectedTime: string | null;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
}

function toLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function generateDates() {
  const dates: { dateString: string; dayOfWeek: string; day: number; month: string }[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });
    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const dateString = toLocalDateString(date);

    dates.push({ dateString, dayOfWeek, day, month });
  }

  return dates;
}

function generateTimeSlots() {
  const slots: { value: string; label: string }[] = [];
  for (let h = 8; h <= 17; h++) {
    const hour = h % 12 || 12;
    const ampm = h < 12 ? "AM" : "PM";
    const value = `${h.toString().padStart(2, "0")}:00`;
    slots.push({ value, label: `${hour}:00 ${ampm}` });
  }
  return slots;
}

const DATES = generateDates();
const TIME_SLOTS = generateTimeSlots();

export function StepDateTime({
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
}: StepDateTimeProps) {
  const isSunday = (dateString: string) => {
    const d = new Date(dateString + "T00:00:00");
    return d.getDay() === 0;
  };

  // Disable Sundays as unavailable
  const isDateAvailable = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(dateString + "T00:00:00");
    if (date < today) return false;
    return !isSunday(dateString);
  };

  const formattedDateLabel = useMemo(() => {
    if (!selectedDate) return null;
    const d = new Date(selectedDate + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [selectedDate]);

  const formattedTimeLabel = useMemo(() => {
    if (!selectedTime) return null;
    const slot = TIME_SLOTS.find((s) => s.value === selectedTime);
    return slot?.label ?? selectedTime;
  }, [selectedTime]);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Select Date & Time
        </h2>
        <p className="mt-1 text-sm text-muted">
          Choose your preferred date and time for the appointment.
        </p>
      </div>

      <div className="space-y-8">
        {/* Date Selection */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
            Date
          </h3>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10">
            {DATES.map((date) => {
              const available = isDateAvailable(date.dateString);
              const isSelected = selectedDate === date.dateString;

              return (
                <button
                  key={date.dateString}
                  type="button"
                  disabled={!available}
                  onClick={() => {
                    onSelectDate(date.dateString);
                    if (selectedTime) onSelectTime("");
                  }}
                  className={cn(
                    "flex flex-col items-center rounded-lg border px-2 py-3 text-center transition-all duration-150",
                    available &&
                      !isSelected &&
                      "border-border bg-white hover:border-primary hover:bg-primary-50/50",
                    isSelected &&
                      "border-primary bg-primary text-white shadow-sm",
                    !available &&
                      "cursor-not-allowed border-border bg-muted/30 text-muted opacity-40"
                  )}
                >
                  <span className="text-[11px] font-medium uppercase leading-none">
                    {date.dayOfWeek}
                  </span>
                  <span
                    className={cn(
                      "mt-1 text-lg font-bold leading-none",
                      isSelected ? "text-white" : "text-foreground"
                    )}
                  >
                    {date.day}
                  </span>
                  <span className="mt-0.5 text-[11px] leading-none">{date.month}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Selection */}
        {selectedDate && formattedDateLabel && (
          <div>
            <div className="mb-3 flex items-center gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                Available Times
              </h3>
              <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                {formattedDateLabel}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {TIME_SLOTS.map((slot) => {
                const isSelected = selectedTime === slot.value;

                return (
                  <button
                    key={slot.value}
                    type="button"
                    onClick={() => onSelectTime(slot.value)}
                    className={cn(
                      "rounded-lg border px-3 py-2.5 text-center text-sm font-medium transition-all duration-150",
                      !isSelected &&
                        "border-border bg-white text-foreground hover:border-primary hover:bg-primary-50/50",
                      isSelected &&
                        "border-primary bg-primary text-white shadow-sm"
                    )}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Selection Summary */}
        {selectedDate && selectedTime && (
          <div className="rounded-lg border border-primary/20 bg-primary-50/50 p-4">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm font-medium text-foreground">
                {formattedDateLabel} at {formattedTimeLabel}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
