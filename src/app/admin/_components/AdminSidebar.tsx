"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { signOut } from "@/app/auth/actions";
import { SupportSection } from "@/components/layout/SupportSection";
import { NavLink } from "./NavLink";
import { getInitials } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

export interface SidebarItem {
  href: string;
  label: string;
  icon: ReactNode;
}

export interface SidebarSection {
  heading: string;
  items: SidebarItem[];
}

interface AdminSidebarProps {
  sections: SidebarSection[];
  fullName: string;
  email: string;
}

export function AdminSidebar({ sections, fullName, email }: AdminSidebarProps) {
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
            Admin Panel
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

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {sections.map((section) => (
          <div key={section.heading}>
            <h3 className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-primary-light/60">
              {section.heading}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  onNavigate={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3 space-y-3">
        <SupportSection />

        <Link
          href="/dashboard"
          onClick={() => setOpen(false)}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-primary-light hover:bg-white/10 hover:text-white transition-colors"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6A2.25 2.25 0 013.75 3h16.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zM9.75 6h.008v.008H9.75V6z" />
          </svg>
          Switch to Client Portal
        </Link>

        <div className="flex items-center gap-3 px-3 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-700 text-sm font-medium text-white">
            {getInitials(fullName)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-white">{fullName}</p>
            <p className="truncate text-xs text-primary-light">{email}</p>
          </div>
        </div>

        <form action={signOut}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-primary-light hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
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
          Admin
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
