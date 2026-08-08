interface BadgeProps {
  variant?: "default" | "success" | "warning" | "error" | "info";
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export function Badge({
  variant = "default",
  children,
  className = "",
  dot = false,
}: BadgeProps) {
  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-orange-100 text-orange-800 border-orange-200",
    error: "bg-red-100 text-red-800 border-red-200",
    info: "bg-violet-100 text-violet-800 border-violet-200",
  };

  const dots = {
    default: "bg-gray-500",
    success: "bg-green-500",
    warning: "bg-orange-500",
    error: "bg-red-500",
    info: "bg-violet-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${dots[variant]}`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
