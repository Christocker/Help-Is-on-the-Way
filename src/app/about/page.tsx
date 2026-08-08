import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About - Help Is on the Way",
  description:
    "Learn about Help Is on the Way, our mission to provide free mental healthcare access, and how we coordinate with professional providers.",
};

export default function About() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-light/10 py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              About Us
            </h1>
            <p className="mt-4 text-lg text-muted">
              Connecting individuals with free mental healthcare through trusted
              professional partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Our Mission
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              Help Is on the Way exists to bridge the gap between individuals seeking
              mental health support and the professional care they need. We believe
              that mental healthcare should be accessible to everyone, regardless
              of their financial situation.
            </p>
            <p className="mt-4 text-lg leading-8 text-muted">
              Our platform coordinates with licensed mental healthcare providers to
              schedule appointments at no cost to you. We handle the logistics so you
              can focus on your wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* How We Are Different */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              How We Are Different
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              Help Is on the Way is not a direct-care provider. We do not employ
              therapists or counselors. Instead, we serve as a coordination platform
              that connects you with our partner mental healthcare provider, Argao
              Psych.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-6 card-elevation">
                <h3 className="text-lg font-semibold text-foreground">
                  We Coordinate
                </h3>
                <p className="mt-2 text-sm text-muted">
                  We match your needs with available professionals and handle
                  scheduling, so you do not have to navigate complex healthcare
                  systems alone.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 card-elevation">
                <h3 className="text-lg font-semibold text-foreground">
                  They Provide Care
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Our partner providers are licensed professionals who deliver the
                  actual mental healthcare services. We coordinate; they care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Our Partnership
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              We are proud to partner with Argao Psych, a trusted mental healthcare
              provider staffed by licensed psychologists and counselors. Through this
              partnership, we are able to offer free mental healthcare services to
              our community.
            </p>
            <p className="mt-4 text-lg leading-8 text-muted">
              Our team works closely with Argao Psych to ensure a smooth referral
              and scheduling process. From the moment you submit a booking request
              to the completion of your appointment, we are here to support you
              every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20">
        <div className="container-page text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Create your account and book your first session today — completely free.
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
