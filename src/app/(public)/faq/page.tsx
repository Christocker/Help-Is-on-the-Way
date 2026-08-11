import type { Metadata } from "next";
import Link from "next/link";
import { PublicHero } from "@/components/layout/PublicHero";

export const metadata: Metadata = {
  title: "FAQ - Help Is on the Way",
  description:
    "Frequently asked questions about Help Is on the Way, our free mental healthcare platform, booking process, and partnership with Argao Psych.",
};

const generalFaqs = [
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

const supportFaqs = [
  {
    question: "How long until I hear back after booking?",
    answer:
      "Within 24-48 hours of submitting your request, our team will email you a proposed schedule for your appointment. Once you confirm the date and time, your appointment is locked in.",
  },
  {
    question: "Can I reschedule my appointment?",
    answer:
      "Yes, you can request to reschedule your appointment. Contact us through the platform or email us at skbarangay176c@gmail.com, and our team will work with you and the provider to find a new time that works for everyone.",
  },
  {
    question: "Is my information safe?",
    answer:
      "Yes, we take privacy and confidentiality very seriously. Your personal and health-related information is handled with the utmost care and is only shared with your provider as necessary for your care. We comply with applicable data protection and privacy regulations.",
  },
];

function AccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="group rounded-2xl border border-border bg-card card-elevation">
      <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-medium text-foreground select-none">
        {question}
        <svg className="h-5 w-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </summary>
      <p className="px-6 pb-5 text-sm leading-relaxed text-muted">{answer}</p>
    </details>
  );
}

export default function FAQ() {
  return (
    <>
      {/* Hero */}
      <PublicHero
        eyebrow="Common Questions"
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our platform, services, and process. If you do not find what you are looking for, our team is always here to help."
      />

      {/* FAQ Items */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <div className="animate-fade-up">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                  </svg>
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  General &amp; Eligibility
                </h2>
              </div>
              <div className="mt-6 space-y-4">
                {generalFaqs.map(({ question, answer }) => (
                  <AccordionItem key={question} question={question} answer={answer} />
                ))}
              </div>
            </div>

            <div
              className="mt-14 animate-fade-up"
              style={{ animationDelay: "150ms" }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-50 text-accent">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  Booking, Privacy &amp; Support
                </h2>
              </div>
              <div className="mt-6 space-y-4">
                {supportFaqs.map(({ question, answer }) => (
                  <AccordionItem key={question} question={question} answer={answer} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crisis Support Callout */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl animate-fade-up">
            <div className="rounded-2xl border-2 border-red-200 bg-destructive-light p-8 sm:p-10">
              <div className="flex flex-col items-start gap-6 sm:flex-row">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-destructive">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-destructive">
                    In a mental health crisis?
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-red-800">
                    Help Is on the Way is a scheduling coordination platform and
                    is <strong>not</strong> an emergency or crisis service. If
                    you or someone you know is in immediate danger or
                    experiencing a mental health crisis, call 911 or go to your
                    nearest emergency room right away.
                  </p>
                  <p className="mt-4 text-sm font-medium text-red-800">
                    Reach us at:{" "}
                    <a href="mailto:skbarangay176c@gmail.com" className="font-semibold underline hover:text-destructive">
                      skbarangay176c@gmail.com
                    </a>{" "}
                    /{" "}
                    <a href="https://www.facebook.com/SKCouncil176C" target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:text-destructive">
                      facebook.com/SKCouncil176C
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <p className="text-muted">
                Still have questions?{" "}
                <Link
                  href="/contact"
                  className="font-medium text-primary transition-colors hover:text-primary-700"
                >
                  Contact us
                </Link>
              </p>
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
            Your questions answered — and care on the way
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
