"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface NavbarProps {
  unreadCount: number;
}

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/appointments", label: "Appointments" },
  { href: "/profile", label: "Profile" },
  { href: "/instructions", label: "Instructions" },
];

export function Navbar({ unreadCount }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="container-page flex items-center justify-between h-16">
        <Link
          href="/dashboard"
          className="text-lg font-bold text-primary tracking-tight"
        >
          Help Is on the Way
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                pathname.startsWith(link.href)
                  ? "bg-primary-50 text-primary-700"
                  : "text-muted hover:text-foreground hover:bg-surface"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/notifications"
            className={cn(
              "px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5",
              pathname.startsWith("/notifications")
                ? "bg-primary-50 text-primary-700"
                : "text-muted hover:text-foreground hover:bg-surface"
            )}
          >
            Notifications
            {unreadCount > 0 && (
              <Badge variant="error" dot>
                {unreadCount}
              </Badge>
            )}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="md:hidden flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-2 py-1.5 text-xs font-medium rounded-lg transition-colors",
                  pathname.startsWith(link.href)
                    ? "bg-primary-50 text-primary-700"
                    : "text-muted hover:text-foreground hover:bg-surface"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/notifications"
              className={cn(
                "px-2 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1",
                pathname.startsWith("/notifications")
                  ? "bg-primary-50 text-primary-700"
                  : "text-muted hover:text-foreground hover:bg-surface"
              )}
            >
              Alerts
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>
          </div>

          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="text-sm text-muted hover:text-destructive transition-colors font-medium cursor-pointer"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
