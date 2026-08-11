import type { Metadata } from "next";
import Link from "next/link";
import { PublicHero } from "@/components/layout/PublicHero";

export const metadata: Metadata = {
  title: "Resources - Help Is on the Way",
  description:
    "Mental health resources, crisis hotlines, and self-help tools. Find legitimate mental health organizations and support services.",
};

const hotlines = [
  {
    name: "NCMH Crisis Hotline",
    phone1: "skbarangay176c@gmail.com",
    phone1Href: "mailto:skbarangay176c@gmail.com",
    phone2: "https://www.facebook.com/SKCouncil176C",
    phone2Href: "https://www.facebook.com/SKCouncil176C",
    description: "National Center for Mental Health 24/7 crisis support hotline.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
  },
  {
    name: "Emergency Services",
    phone1: "911",
    phone1Href: "tel:911",
    phone2: "",
    phone2Href: "",
    description:
      "For immediate danger or life-threatening emergencies, call 911 or go to the nearest hospital emergency room.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    ),
  },
];

const organizations = [
  {
    name: "National Center for Mental Health (NCMH)",
    url: "https://ncmh.gov.ph",
    description:
      "The Philippines' national specialty center for mental health care, providing comprehensive mental health services.",
    chip: "bg-primary-50 text-primary",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
      </svg>
    ),
  },
  {
    name: "Argao Psych",
    url: "https://argaopsych.com",
    description:
      "Our partner mental healthcare provider, offering professional psychological and counseling services.",
    chip: "bg-accent-50 text-accent",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    name: "Philippine Mental Health Association (PMHA)",
    url: "https://pmha.org.ph",
    description:
      "A non-government organization committed to promoting mental health and wellness in the Philippines.",
    chip: "bg-primary-50 text-primary",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    name: "World Health Organization - Mental Health",
    url: "https://www.who.int/health-topics/mental-health",
    description:
      "WHO resources and information on global mental health initiatives and best practices.",
    chip: "bg-accent-50 text-accent",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

const selfHelp = [
  {
    title: "Practice Self-Care",
    description:
      "Prioritize sleep, nutrition, physical activity, and hydration. Small daily habits build a foundation for mental wellbeing.",
    chip: "bg-primary-50 text-primary",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    title: "Stay Connected",
    description:
      "Maintain relationships with trusted friends and family. Social connection is a key protective factor for mental health.",
    chip: "bg-accent-50 text-accent",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: "Mindfulness & Relaxation",
    description:
      "Practice deep breathing, meditation, or progressive muscle relaxation. These techniques can help manage stress and anxiety.",
    chip: "bg-primary-50 text-primary",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
      </svg>
    ),
  },
  {
    title: "Set Boundaries",
    description:
      "Learn to say no when needed and protect your personal time. Healthy boundaries support mental and emotional health.",
    chip: "bg-accent-50 text-accent",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
  },
];

export default function Resources() {
  return (
    <>
      {/* Hero */}
      <PublicHero
        eyebrow="Support & Tools"
        title="Resources"
        subtitle="Mental health resources, crisis support, and self-help tools to support your wellbeing journey. Help is on the way — and help is available right now."
      />

      {/* Disclaimer */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl animate-fade-up">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
              <div className="flex flex-col items-start gap-4 sm:flex-row">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-amber-800">
                    Important Disclaimer
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-amber-700">
                    The resources and self-help information on this page are for
                    educational and informational purposes only. They are not a
                    replacement for professional mental health diagnosis,
                    treatment, or care. If you are experiencing a mental health
                    crisis, please contact a crisis hotline or emergency
                    services immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crisis Hotlines & Emergency */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl animate-fade-up">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                Crisis Support
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
                Reach out immediately
              </h2>
              <p className="mt-4 text-lg text-muted">
                If you or someone you know is in crisis, reach out to these
                services right away.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {hotlines.map(({ name, description, icon, phone1, phone1Href, phone2, phone2Href }) => (
                <div
                  key={name}
                  className="rounded-2xl border border-red-200 bg-destructive-light p-6 card-elevation"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-destructive">
                    {icon}
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-destructive">
                    {name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-red-800">
                    {description}
                  </p>
                  <div className="mt-3 space-y-0.5">
                    <p>
                      <a
                        href={phone1Href}
                        className="text-sm font-semibold text-destructive underline"
                      >
                        {phone1}
                      </a>
                    </p>
                    {phone2 && (
                      <p>
                        <a
                          href={phone2Href}
                          className="text-sm font-semibold text-destructive underline"
                        >
                          {phone2}
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
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl animate-fade-up">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                Trusted Organizations
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
                Mental health organizations
              </h2>
              <p className="mt-4 text-lg text-muted">
                Trusted organizations providing mental health information and
                services.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {organizations.map(({ name, url, description, chip, icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-border bg-card p-6 card-elevation card-hover"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${chip}`}>
                    {icon}
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                    {name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Visit website
                    <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
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
      <section className="bg-surface py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl animate-fade-up">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                Everyday Wellbeing
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
                Self-help tips
              </h2>
              <p className="mt-4 text-lg text-muted">
                Practical strategies to support your mental wellbeing in daily
                life.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {selfHelp.map(({ title, description, chip, icon }, index) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-card p-6 card-elevation card-hover"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${chip}`}>
                    {icon}
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary to-primary-700 py-20 text-white">
        <div className="absolute inset-0 bg-dots opacity-30" aria-hidden="true" />
        <div
          className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-accent-light/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-page relative text-center">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Ready to start your journey?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Book a free session through our platform and get connected with a
            professional provider.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary shadow-lg transition-all duration-200 hover:bg-primary-50"
            >
              Book a Session
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
