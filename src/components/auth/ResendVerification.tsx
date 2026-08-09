"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { resendVerificationEmail } from "@/app/auth/actions";
import { Button } from "@/components/ui/Button";

const COOLDOWN_SECONDS = 60;

export function ResendVerification({
  email: initialEmail = "",
}: {
  email?: string;
}) {
  const [email, setEmail] = useState(initialEmail);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");
  const [alreadyVerified, setAlreadyVerified] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  async function handleResend() {
    const trimmed = email.trim();
    if (!trimmed) {
      setStatus("error");
      setMessage("Please enter your email address first.");
      return;
    }
    setStatus("sending");
    setMessage("");
    setAlreadyVerified(false);
    const result = await resendVerificationEmail(trimmed);
    if (result.ok) {
      setStatus("sent");
      setMessage("Verification email sent! Please check your inbox and spam folder.");
      setCooldown(COOLDOWN_SECONDS);
    } else {
      setStatus("error");
      setMessage(result.error ?? "Could not resend the email. Please try again.");
      if (result.code === "already_verified") {
        setAlreadyVerified(true);
      }
      if (result.retryAfter) {
        setCooldown(Math.min(result.retryAfter, COOLDOWN_SECONDS));
      }
    }
  }

  return (
    <div className="space-y-3">
      {!initialEmail && (
        <div className="text-left">
          <label
            htmlFor="resend-email"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Email address
          </label>
          <input
            id="resend-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm transition-colors duration-200 placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-primary-light/40 focus:border-primary-light"
          />
        </div>
      )}

      <Button
        type="button"
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={status === "sending"}
        disabled={status === "sending" || cooldown > 0}
        onClick={handleResend}
      >
        {status === "sending"
          ? "Sending…"
          : cooldown > 0
            ? `Resend available in ${cooldown} seconds`
            : "Resend Verification Email"}
      </Button>

      {status === "sent" && (
        <p
          className="rounded-lg bg-accent-50 border border-accent/20 px-4 py-3 text-sm text-accent"
          role="status"
        >
          {message}
        </p>
      )}

      {status === "error" && (
        <div className="rounded-lg bg-destructive-light border border-red-200 px-4 py-3 text-sm text-destructive" role="alert">
          <p>{message}</p>
          {alreadyVerified && (
            <Link
              href="/login"
              className="mt-2 inline-block font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              Go to Sign In
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
