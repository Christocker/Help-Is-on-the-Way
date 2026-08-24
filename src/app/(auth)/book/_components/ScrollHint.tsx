"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollHintProps {
  visible: boolean;
  className?: string;
}

export function ScrollHint({ visible, className }: ScrollHintProps) {
  const [dismissed, setDismissed] = useState(false);

  // Auto-hide after 5 seconds
  useEffect(() => {
    if (!visible) {
      setDismissed(false);
      return;
    }
    const timer = setTimeout(() => setDismissed(true), 5000);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible || dismissed) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 flex justify-center pb-safe sm:hidden",
        className
      )}
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2.5 text-sm font-medium text-primary shadow-lg shadow-black/10 transition-all duration-500 animate-fade-up">
        <span className="animate-bounce">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
            />
          </svg>
        </span>
        <span>Scroll down to continue</span>
      </div>
    </div>
  );
}
