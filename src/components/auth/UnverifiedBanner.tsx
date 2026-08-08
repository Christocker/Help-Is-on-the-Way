import { ResendVerification } from "@/components/auth/ResendVerification";

interface UnverifiedBannerProps {
  email: string;
  message: string;
  detail?: string;
}

export function UnverifiedBanner({
  email,
  message,
  detail,
}: UnverifiedBannerProps) {
  return (
    <div className="mb-6 rounded-2xl border border-orange-200 bg-orange-50 p-5 fade-in">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100">
          <svg className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-semibold text-orange-800">{message}</h2>
          {detail && (
            <p className="mt-1 text-sm text-orange-700/80">{detail}</p>
          )}
          <div className="mt-4 max-w-sm">
            <ResendVerification email={email} />
          </div>
        </div>
      </div>
    </div>
  );
}
