"use client";

import { getEventsByCategory, getCategoryById } from "@/lib/data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface StepEventProps {
  categoryId: string;
  selectedEventId: string | null;
  onSelect: (eventId: string) => void;
}

export function StepEvent({ categoryId, selectedEventId, onSelect }: StepEventProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const category = getCategoryById(categoryId);
  const events = getEventsByCategory(categoryId).filter((e) => e.is_active);

  const handleImageError = (eventId: string) => {
    setImageErrors((prev) => new Set(prev).add(eventId));
  };

  const formatDuration = (minutes: number): string => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remaining = minutes % 60;
      return remaining > 0 ? `${hours}h ${remaining}m` : `${hours}h`;
    }
    return `${minutes}m`;
  };

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 rounded-full bg-muted p-4">
          <svg
            className="h-8 w-8 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground">No events available</h3>
        <p className="mt-1 text-sm text-muted">
          There are no services available for this category.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        {category && (
          <span className="mb-2 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
            {category.name}
          </span>
        )}
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Select a Service
        </h2>
        <p className="mt-1 text-sm text-muted">
          Choose the specific service you would like to book.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {events.map((event) => {
          const isSelected = selectedEventId === event.id;
          const hasImageError = imageErrors.has(event.id);

          return (
            <Card
              key={event.id}
              hover
              className={cn(
                "flex cursor-pointer flex-col overflow-hidden transition-all duration-200",
                isSelected && "ring-2 ring-primary ring-offset-2"
              )}
              padding="none"
              onClick={() => onSelect(event.id)}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(event.id);
                }
              }}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-primary-50">
                {event.image_url && !hasImageError ? (
                  <Image
                    src={event.image_url}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={() => handleImageError(event.id)}
                    sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
                    <svg
                      className="h-12 w-12 text-primary/40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                      />
                    </svg>
                  </div>
                )}
                {isSelected && (
                  <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-lg">
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
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-semibold leading-snug text-foreground">
                  {event.name}
                </h3>
                {event.duration && (
                  <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary-50 border border-primary-100 px-3 py-1 text-sm font-semibold text-primary-700">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {formatDuration(event.duration)}
                  </span>
                )}
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {event.description}
                </p>
                <div className="mt-4">
                  <Button
                    variant={isSelected ? "primary" : "outline"}
                    size="sm"
                    className="w-full"
                    tabIndex={-1}
                  >
                    {isSelected ? "Selected" : "Select"}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
