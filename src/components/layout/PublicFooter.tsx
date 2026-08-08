import Link from "next/link";

const FOOTER_LINKS = [
  {
    heading: "Platform",
    links: [
      { href: "/how-it-works", label: "How It Works" },
      { href: "/about", label: "About Us" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
      { href: "/resources", label: "Resources" },
    ],
  },
  {
    heading: "For Clients",
    links: [
      { href: "/login", label: "Sign In" },
      { href: "/signup", label: "Create Account" },
      { href: "/instructions", label: "Instructions" },
    ],
  },
];

export function PublicFooter() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                <svg className="h-5 w-5 text-accent-light" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold">Help Is on the Way</span>
                <span className="text-[11px] font-medium text-white/50">Mental Healthcare Access</span>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Free mental healthcare access for those who need it most. We coordinate
              with trusted professional providers so you can focus on your wellbeing.
            </p>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.heading}>
              <h3 className="text-sm font-semibold text-white">{group.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold text-white">Crisis Support</h3>
            <p className="mt-4 text-xs text-white/50 leading-relaxed">
              If you are experiencing a mental health crisis, reach out immediately.
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-light">
                NCMH Crisis Hotline
              </p>
              <p>
                <a href="tel:09178998727" className="text-white/80 transition-colors hover:text-white">
                  0917-899-8727
                </a>
              </p>
              <p>
                <a href="tel:028998727" className="text-white/80 transition-colors hover:text-white">
                  (02) 989-8727
                </a>
              </p>
            </div>
            <p className="mt-4 text-xs text-white/40 leading-relaxed">
              In an emergency, call{" "}
              <span className="font-semibold text-white/70">911</span> or go to your
              nearest hospital emergency room.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} Help Is on the Way. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/40">
            <Link href="/resources" className="transition-colors hover:text-white/70">
              Resources
            </Link>
            <Link href="/contact" className="transition-colors hover:text-white/70">
              Contact
            </Link>
            <Link href="/faq" className="transition-colors hover:text-white/70">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
