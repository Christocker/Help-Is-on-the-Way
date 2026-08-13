"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onNavigate?: () => void;
}

export function NavLink({ href, children, icon, onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/admin" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary-700 text-white"
          : "text-primary-light hover:bg-white/10 hover:text-white"
      )}
    >
      {icon}
      {children}
    </Link>
  );
}
