import { cn } from "@/lib/utils";
import { forwardRef, useId } from "react";

interface PhoneInputProps {
  id?: string;
  name?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      id,
      name,
      label,
      value,
      onChange,
      hint,
      error,
      required,
      autoComplete,
      className,
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    // Extract the local digits after the fixed +63 prefix.
    const digits = value.replace(/\D/g, "");
    const local = digits.startsWith("63") ? digits.slice(2) : digits;
    const localValue = local.slice(0, 10);

    function handleChange(raw: string) {
      const next = raw.replace(/\D/g, "").slice(0, 10);
      onChange(`+63${next}`);
    }

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            {label}
            {required && <span className="text-destructive"> *</span>}
          </label>
        )}
        <div
          className={cn(
            "flex items-stretch overflow-hidden rounded-lg border bg-white transition-colors duration-200",
            "focus-within:ring-2 focus-within:ring-primary-light/40 focus-within:border-primary-light",
            error
              ? "border-red-300"
              : "border-border"
          )}
        >
          <span
            className="flex items-center border-r border-border bg-surface px-3.5 text-sm font-semibold text-muted select-none"
            aria-hidden="true"
          >
            +63
          </span>
          <input
            ref={ref}
            id={inputId}
            name={name}
            type="tel"
            inputMode="numeric"
            value={localValue}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="917 123 4567"
            autoComplete={autoComplete ?? "tel-national"}
            aria-label={label ? `${label} (without country code)` : "Phone number"}
            className={cn(
              "w-full min-w-0 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-light",
              "focus:outline-none",
              className
            )}
          />
        </div>
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-1 text-xs text-muted">
            {hint}
          </p>
        )}
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-xs text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
