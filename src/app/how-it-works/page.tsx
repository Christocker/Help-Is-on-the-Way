import type { Metadata } from "next";
import Link from "next/link";

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
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
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
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
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
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
  },
  {
    step: 4,
    title: "Pick Date & Time",
    description:
      "Choose a date and time that works best for your schedule. We show you available slots so you can plan ahead.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
  },
  {
    step: 5,
    title: "Submit Request",
    description:
      "Submit your booking request. You will receive a confirmation that your request has been received and is being reviewed.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
      </svg>
    ),
  },
  {
    step: 6,
    title: "Wait for Confirmation",
    description:
      "Our team coordinates with our partner provider to confirm your appointment. You will typically hear back within 1-3 business days.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    step: 7,
    title: "Attend Appointment",
    description:
      "Once confirmed, attend your appointment at the scheduled time. Your mental health journey begins here.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-light/10 py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              How It Works
            </h1>
            <p className="mt-4 text-lg text-muted">
              A simple, step-by-step process to access free mental healthcare.
              From sign-up to your first appointment, we guide you every step of
              the way.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-primary-100 sm:block" />

              <ol className="space-y-12">
                {steps.map(({ step, title, description, icon }) => (
                  <li key={step} className="relative flex gap-6">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white font-bold text-lg shadow-md">
                      {step}
                    </div>
                    <div className="rounded-xl border border-border bg-card p-6 flex-1 card-elevation">
                      <div className="flex items-center gap-3 text-primary">
                        {icon}
                        <h3 className="text-lg font-semibold text-foreground">
                          {title}
                        </h3>
                      </div>
                      <p className="mt-3 text-muted leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20">
        <div className="container-page text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to begin?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Create your account and start your journey toward better mental health.
          </p>
          <div className="mt-10">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 bg-white text-primary hover:bg-primary-50 shadow-sm text-base px-6 py-3 gap-2"
            >
              Create Account
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
