"use client";

import { cn } from "@/lib/utils";

const STEPS = [
  { key: "category", label: "Category" },
  { key: "event", label: "Event" },
  { key: "datetime", label: "Date & Time" },
  { key: "review", label: "Review & Confirm" },
] as const;

interface ProgressIndicatorProps {
  currentStep: number;
  completedSteps: number[];
}

export function ProgressIndicator({ currentStep, completedSteps }: ProgressIndicatorProps) {
  return (
    <nav aria-label="Booking progress" className="w-full py-6">
      <ol className="flex items-center justify-between">
        {STEPS.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = completedSteps.includes(stepNumber);
          const isCurrent = currentStep === stepNumber;
          const isFuture = stepNumber > currentStep;

          return (
            <li
              key={step.key}
              className={cn(
                "relative flex flex-1 flex-col items-center",
                index < STEPS.length - 1 &&
                  "after:absolute after:left-[calc(50%+1rem)] after:top-5 after:h-0.5 after:w-[calc(100%-2rem)] after:content-[''] sm:after:left-[calc(50%+1.25rem)] sm:after:w-[calc(100%-2.5rem)]",
                isCompleted
                  ? "after:bg-primary"
                  : isCurrent && completedSteps.includes(stepNumber - 1)
                    ? "after:bg-primary/30"
                    : "after:bg-border"
              )}
            >
              <span
                className={cn(
                  "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 sm:h-12 sm:w-12",
                  isCompleted && "bg-primary text-white",
                  isCurrent && !isCompleted && "border-2 border-primary bg-primary-50 text-primary",
                  isFuture && "border-2 border-border bg-white text-muted"
                )}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isCompleted ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  stepNumber
                )}
              </span>
              <span
                className={cn(
                  "mt-2 text-xs font-medium transition-colors duration-300 sm:text-sm",
                  isCompleted && "text-primary",
                  isCurrent && "text-primary",
                  isFuture && "text-muted"
                )}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
