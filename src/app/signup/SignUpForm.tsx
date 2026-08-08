"use client";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState, FormEvent } from "react";

interface SignUpFormProps {
  action: (formData: FormData) => void;
}

interface FieldErrors {
  full_name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function SignUpForm({ action }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function validate(form: HTMLFormElement): boolean {
    const newErrors: FieldErrors = {};
    const fullName = (form.full_name as HTMLInputElement).value.trim();
    const email = (form.email as HTMLInputElement).value.trim();
    const password = (form.password as HTMLInputElement).value;
    const confirmPassword = (form.confirmPassword as HTMLInputElement).value;

    if (!fullName) {
      newErrors.full_name = "Full name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    if (!validate(e.currentTarget)) {
      e.preventDefault();
      return;
    }
    setIsLoading(true);
  }

  return (
    <form action={action} onSubmit={handleSubmit} className="space-y-5" noValidate>
      <Input
        id="full_name"
        name="full_name"
        type="text"
        label="Full Name"
        placeholder="Juan Dela Cruz"
        required
        autoComplete="name"
        error={errors.full_name}
      />

      <Input
        id="email"
        name="email"
        type="email"
        label="Email address"
        placeholder="you@example.com"
        required
        autoComplete="email"
        error={errors.email}
        hint="We'll send a confirmation link to this address."
      />

      <Input
        id="contact_number"
        name="contact_number"
        type="tel"
        label="Contact Number"
        placeholder="09123456789"
        autoComplete="tel"
      />

      <div className="w-full">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-foreground mb-1.5"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className="w-full rounded-lg border border-border px-3.5 py-2.5 pr-10 text-sm transition-colors duration-200 placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-primary-light/40 focus:border-primary-light"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-light hover:text-muted transition-colors cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-controls="password"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              {showPassword ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              ) : (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </>
              )}
            </svg>
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-destructive">{errors.password}</p>
        )}
      </div>

      <div className="w-full">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-foreground mb-1.5"
        >
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            required
            autoComplete="new-password"
            placeholder="Re-enter your password"
            className="w-full rounded-lg border border-border px-3.5 py-2.5 pr-10 text-sm transition-colors duration-200 placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-primary-light/40 focus:border-primary-light"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-light hover:text-muted transition-colors cursor-pointer"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            aria-controls="confirmPassword"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              {showConfirmPassword ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              ) : (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </>
              )}
            </svg>
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-xs text-destructive">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={isLoading}
        disabled={isLoading}
      >
        Create Account
      </Button>
    </form>
  );
}
