import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources - Help Is on the Way",
  description:
    "Mental health resources, crisis hotlines, and self-help tools. Find legitimate mental health organizations and support services.",
};

const hotlines = [
  {
    name: "NCMH Crisis Hotline",
    phone: "0917-899-8727",
    phoneDisplay: "0917-899-8727",
    phone2: "(02) 989-8727",
    phone2Display: "(02) 989-8727",
    description: "National Center for Mental Health 24/7 crisis support hotline.",
  },
  {
    name: "Emergency Services",
    phone: "911",
    phoneDisplay: "911",
    phone2: "",
    phone2Display: "",
    description: "For immediate danger or life-threatening emergencies.",
  },
];

const organizations = [
  {
    name: "National Center for Mental Health (NCMH)",
    url: "https://ncmh.gov.ph",
    description: "The Philippines' national specialty center for mental health care, providing comprehensive mental health services.",
  },
  {
    name: "Argao Psych",
    url: "https://argaopsych.com",
    description: "Our partner mental healthcare provider, offering professional psychological and counseling services.",
  },
  {
    name: "Philippine Mental Health Association (PMHA)",
    url: "https://pmha.org.ph",
    description: "A non-government organization committed to promoting mental health and wellness in the Philippines.",
  },
  {
    name: "World Health Organization - Mental Health",
    url: "https://www.who.int/health-topics/mental-health",
    description: "WHO resources and information on global mental health initiatives and best practices.",
  },
];

const selfHelp = [
  {
    title: "Practice Self-Care",
    description:
      "Prioritize sleep, nutrition, physical activity, and hydration. Small daily habits build a foundation for mental wellbeing.",
  },
  {
    title: "Stay Connected",
    description:
      "Maintain relationships with trusted friends and family. Social connection is a key protective factor for mental health.",
  },
  {
    title: "Mindfulness & Relaxation",
    description:
      "Practice deep breathing, meditation, or progressive muscle relaxation. These techniques can help manage stress and anxiety.",
  },
  {
    title: "Set Boundaries",
    description:
      "Learn to say no when needed and protect your personal time. Healthy boundaries support mental and emotional health.",
  },
];

export default function Resources() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-light/10 py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Resources
            </h1>
            <p className="mt-4 text-lg text-muted">
              Mental health resources, crisis support, and self-help tools to
              support your wellbeing journey.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-b border-border bg-amber-50 py-8">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-start gap-3">
              <svg className="h-6 w-6 shrink-0 text-amber-600 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
              <div>
                <h2 className="text-lg font-semibold text-amber-800">
                  Important Disclaimer
                </h2>
                <p className="mt-2 text-sm text-amber-700 leading-relaxed">
                  The resources and self-help information on this page are for
                  educational and informational purposes only. They are not a
                  replacement for professional mental health diagnosis, treatment,
                  or care. If you are experiencing a mental health crisis, please
                  contact a crisis hotline or emergency services immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crisis Hotlines */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground">
              Crisis Hotlines
            </h2>
            <p className="mt-2 text-muted">
              If you or someone you know is in crisis, reach out to these services
              immediately.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {hotlines.map(({ name, phone, phoneDisplay, phone2, phone2Display, description }) => (
                <div
                  key={name}
                  className="rounded-xl border border-red-200 bg-destructive-light p-6"
                >
                  <h3 className="font-semibold text-destructive">{name}</h3>
                  <p className="mt-1 text-sm text-red-800">{description}</p>
                  <div className="mt-3 space-y-0.5">
                    <p>
                      <a
                        href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                        className="text-sm font-medium text-destructive underline"
                      >
                        {phoneDisplay}
                      </a>
                    </p>
                    {phone2 && (
                      <p>
                        <a
                          href={`tel:${phone2.replace(/[^0-9+]/g, "")}`}
                          className="text-sm font-medium text-destructive underline"
                        >
                          {phone2Display}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mental Health Organizations */}
      <section className="bg-surface py-16 sm:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground">
              Mental Health Organizations
            </h2>
            <p className="mt-2 text-muted">
              Trusted organizations providing mental health information and services.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {organizations.map(({ name, url, description }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border border-border bg-card p-6 card-elevation card-hover group"
                >
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {name}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Visit website
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Self-Help Tips */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-foreground">
              Self-Help Tips
            </h2>
            <p className="mt-2 text-muted">
              Practical strategies to support your mental wellbeing in daily life.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {selfHelp.map(({ title, description }) => (
                <div
                  key={title}
                  className="rounded-xl border border-border bg-card p-6 card-elevation"
                >
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm text-muted">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20">
        <div className="container-page text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to start your journey?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Book a free session through our platform and get connected with a
            professional provider.
          </p>
          <div className="mt-10">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 bg-white text-primary hover:bg-primary-50 shadow-sm text-base px-6 py-3 gap-2"
            >
              Book a Session
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a2744] text-white">
        <div className="container-page py-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-accent-light" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
                <span className="text-base font-semibold">Help Is on the Way</span>
              </div>
              <p className="mt-3 text-sm text-white/60">
                Free mental healthcare access for those who need it most.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">Pages</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/60">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">Support</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/60">
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/resources" className="hover:text-white transition-colors">Resources</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">Crisis Support</h3>
              <div className="mt-4 space-y-1 text-sm text-white/60">
                <p>NCMH Crisis Hotline</p>
                <p>
                  <a href="tel:09178998727" className="hover:text-white transition-colors">
                    0917-899-8727
                  </a>
                </p>
                <p>
                  <a href="tel:028998727" className="hover:text-white transition-colors">
                    (02) 989-8727
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/40">
            <p>&copy; {new Date().getFullYear()} Help Is on the Way. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
