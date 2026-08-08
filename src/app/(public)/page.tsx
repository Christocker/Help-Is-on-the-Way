import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PublicHero, HeroActions } from "@/components/layout/PublicHero";
import { CATEGORIES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Help Is on the Way - Free Mental Healthcare Access",
  description:
    "Free mental healthcare access platform connecting individuals with professional mental health services. Browse services, book a session, and get confirmed support.",
};

const stats = [
  { value: "100%", label: "Free of charge" },
  { value: "6", label: "Care categories" },
  { value: "31", label: "Available services" },
  { value: "Free", label: "Confidential support" },
];

const steps = [
  {
    step: "1",
    title: "Create an Account",
    description: "Sign up and complete your profile so our team can support you.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
  {
    step: "2",
    title: "Choose a Service",
    description: "Pick a category and event that best fits your needs.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
      </svg>
    ),
  },
  {
    step: "3",
    title: "Pick Date & Time",
    description: "Choose a schedule that works for you from available slots.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
  },
  {
    step: "4",
    title: "Get Confirmed",
    description: "We coordinate with our partner provider and confirm your appointment.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
];

const benefits = [
  {
    title: "Completely Free",
    description: "You never pay for mental healthcare services through our platform. We handle everything.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
      </svg>
    ),
  },
  {
    title: "Professional Network",
    description: "We partner with licensed psychologists, psychiatrists, and counselors.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: "Simple Process",
    description: "A clear, guided booking flow with transparent communication at every step.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    ),
  },
  {
    title: "Confidential & Safe",
    description: "Your privacy is protected with secure authentication and strict access controls.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    quote:
      "I was worried about the cost of therapy. This platform connected me with the care I needed — completely free.",
    name: "Verified Client",
    role: "Psychotherapy & Counseling",
  },
  {
    quote:
      "The process was simple and reassuring. I booked in minutes and felt supported the whole way through.",
    name: "Verified Client",
    role: "Psychological Assessment",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <PublicHero
        eyebrow="Free Mental Healthcare Access"
        title="Help Is on the Way"
        subtitle="You deserve professional mental health care, no matter your financial situation. We coordinate with licensed providers so you can focus on what matters — your wellbeing."
      >
        <HeroActions />
        <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/15 bg-white/10 px-4 py-4 text-center backdrop-blur-sm"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-2xl font-bold text-white">{stat.value}</dd>
              <dd className="mt-0.5 text-xs text-white/70">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </PublicHero>

      {/* Services / Categories */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              Our Services
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
              Professional mental health care, without the cost
            </h2>
            <p className="mt-4 text-lg text-muted">
              Browse our care categories. Each one is coordinated with licensed
              mental health professionals on your behalf.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((category, index) => (
              <Link
                key={category.id}
                href="/signup"
                className="group relative overflow-hidden rounded-2xl border border-border bg-card card-elevation card-hover"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={category.image_url ?? "/images/categories/category-6.jpg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary-800 backdrop-blur-sm">
                    Category {category.sort_order}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                    {category.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                    {category.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Learn more
                    <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative bg-surface py-20 sm:py-28">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div className="container-page relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              How It Works
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
              Getting started is simple
            </h2>
            <p className="mt-4 text-lg text-muted">
              From sign-up to your first appointment, we guide you every step of
              the way.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ step, title, description, icon }) => (
              <div
                key={step}
                className="relative flex flex-col rounded-2xl border border-border bg-card p-6 card-elevation card-hover"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary">
                    {icon}
                  </span>
                  <span className="text-4xl font-bold text-surface">{step}</span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-700"
            >
              See the full step-by-step guide
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                Why Choose Us
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
                We make mental healthcare accessible to everyone
              </h2>
              <p className="mt-4 text-lg text-muted">
                Our platform removes the financial barrier between you and the
                care you deserve.
              </p>
              <div className="mt-8 space-y-6">
                {benefits.map(({ title, description, icon }) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent">
                      {icon}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-primary-50 via-transparent to-accent-50" aria-hidden="true" />
              <div className="relative space-y-4">
                {testimonials.map((t) => (
                  <figure
                    key={t.quote}
                    className="rounded-2xl border border-border bg-card p-6 card-elevation-lg"
                  >
                    <svg className="h-8 w-8 text-primary-100" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                    </svg>
                    <blockquote className="mt-4 text-base leading-relaxed text-foreground">
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-4 text-sm font-semibold text-foreground">
                      {t.name}
                      <span className="mt-0.5 block text-xs font-normal text-muted">
                        {t.role}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                Common Questions
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
                Frequently asked questions
              </h2>
            </div>
            <div className="mt-12 space-y-4">
              {[
                {
                  q: "Is this really free?",
                  a: "Yes. You do not pay for mental healthcare services through Help Is on the Way. We coordinate with our partner provider on your behalf.",
                },
                {
                  q: "Who provides the mental health services?",
                  a: "We coordinate with Argao Psych, our partner mental healthcare provider staffed by licensed professionals. We handle the scheduling; they provide the care.",
                },
                {
                  q: "How long until I hear back after booking?",
                  a: "Our team typically responds within 1-3 business days to confirm your appointment.",
                },
              ].map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-border bg-card card-elevation"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-medium text-foreground select-none">
                    {item.q}
                    <svg className="h-5 w-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </summary>
                  <p className="px-6 pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
                </details>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-700"
              >
                View all FAQs
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary to-primary-700 py-20 text-white">
        <div className="absolute inset-0 bg-dots opacity-30" aria-hidden="true" />
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-accent-light/20 blur-3xl" aria-hidden="true" />
        <div className="container-page relative text-center">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Ready to take the first step?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Your mental health matters. Start your journey toward wellbeing today —
            completely free.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary shadow-lg transition-all duration-200 hover:bg-primary-50"
            >
              Book a Session
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
