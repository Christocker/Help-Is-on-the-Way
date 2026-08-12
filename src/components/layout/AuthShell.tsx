interface AuthShellProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  compact?: boolean;
}

import { Logo } from "@/components/layout/Logo";

export function AuthShell({
  title,
  subtitle,
  icon,
  children,
  footer,
}: AuthShellProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-navy via-primary-900 to-primary-700 px-4 py-10">
      <div className="absolute inset-0 bg-dots opacity-40" aria-hidden="true" />
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent-light/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-primary-light/20 blur-3xl" aria-hidden="true" />

      <div className="relative w-full max-w-md rounded-2xl bg-card p-6 sm:p-8 fade-in card-elevation-lg">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo
            imgClassName="h-16 w-16"
            textClassName="text-navy"
            subtitle="Mental Healthcare Access"
          />
          <div className="mt-4 flex items-center gap-2">
            {icon}
            <h1 className="text-left text-2xl font-bold text-foreground">{title}</h1>
          </div>
          {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
        </div>

        {children}
        {footer && (
          <div className="mt-6 border-t border-border pt-5">{footer}</div>
        )}
      </div>
    </main>
  );
}
