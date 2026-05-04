import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://forthub.com'),
  title: "FortHub | Ultimate Fortnite Updates & Shop",
  description: "Your #1 source for live Fortnite news, daily item shop, player stats, and leaks.",
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'FortHub',
  },
  openGraph: {
    title: "FortHub | Ultimate Fortnite Updates & Shop",
    description: "Your #1 source for live Fortnite news, daily item shop, player stats, and leaks.",
    url: 'https://forthub.com',
    siteName: 'FortHub',
    images: [
      {
        url: '/icons/icon-512.png',
        width: 512,
        height: 512,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

import { Analytics } from '@vercel/analytics/react';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
        <Footer />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
