interface AuthShellProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  compact?: boolean;
}

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
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-700 text-white shadow-md">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </span>
            <span className="text-lg font-bold text-navy">Help Is on the Way</span>
          </div>
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
