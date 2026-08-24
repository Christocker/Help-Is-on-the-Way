"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface AdminPhotoUploaderProps {
  imageUrl: string | null;
  onUpload: (file: File) => Promise<{ ok: boolean; error?: string }>;
  onDelete: () => Promise<{ ok: boolean; error?: string }>;
  alt: string;
  size?: "sm" | "md" | "lg";
}

export function AdminPhotoUploader({
  imageUrl,
  onUpload,
  onDelete,
  alt,
  size = "md",
}: AdminPhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  // Tracks the last upload/deletion timestamp to bust next/image's cache.
  const [cacheBust, setCacheBust] = useState(0);

  const sizeClass = {
    sm: "h-24 w-32",
    md: "h-28 w-40",
    lg: "h-40 w-56",
  }[size];

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMessage(null);
    const result = await onUpload(file);
    setUploading(false);
    if (result.ok) {
      setCacheBust(Date.now());
      setMessage({ type: "success", text: "Photo updated." });
    } else {
      setMessage({
        type: "error",
        text: result.error ?? "Could not upload photo.",
      });
    }
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleDelete() {
    setDeleting(true);
    setMessage(null);
    const result = await onDelete();
    setDeleting(false);
    if (result.ok) {
      setCacheBust(Date.now());
      setMessage({ type: "success", text: "Photo removed." });
    } else {
      setMessage({
        type: "error",
        text: result.error ?? "Could not delete photo.",
      });
    }
  }

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border border-border bg-surface",
          sizeClass
        )}
      >
        {imageUrl ? (
          <Image
            src={`${imageUrl}${imageUrl.includes("?") ? "&" : "?"}t=${cacheBust}`}
            alt={alt}
            fill
            className="object-cover"
            sizes="160px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg className="h-8 w-8 text-muted-light" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          isLoading={uploading}
          disabled={deleting}
        >
          Upload
        </Button>
        {imageUrl && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            isLoading={deleting}
            disabled={uploading}
          >
            Delete
          </Button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {message && (
        <p
          className={cn(
            "text-xs",
            message.type === "success" ? "text-accent" : "text-destructive"
          )}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
