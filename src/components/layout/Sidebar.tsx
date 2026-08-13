"use client";

import { cn, getInitials } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { signOut } from "@/app/auth/actions";
import { SupportSection } from "@/components/layout/SupportSection";
import { Logo } from "@/components/layout/Logo";

interface SidebarProps {
  user: {
    full_name: string;
    email: string;
  };
  unreadNotifications?: number;
  isAdmin?: boolean;
}

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    label: "Appointments",
    href: "/appointments",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
  },
  {
    label: "Book a Session",
    href: "/book",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    label: "Instructions",
    href: "/instructions",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
      </svg>
    ),
  },
  {
    label: "Profile",
    href: "/profile",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </svg>
    ),
  },
];

export function Sidebar({ user, unreadNotifications = 0, isAdmin = false }: SidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const sidebarContent = (
    <div className="flex h-full flex-col bg-navy">
      <div className="flex h-14 items-center gap-3 border-b border-white/10 px-4">
        <Logo imgClassName="h-10 w-10" showText={false} />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-white leading-tight">
            Help Is on the Way
          </span>
          <span className="text-[10px] font-medium text-primary-light uppercase tracking-wider">
            Client Portal
          </span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-primary-light hover:bg-white/10 hover:text-white transition-colors lg:hidden cursor-pointer"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary-700 text-white"
                      : "text-primary-light hover:bg-white/10 hover:text-white"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.label === "Notifications" && unreadNotifications > 0 && (
                    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold leading-none">
                      {unreadNotifications > 99 ? "99+" : unreadNotifications}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-3 space-y-3">
        <SupportSection />

        {isAdmin && (
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-primary-light hover:bg-white/10 hover:text-white transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
            Switch to Admin Panel
          </Link>
        )}

        <div className="flex items-center gap-3 px-3 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-700 text-sm font-medium text-white">
            {getInitials(user.full_name)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-white">{user.full_name}</p>
            <p className="truncate text-xs text-primary-light">{user.email}</p>
          </div>
        </div>

        <form action={signOut}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-primary-light hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile header bar with hamburger */}
      <header className="flex h-14 items-center gap-3 border-b border-border bg-navy px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-primary-light hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <Logo imgClassName="h-8 w-8" showText={false} />
        <span className="text-sm font-semibold text-white leading-tight">
          Help Is on the Way
        </span>
        <span className="text-[10px] font-medium text-primary-light uppercase tracking-wider">
          Client
        </span>
      </header>

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 lg:block">
        {sidebarContent}
      </aside>

      {/* Mobile drawer overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-y-0 left-0 w-72 max-w-[85%] shadow-2xl transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {sidebarContent}
        </div>
      </div>
    </>
  );
}
