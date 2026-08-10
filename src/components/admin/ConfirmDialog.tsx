"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: React.ReactNode;
  confirmLabel?: string;
  confirmVariant?: "primary" | "destructive";
  requireText?: string;
  placeholder?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  confirmVariant = "destructive",
  requireText,
  placeholder = "",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const [typed, setTyped] = useState("");

  // Reset the typed confirmation text every time the dialog opens.
  useEffect(() => {
    if (open) setTyped("");
  }, [open]);

  if (!open) return null;

  const requiresText = Boolean(requireText);
  const canConfirm =
    !requiresText ||
    typed.trim().toLowerCase() === (requireText ?? "").trim().toLowerCase();

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl card-elevation-lg fade-in">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-destructive-light">
            <svg className="h-6 w-6 text-destructive" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground">{title}</h2>
            <div className="mt-1 text-sm leading-relaxed text-muted">
              {description}
            </div>
          </div>
        </div>

        {requiresText && (
          <div className="mt-5">
            <label
              htmlFor="confirm-typing"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              Type{" "}
              <span className="font-mono font-semibold text-primary">
                {requireText}
              </span>{" "}
              to confirm
            </label>
            <input
              id="confirm-typing"
              type="text"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              placeholder={placeholder || requireText}
              autoFocus
              className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm transition-colors duration-200 placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-primary-light/40 focus:border-primary-light"
            />
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setTyped("");
              onCancel();
            }}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant={confirmVariant}
            onClick={onConfirm}
            disabled={!canConfirm || loading}
            isLoading={loading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
