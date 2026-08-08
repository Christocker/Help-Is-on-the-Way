"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ProgressIndicator } from "./_components/ProgressIndicator";
import { StepCategory } from "./_components/StepCategory";
import { StepEvent } from "./_components/StepEvent";
import { StepDateTime } from "./_components/StepDateTime";
import { StepReview } from "./_components/StepReview";
import { Button } from "@/components/ui/Button";
import { BookingData } from "@/lib/types";

type BookingState = {
  category_id: string | null;
  event_id: string | null;
  requested_date: string | null;
  requested_time: string | null;
  client_notes: string | null;
};

const INITIAL_STATE: BookingState = {
  category_id: null,
  event_id: null,
  requested_date: null,
  requested_time: null,
  client_notes: null,
};

export default function BookPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<BookingState>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const completedSteps = (() => {
    const completed: number[] = [];
    if (step > 1) completed.push(1);
    if (step > 2) completed.push(2);
    if (step > 3) completed.push(3);
    return completed;
  })();

  const handleSelectCategory = useCallback(
    (categoryId: string) => {
      setBooking((prev) => ({
        ...INITIAL_STATE,
        category_id: categoryId,
      }));
    },
    []
  );

  const handleSelectEvent = useCallback((eventId: string) => {
    setBooking((prev) => ({
      ...prev,
      event_id: eventId,
      requested_date: null,
      requested_time: null,
    }));
  }, []);

  const handleSelectDate = useCallback((date: string) => {
    setBooking((prev) => ({
      ...prev,
      requested_date: date,
      requested_time: null,
    }));
  }, []);

  const handleSelectTime = useCallback((time: string) => {
    setBooking((prev) => ({
      ...prev,
      requested_time: time,
    }));
  }, []);

  const canProceedFromStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return booking.category_id !== null;
      case 2:
        return booking.event_id !== null;
      case 3:
        return booking.requested_date !== null && booking.requested_time !== null;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!canProceedFromStep(step)) return;
    if (step < 4) {
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
    if (
      !booking.category_id ||
      !booking.event_id ||
      !booking.requested_date ||
      !booking.requested_time
    ) {
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
        requested_date: booking.requested_date,
        requested_time: booking.requested_time,
        client_notes: booking.client_notes ?? undefined,
      };

      const { data: appointment, error: appointmentError } = await supabase
        .from("appointments")
        .insert({
          client_id: user.id,
          category_id: bookingData.category_id,
          event_id: bookingData.event_id,
          requested_date: bookingData.requested_date,
          requested_time: bookingData.requested_time,
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
            "Your appointment request has been submitted. Our team will coordinate with our partner mental healthcare provider.",
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
            Our team will review your request and coordinate with our partner mental
            healthcare provider. You will receive a notification once your appointment is
            confirmed.
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

  return (
    <div className="mx-auto max-w-4xl">
      <ProgressIndicator currentStep={step} completedSteps={completedSteps} />

      <div className="mt-8">
        {step === 1 && (
          <StepCategory
            selectedCategoryId={booking.category_id}
            onSelect={handleSelectCategory}
          />
        )}

        {step === 2 && booking.category_id && (
          <StepEvent
            categoryId={booking.category_id}
            selectedEventId={booking.event_id}
            onSelect={handleSelectEvent}
          />
        )}

        {step === 3 && (
          <StepDateTime
            selectedDate={booking.requested_date}
            selectedTime={booking.requested_time}
            onSelectDate={handleSelectDate}
            onSelectTime={handleSelectTime}
          />
        )}

        {step === 4 &&
          booking.category_id &&
          booking.event_id &&
          booking.requested_date &&
          booking.requested_time && (
            <StepReview
              categoryId={booking.category_id}
              eventId={booking.event_id}
              requestedDate={booking.requested_date}
              requestedTime={booking.requested_time}
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

      {/* Navigation Buttons - hidden on step 4 since StepReview has its own */}
      {step < 4 && (
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
            {step === 3 ? "Review Booking" : "Continue"}
          </Button>
        </div>
      )}
    </div>
  );
}
