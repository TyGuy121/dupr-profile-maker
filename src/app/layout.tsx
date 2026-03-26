import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://duprgenerator.com"),
  title: "DUPR Generator",
  description: "Create and customize your DUPR profile screenshot",
  openGraph: {
    title: "DUPR Generator. Make It Your Own.",
    description: "Create and customize your DUPR profile screenshot",
    url: "https://duprgenerator.com",
    siteName: "DUPR Generator",
    images: [
      {
        url: "/og-preview.png",
        width: 1200,
        height: 630,
        alt: "DUPR Generator social preview graphic",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DUPR Generator. Make It Your Own.",
    description: "Create and customize your DUPR profile screenshot",
    images: ["/og-preview.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
