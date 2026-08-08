import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact - Help Is on the Way",
  description:
    "Get in touch with Help Is on the Way. Contact us for questions about our free mental healthcare platform or for support with your booking.",
};

export default function Contact() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-light/10 py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-muted">
              Have questions or need assistance? We are here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-xl border border-border bg-card p-8 card-elevation">
                <h2 className="text-2xl font-bold text-foreground">
                  Send us a message
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Fill out the form below and our team will get back to you.
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
                      className="mt-1.5 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-light focus:border-primary-light focus:ring-1 focus:ring-primary-light outline-none transition-colors resize-y"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 bg-primary text-white hover:bg-primary-dark shadow-sm text-sm px-6 py-2.5 gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="rounded-xl border border-border bg-card p-6 card-elevation">
                <h3 className="text-lg font-semibold text-foreground">
                  Email
                </h3>
                <p className="mt-2 text-sm text-muted">
                  For general inquiries and support:
                </p>
                <a
                  href="mailto:support@argaopsych.com"
                  className="mt-1 inline-block text-sm font-medium text-primary hover:text-primary-700 transition-colors"
                >
                  support@argaopsych.com
                </a>
              </div>

              <div className="rounded-xl border border-red-200 bg-destructive-light p-6">
                <h3 className="text-lg font-semibold text-destructive">
                  Crisis Support
                </h3>
                <p className="mt-2 text-sm text-red-800">
                  For mental health emergencies, please call 911 or go to your
                  nearest emergency room.
                </p>
                <div className="mt-4 space-y-1 text-sm text-red-800">
                  <p className="font-medium">NCMH Crisis Hotline</p>
                  <p>
                    <a
                      href="tel:09178998727"
                      className="font-medium underline"
                    >
                      0917-899-8727
                    </a>
                  </p>
                  <p>
                    <a
                      href="tel:028998727"
                      className="font-medium underline"
                    >
                      (02) 989-8727
                    </a>
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6 card-elevation">
                <h3 className="text-lg font-semibold text-foreground">
                  Response Time
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Our team typically responds within 1-3 business days. For urgent
                  matters related to an existing booking, please mention your
                  appointment details in your message.
                </p>
              </div>
            </div>
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
