"use client";

import { getCategoryById, getEventById } from "@/lib/data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatDate, formatTime } from "@/lib/utils";
import { useState } from "react";

interface StepReviewProps {
  categoryId: string;
  eventId: string;
  requestedDate: string;
  requestedTime: string;
  onSubmit: () => Promise<void>;
}

export function StepReview({
  categoryId,
  eventId,
  requestedDate,
  requestedTime,
  onSubmit,
}: StepReviewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const category = getCategoryById(categoryId);
  const event = getEventById(eventId);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  const formatDuration = (minutes: number): string => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remaining = minutes % 60;
      return remaining > 0 ? `${hours}h ${remaining}m` : `${hours}h`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Review & Confirm
        </h2>
        <p className="mt-1 text-sm text-muted">
          Review your booking details before submitting.
        </p>
      </div>

      <div className="space-y-6">
        {/* Booking Details Card */}
        <Card>
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Appointment Details
          </h3>
          <dl className="divide-y divide-border">
            <div className="flex justify-between py-3 first:pt-0">
              <dt className="text-sm text-muted">Category</dt>
              <dd className="text-sm font-medium text-foreground">
                {category?.name ?? "Unknown"}
              </dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="text-sm text-muted">Service</dt>
              <dd className="text-right text-sm font-medium text-foreground">
                <div>{event?.name ?? "Unknown"}</div>
                {event?.duration && (
                  <span className="text-xs text-muted">
                    {formatDuration(event.duration)}
                  </span>
                )}
              </dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="text-sm text-muted">Date</dt>
              <dd className="text-sm font-medium text-foreground">
                {formatDate(requestedDate)}
              </dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="text-sm text-muted">Time</dt>
              <dd className="text-sm font-medium text-foreground">
                {formatTime(requestedTime)}
              </dd>
            </div>
          </dl>
        </Card>

        {/* Information Messages */}
        <Card className="border-primary/20 bg-primary-50/50">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <svg
                className="h-4 w-4 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-primary-800">
                No payment is required from you.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-primary-700/80">
                After you submit your request, Help Is on the Way will arrange the
                corresponding appointment with our partner mental healthcare provider on
                your behalf.
              </p>
            </div>
          </div>
        </Card>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            disabled={isSubmitting}
          >
            Back
          </Button>
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Confirm Booking
          </Button>
        </div>
      </div>
    </div>
  );
}
