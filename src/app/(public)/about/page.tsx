import type { Metadata } from "next";
import Link from "next/link";
import { PublicHero } from "@/components/layout/PublicHero";

export const metadata: Metadata = {
  title: "About - Help Is on the Way",
  description:
    "Learn about Help Is on the Way, our mission to provide free mental healthcare access, and how we coordinate with professional providers.",
};

const values = [
  {
    title: "Accessibility",
    description:
      "Every service we coordinate is completely free, removing the financial barrier between you and the care you deserve.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
      </svg>
    ),
  },
  {
    title: "Compassion",
    description:
      "We meet every person with empathy and understanding, treating your wellbeing with the care it deserves.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    title: "Confidentiality",
    description:
      "Your privacy is protected. Your personal and health information is handled with the utmost care and only shared as needed for your care.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    title: "Partnership",
    description:
      "We work hand-in-hand with licensed providers like Argao Psych to deliver coordinated, professional mental healthcare.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <PublicHero
        eyebrow="About Us"
        title="Connecting people with the care they deserve"
        subtitle="We connect individuals with free mental healthcare through trusted professional partnerships — because wellbeing should never depend on your financial situation."
      />

      {/* Mission */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-up">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                Our Mission
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
                We bridge the gap between people and the care they deserve
              </h2>
              <p className="mt-4 text-lg text-muted">
                Help Is on the Way exists to bridge the gap between individuals
                seeking mental health support and the professional care they
                need. We believe that mental healthcare should be accessible to
                everyone, regardless of their financial situation.
              </p>
              <p className="mt-4 text-lg text-muted">
                Our platform coordinates with licensed mental healthcare
                providers to schedule appointments at no cost to you. We handle
                the logistics so you can focus on your wellbeing.
              </p>
            </div>

            <div
              className="relative animate-fade-up"
              style={{ animationDelay: "150ms" }}
            >
              <div
                className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-primary-50 via-transparent to-accent-50"
                aria-hidden="true"
              />
              <div className="relative rounded-2xl border border-border bg-card p-6 sm:p-8 card-elevation-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </div>
                <blockquote className="mt-6 text-xl font-semibold leading-relaxed text-foreground">
                  &ldquo;No one should have to choose between their financial
                  stability and their mental health.&rdquo;
                </blockquote>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  That is why every service we coordinate is completely free —
                  no strings, no cost, no judgment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Are Different */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center animate-fade-up">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              How We Are Different
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
              A coordination platform, not a direct-care provider
            </h2>
            <p className="mt-4 text-lg text-muted">
              Help Is on the Way does not employ therapists or counselors.
              Instead, we serve as a coordination platform that connects you
              with our partner mental healthcare provider, Argao Psych.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 card-elevation card-hover animate-fade-up">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                We Coordinate
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                We match your needs with available professionals and handle the
                scheduling, so you do not have to navigate complex healthcare
                systems alone.
              </p>
            </div>
            <div
              className="rounded-2xl border border-border bg-card p-6 sm:p-8 card-elevation card-hover animate-fade-up"
              style={{ animationDelay: "150ms" }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                They Provide Care
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Our partner providers are licensed professionals who deliver the
                actual mental healthcare services. We coordinate; they care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center animate-fade-up">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Our Values
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
              What guides everything we do
            </h2>
            <p className="mt-4 text-lg text-muted">
              These principles shape how we serve our community, protect your
              privacy, and deliver care.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ title, description, icon }, index) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card p-6 card-elevation card-hover animate-fade-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary">
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
      </section>

      {/* Partnership */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-up">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                Our Partnership
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
                Proudly partnering with Argao Psych
              </h2>
              <p className="mt-4 text-lg text-muted">
                We are proud to partner with Argao Psych, a trusted mental
                healthcare provider staffed by licensed psychologists and
                counselors. Through this partnership, we are able to offer free
                mental healthcare services to our community.
              </p>
              <p className="mt-4 text-lg text-muted">
                Our team works closely with Argao Psych to ensure a smooth
                referral and scheduling process. From the moment you submit a
                booking request to the completion of your appointment, we are
                here to support you every step of the way.
              </p>
            </div>

            <div
              className="animate-fade-up"
              style={{ animationDelay: "150ms" }}
            >
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 card-elevation-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Partner Provider
                    </p>
                    <p className="text-sm text-muted">Argao Psych</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-muted">
                  <li className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Licensed psychologists &amp; counselors
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Free, coordinated care through our platform
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Guided from booking to appointment
                  </li>
                </ul>
              </div>
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
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Create your account and book your first session today — completely
            free.
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
