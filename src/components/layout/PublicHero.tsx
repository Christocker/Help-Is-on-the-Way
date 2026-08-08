import Link from "next/link";
import { cn } from "@/lib/utils";

interface PublicHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  compact?: boolean;
}

export function PublicHero({
  eyebrow,
  title,
  subtitle,
  children,
  className,
  compact = false,
}: PublicHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-navy via-primary-900 to-primary-700 text-white",
        compact ? "py-16 sm:py-20" : "py-24 sm:py-32",
        className
      )}
    >
      <div className="absolute inset-0 bg-dots opacity-40" aria-hidden="true" />
      <div
        className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent-light/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-primary-light/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && (
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
              {eyebrow}
            </p>
          )}
          <h1
            className={cn(
              "mt-6 font-bold tracking-tight text-balance",
              compact ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl lg:text-6xl"
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function HeroActions() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Link
        href="/signup"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary shadow-lg transition-all duration-200 hover:bg-primary-50"
      >
        Book a Session
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </Link>
      <Link
        href="/how-it-works"
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
      >
        How It Works
      </Link>
    </div>
  );
}
