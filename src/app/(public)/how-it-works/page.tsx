import type { Metadata } from "next";
import Link from "next/link";
import { PublicHero } from "@/components/layout/PublicHero";

export const metadata: Metadata = {
  title: "How It Works - Help Is on the Way",
  description:
    "Learn about our step-by-step process for booking free mental healthcare sessions. From creating your account to attending your appointment.",
};

const steps = [
  {
    step: 1,
    title: "Create Account",
    description:
      "Sign up on our platform by providing your basic information. Complete your profile so we can best match you with appropriate care.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
  {
    step: 2,
    title: "Choose Category",
    description:
      "Select the type of mental health service you need. We offer various categories to address different aspects of mental wellbeing.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
      </svg>
    ),
  },
  {
    step: 3,
    title: "Select Event",
    description:
      "Choose from available events and sessions that match your selected category. Each event provides details about what to expect.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
  },
  {
    step: 4,
    title: "Review & Submit",
    description:
      "Review your category and service selection, then submit your request. There's no need to pick a date and time — our team will arrange the schedule for you.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    step: 5,
    title: "Submit Request",
    description:
      "Submit your booking request. You will receive a confirmation that your request has been received and is being reviewed.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
      </svg>
    ),
  },
  {
    step: 6,
    title: "Receive Your Schedule",
    description:
      "Within 24-48 hours, we'll email you a proposed schedule. Review it and confirm, and your appointment will be locked in.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    step: 7,
    title: "Attend Appointment",
    description:
      "Once confirmed, attend your appointment at the scheduled time. Your mental health journey begins here.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <>
      {/* Hero */}
      <PublicHero
        eyebrow="Step-by-Step Guide"
        title="How It Works"
        subtitle="A simple, step-by-step process to access free mental healthcare. From sign-up to your first appointment, we guide you every step of the way."
      />

      {/* Steps */}
      <section className="relative bg-surface py-20 sm:py-28">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div className="container-page relative">
          <div className="mx-auto max-w-2xl text-center animate-fade-up">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              The Process
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
              Your journey in seven simple steps
            </h2>
            <p className="mt-4 text-lg text-muted">
              Every step is designed to be clear, guided, and stress-free so you
              can focus on your wellbeing.
            </p>
          </div>

          <div className="relative mx-auto mt-16 max-w-5xl">
            {/* Central connecting line (desktop) */}
            <div
              className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-primary-100 lg:block"
              aria-hidden="true"
            />
            {/* Vertical connecting line (mobile) */}
            <div
              className="absolute left-7 top-0 h-full w-0.5 bg-primary-100 lg:hidden"
              aria-hidden="true"
            />

            <div className="space-y-12 lg:space-y-0">
              {steps.map(({ step, title, description, icon }, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div
                    key={step}
                    className="relative lg:grid lg:grid-cols-2 lg:gap-20 lg:py-6"
                  >
                    {/* Numbered badge */}
                    <div className="absolute left-7 top-0 z-10 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-lg font-bold text-white shadow-md ring-4 ring-surface lg:left-1/2 lg:top-8">
                      {step}
                    </div>

                    {/* Card */}
                    <div
                      className={`pl-20 lg:pl-0 ${
                        isLeft ? "lg:col-start-1" : "lg:col-start-2"
                      }`}
                    >
                      <div
                        className="rounded-2xl border border-border bg-card p-6 card-elevation card-hover animate-fade-up"
                        style={{ animationDelay: `${index * 60}ms` }}
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary">
                          {icon}
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-foreground">
                          {title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
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
            Ready to begin?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Create your account and start your journey toward better mental
            health — completely free.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary shadow-lg transition-all duration-200 hover:bg-primary-50"
            >
              Create Account
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
