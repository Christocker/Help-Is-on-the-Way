"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ProgressIndicator } from "./_components/ProgressIndicator";
import { StepCategory } from "./_components/StepCategory";
import { StepEvent } from "./_components/StepEvent";
import { StepReview } from "./_components/StepReview";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Loading";
import { BookingData, Category, Event } from "@/lib/types";

type BookingState = {
  category_id: string | null;
  event_id: string | null;
  client_notes: string | null;
};

const INITIAL_STATE: BookingState = {
  category_id: null,
  event_id: null,
  client_notes: null,
};

export default function BookPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<BookingState>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const supabase = createClient();
        const [{ data: cats }, { data: evts }] = await Promise.all([
          supabase
            .from("categories")
            .select("*")
            .eq("is_active", true)
            .order("sort_order", { ascending: true })
            .returns<Category[]>(),
          supabase
            .from("events")
            .select("*")
            .eq("is_active", true)
            .order("name", { ascending: true })
            .returns<Event[]>(),
        ]);
        if (!cancelled) {
          setCategories(cats ?? []);
          setEvents(evts ?? []);
        }
      } catch {
        // leave lists empty; UI will show empty state
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedCategory = categories.find(
    (c) => c.id === booking.category_id
  );
  const selectedEvent = events.find((e) => e.id === booking.event_id);
  const categoryEvents = events.filter(
    (e) => e.category_id === booking.category_id
  );

  const completedSteps = (() => {
    const completed: number[] = [];
    if (step > 1) completed.push(1);
    if (step > 2) completed.push(2);
    return completed;
  })();

  const handleSelectCategory = useCallback(
    (categoryId: string) => {
      setBooking({
        ...INITIAL_STATE,
        category_id: categoryId,
      });
    },
    []
  );

  const handleSelectEvent = useCallback((eventId: string) => {
    setBooking((prev) => ({
      ...prev,
      event_id: eventId,
    }));
  }, []);

  const canProceedFromStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return booking.category_id !== null;
      case 2:
        return booking.event_id !== null;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!canProceedFromStep(step)) return;
    if (step < 3) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      router.push("/dashboard");
    }
  };

  const handleSubmit = async () => {
    if (!booking.category_id || !booking.event_id) {
      setSubmissionError("Missing required booking information.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("You must be logged in to book an appointment.");
      }

      const bookingData: BookingData = {
        category_id: booking.category_id,
        event_id: booking.event_id,
        client_notes: booking.client_notes ?? undefined,
      };

      const { data: appointment, error: appointmentError } = await supabase
        .from("appointments")
        .insert({
          client_id: user.id,
          category_id: bookingData.category_id,
          event_id: bookingData.event_id,
          status: "submitted",
          client_notes: bookingData.client_notes ?? null,
        })
        .select("id")
        .single();

      if (appointmentError) {
        throw new Error(appointmentError.message);
      }

      const { error: notificationError } = await supabase
        .from("notifications")
        .insert({
          client_id: user.id,
          appointment_id: appointment.id,
          message:
            "Your appointment request has been submitted. Our team will email you a proposed schedule within 24-48 hours for you to confirm.",
          is_read: false,
        });

      if (notificationError) {
        console.error("Failed to create notification:", notificationError.message);
      }

      setIsSuccess(true);
    } catch (err) {
      setSubmissionError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="mx-auto max-w-2xl py-8">
        <div className="rounded-xl border border-green-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            Your appointment request has been submitted.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
            Our team will coordinate with our partner mental healthcare provider
            and email you a proposed schedule within 24-48 hours for you to
            confirm. No payment is required from you.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push("/appointments")}
            >
              View My Appointments
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push("/dashboard")}
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <ProgressIndicator currentStep={step} completedSteps={completedSteps} />

      <div className="mt-8">
        {step === 1 && (
          <StepCategory
            categories={categories}
            selectedCategoryId={booking.category_id}
            onSelect={handleSelectCategory}
          />
        )}

        {step === 2 && booking.category_id && (
          <StepEvent
            categoryName={selectedCategory?.name ?? ""}
            events={categoryEvents}
            selectedEventId={booking.event_id}
            onSelect={handleSelectEvent}
          />
        )}

        {step === 3 && booking.category_id && booking.event_id && (
          <StepReview
            categoryName={selectedCategory?.name ?? "Unknown"}
            eventName={selectedEvent?.name ?? "Unknown"}
            eventDuration={selectedEvent?.duration ?? null}
            onSubmit={handleSubmit}
          />
        )}
      </div>

      {submissionError && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
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
            <p className="text-sm font-medium text-red-800">{submissionError}</p>
          </div>
        </div>
      )}

      {/* Navigation Buttons - hidden on step 3 since StepReview has its own */}
      {step < 3 && (
        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleBack}
            disabled={isSubmitting}
          >
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={handleNext}
            disabled={!canProceedFromStep(step) || isSubmitting}
          >
            {step === 2 ? "Review Booking" : "Continue"}
          </Button>
        </div>
      )}
    </div>
  );
}
