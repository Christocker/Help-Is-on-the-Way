import type { Metadata } from "next";
import Link from "next/link";
import { PublicHero } from "@/components/layout/PublicHero";

export const metadata: Metadata = {
  title: "Contact - Help Is on the Way",
  description:
    "Get in touch with Help Is on the Way. Contact us for questions about our free mental healthcare platform or for support with your booking.",
};

const contactDetails = [
  {
    title: "Email Support",
    description: "For general inquiries and booking support, email our team.",
    href: "mailto:skbarangay176c@gmail.com",
    linkText: "skbarangay176c@gmail.com",
    chip: "bg-primary-50 text-primary",
    border: "",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    title: "Facebook",
    description:
      "Follow our community on Facebook for updates, resources, and support.",
    href: "https://www.facebook.com/SKCouncil176C",
    linkText: "facebook.com/SKCouncil176C",
    chip: "bg-primary-50 text-primary",
    border: "",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
  },
  {
    title: "Response Time",
    description:
      "Our team typically responds within 1-3 business days. For urgent matters related to an existing booking, please mention your appointment details in your message.",
    chip: "bg-accent-50 text-accent",
    border: "",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: "NCMH Crisis Hotline",
    description:
      "24/7 crisis support from the National Center for Mental Health.",
    phone1: "skbarangay176c@gmail.com",
    phone1Href: "mailto:skbarangay176c@gmail.com",
    phone2: "https://www.facebook.com/SKCouncil176C",
    phone2Href: "https://www.facebook.com/SKCouncil176C",
    chip: "bg-red-100 text-destructive",
    border: "border-red-200 bg-destructive-light",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
  },
  {
    title: "Emergency: 911",
    description:
      "For emergencies, call 911 or go to your nearest hospital emergency room immediately. Do not wait.",
    phone1: "911",
    phone1Href: "tel:911",
    chip: "bg-amber-100 text-amber-700",
    border: "border-amber-200 bg-amber-50",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <>
      {/* Hero */}
      <PublicHero
        eyebrow="Get in Touch"
        title="Contact Us"
        subtitle="Have questions or need assistance with a booking? Our team is here to help. For emergencies, please call 911 or go to your nearest hospital emergency room."
      />

      {/* Contact Form & Info */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3 animate-fade-up">
              <div className="rounded-2xl border border-border bg-card p-8 card-elevation">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  Send us a message
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Fill out the form below and our team will get back to you
                  within 1-3 business days.
                </p>

                <form className="mt-8 space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1.5 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-light focus:border-primary-light focus:ring-1 focus:ring-primary-light outline-none transition-colors"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1.5 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-light focus:border-primary-light focus:ring-1 focus:ring-primary-light outline-none transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="mt-1.5 block w-full resize-y rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-light focus:border-primary-light focus:ring-1 focus:ring-primary-light outline-none transition-colors"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Send Message
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 lg:col-span-2">
              {contactDetails.map((detail, index) => (
                <div
                  key={detail.title}
                  className={`rounded-2xl border p-6 card-elevation animate-fade-up ${
                    detail.border || "border-border bg-card"
                  }`}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${detail.chip}`}
                    >
                      {detail.icon}
                    </span>
                    <h3 className="text-base font-semibold text-foreground">
                      {detail.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {detail.description}
                  </p>
                  <div className="mt-3 space-y-1 text-sm">
                    {"href" in detail && detail.href && (
                      <a
                        href={detail.href}
                        className="font-semibold text-primary transition-colors hover:text-primary-700"
                      >
                        {detail.linkText}
                      </a>
                    )}
                    {"phone1" in detail && detail.phone1 && (
                      <p className="font-medium">
                        <a
                          href={detail.phone1Href}
                          className="underline hover:text-primary"
                        >
                          {detail.phone1}
                        </a>
                        {detail.phone2 && (
                          <>
                            {" "}
                            /{" "}
                            <a
                              href={detail.phone2Href}
                              className="underline hover:text-primary"
                            >
                              {detail.phone2}
                            </a>
                          </>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              <div
                className="rounded-2xl border border-border bg-card p-6 card-elevation animate-fade-up"
                style={{ animationDelay: "320ms" }}
              >
                <p className="text-sm leading-relaxed text-muted">
                  Prefer to browse first? Visit our{" "}
                  <Link
                    href="/faq"
                    className="font-medium text-primary transition-colors hover:text-primary-700"
                  >
                    FAQ
                  </Link>{" "}
                  or explore our{" "}
                  <Link
                    href="/resources"
                    className="font-medium text-primary transition-colors hover:text-primary-700"
                  >
                    resources
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
