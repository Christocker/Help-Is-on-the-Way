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
        "flex justify-center py-6 transition-opacity duration-300",
        className
      )}
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-50 px-4 py-2 text-sm font-medium text-primary shadow-sm animate-fade-up">
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
