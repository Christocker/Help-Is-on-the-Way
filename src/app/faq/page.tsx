import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ - Help Is on the Way",
  description:
    "Frequently asked questions about Help Is on the Way, our free mental healthcare platform, booking process, and partnership with Argao Psych.",
};

const faqs = [
  {
    question: "Is this really free?",
    answer:
      "Yes. You do not pay for mental healthcare services through Help Is on the Way. Our platform is designed to provide free access to mental healthcare for those who need it, in coordination with our partner provider Argao Psych.",
  },
  {
    question: "Who provides the mental health services?",
    answer:
      "We coordinate with Argao Psych, our partner mental healthcare provider. They are staffed by licensed mental health professionals including psychologists and counselors. Help Is on the Way coordinates the scheduling and logistics; Argao Psych provides the actual care.",
  },
  {
    question: "How long until I hear back after booking?",
    answer:
      "Our team typically responds within 1-3 business days. Once you submit a booking request, we coordinate with Argao Psych to confirm your appointment and send you a confirmation notification through the platform.",
  },
  {
    question: "Can I reschedule my appointment?",
    answer:
      "Yes, you can request to reschedule your appointment. Contact us through the platform or email us at support@argaopsych.com, and our team will work with you and the provider to find a new time that works for everyone.",
  },
  {
    question: "Is my information safe?",
    answer:
      "Yes, we take privacy and confidentiality very seriously. Your personal and health-related information is handled with the utmost care and is only shared with your provider as necessary for your care. We comply with applicable data protection and privacy regulations.",
  },
  {
    question: "What if I am in crisis?",
    answer:
      "If you or someone you know is in immediate danger or experiencing a mental health crisis, please call 911 or go to your nearest emergency room immediately. You can also reach out to the NCMH Crisis Hotline at 0917-899-8727 or (02) 989-8727. Help Is on the Way is a scheduling coordination platform and is not an emergency or crisis service.",
  },
  {
    question: "Who is eligible for services?",
    answer:
      "Our services are available to individuals seeking mental healthcare support. There are no financial eligibility requirements — the services are free to all users of the platform. If you need mental healthcare, you are eligible.",
  },
  {
    question: "What types of services are available?",
    answer:
      "Through our partnership with Argao Psych, we offer a range of mental healthcare services including individual counseling, psychological assessments, and other mental health support. When you create an account, you can browse available categories and events to find the right fit for your needs.",
  },
];

export default function FAQ() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-light/10 py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-muted">
              Find answers to common questions about our platform, services, and
              process.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map(({ question, answer }) => (
              <details
                key={question}
                className="group rounded-xl border border-border bg-card card-elevation"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 font-semibold text-foreground select-none">
                  <span>{question}</span>
                  <svg
                    className="h-5 w-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-muted leading-relaxed">
                  {answer}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted">
              Still have questions?{" "}
              <Link
                href="/contact"
                className="font-medium text-primary hover:text-primary-700 transition-colors"
              >
                Contact us
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Crisis Banner */}
      <section className="bg-destructive-light border-y border-red-200 py-8">
        <div className="container-page text-center">
          <p className="text-sm font-semibold text-destructive">
            If you or someone you know is in immediate danger, please call 911 or
            go to your nearest emergency room.
          </p>
          <p className="mt-1 text-sm text-red-700">
            NCMH Crisis Hotline:{" "}
            <a href="tel:09178998727" className="font-medium underline">
              0917-899-8727
            </a>{" "}
            /{" "}
            <a href="tel:028998727" className="font-medium underline">
              (02) 989-8727
            </a>
          </p>
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
