import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

// Normalizes common Philippine phone formats to a consistent +63 form.
// Accepts: 09171234567, 9171234567, +639171234567, +63 917 123 4567, etc.
export function normalizePhoneNumber(input: string): string {
  if (!input) return "";
  const digits = input.replace(/\D/g, "");
  if (digits.length === 10 && digits.startsWith("9")) {
    return `+63${digits}`;
  }
  if (digits.length === 11 && digits.startsWith("0")) {
    return `+63${digits.slice(1)}`;
  }
  if (digits.length === 12 && digits.startsWith("63")) {
    return `+63${digits.slice(2)}`;
  }
  if (digits.length === 13 && digits.startsWith("63")) {
    return `+63${digits.slice(2)}`;
  }
  return input.trim();
}

export function isValidPhilippineMobile(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return (
    (digits.length === 10 && digits.startsWith("9")) ||
    (digits.length === 11 && digits.startsWith("0")) ||
    (digits.length === 12 && digits.startsWith("63")) ||
    (digits.length === 13 && digits.startsWith("63"))
  );
}

// Title-cases a name: every word gets a capitalized first letter.
// e.g. "jUAN dELA CRUZ" -> "Juan Dela Cruz"
export function capitalizeName(input: string): string {
  return input
    .trim()
    .split(/\s+/)
    .map((word) => {
      if (!word) return word;
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

// Uppercases an entire name (ALL CAPS), preserving single spaces between words.
// Does NOT trim: while typing, the trailing space after a word is preserved.
// e.g. "chris bern dela salle " -> "CHRIS BERN DELA SALLE "
export function uppercaseName(input: string): string {
  return input.replace(/ +/g, " ").toUpperCase();
}
