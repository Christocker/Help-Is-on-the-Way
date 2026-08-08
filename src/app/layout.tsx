import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Help Is on the Way - Mental Healthcare Access",
  description:
    "Free mental healthcare access platform connecting individuals with professional mental health services. We coordinate with partner providers so you don't have to pay.",
  openGraph: {
    title: "Help Is on the Way - Mental Healthcare Access",
    description:
      "Free mental healthcare access platform connecting individuals with professional mental health services. We coordinate with partner providers so you don't have to pay.",
    type: "website",
    siteName: "Help Is on the Way",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
