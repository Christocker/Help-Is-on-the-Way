import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Help Is on the Way - Free Mental Healthcare Access",
  description:
    "Free mental healthcare access platform connecting individuals with professional mental health services. Book a session today.",
};

const steps = [
  {
    step: "1",
    title: "Create an Account",
    description: "Sign up and complete your profile",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
  {
    step: "2",
    title: "Book a Session",
    description: "Choose a category, event, and your preferred schedule",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
  },
  {
    step: "3",
    title: "Get Confirmed",
    description: "Our team coordinates with our partner provider and confirms your appointment",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
];

const benefits = [
  {
    title: "Completely Free",
    description: "You do not pay for mental healthcare services through our platform",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
      </svg>
    ),
  },
  {
    title: "Professional Network",
    description: "We partner with licensed mental healthcare professionals",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
      </svg>
    ),
  },
  {
    title: "Easy Process",
    description: "Simple booking process with clear communication",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Confidential & Safe",
    description: "Your privacy and wellbeing are our priority",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-light/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-100/40 via-transparent to-transparent" />
        <div className="container-page relative py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Help Is on the Way
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted sm:text-xl">
              Free mental healthcare access for those who need it most. We coordinate
              with professional providers so you can focus on what matters — your
              wellbeing.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 bg-primary text-white hover:bg-primary-dark shadow-sm text-base px-6 py-3 gap-2"
              >
                Book a Session
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 border border-border text-foreground hover:bg-surface bg-white text-base px-6 py-3 gap-2"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-muted">
              Getting started is simple. Here is how the process works.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map(({ step, title, description, icon }) => (
              <div
                key={step}
                className="group relative flex flex-col items-center rounded-xl border border-border bg-card p-8 text-center card-elevation card-hover"
              >
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-sm font-semibold text-primary">
                  {step}
                </span>
                <div className="mb-4 text-primary">{icon}</div>
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted">{description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/how-it-works"
              className="text-sm font-medium text-primary hover:text-primary-700 transition-colors"
            >
              Learn more about the process →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Choose Us
            </h2>
            <p className="mt-4 text-lg text-muted">
              We are committed to making mental healthcare accessible to everyone.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {benefits.map(({ title, description, icon }) => (
              <div
                key={title}
                className="flex gap-4 rounded-xl border border-border bg-card p-6 card-elevation"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  {icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{title}</h3>
                  <p className="mt-1 text-sm text-muted">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 sm:py-28">
        <div className="container-page text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to take the first step?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Your mental health matters. Start your journey toward wellbeing today
            — completely free.
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
        <div className="container-page py-16">
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
