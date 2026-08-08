import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full rounded-lg border px-3.5 py-2.5 text-sm transition-colors duration-200",
            "placeholder:text-muted-light",
            "focus:outline-none focus:ring-2 focus:ring-primary-light/40 focus:border-primary-light",
            error
              ? "border-red-300 focus:ring-red-300/40 focus:border-red-400"
              : "border-border",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={
            error ? `${id}-error` : hint ? `${id}-hint` : undefined
          }
          {...props}
        />
        {hint && !error && (
          <p id={`${id}-hint`} className="mt-1 text-xs text-muted">
            {hint}
          </p>
        )}
        {error && (
          <p id={`${id}-error`} className="mt-1 text-xs text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
export type { InputProps };
