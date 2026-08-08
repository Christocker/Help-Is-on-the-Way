import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

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
            <Logo
              imgClassName="h-10 w-10"
              subtitle="Mental Healthcare Access"
            />
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
