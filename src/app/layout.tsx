import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AI World — The Complete History of Artificial Intelligence",
    template: "%s | AI World",
  },
  description:
    "Explore the complete history of artificial intelligence from 1943 to today. 80+ milestones across 11 eras — from Turing to the Agentic Age.",
  metadataBase: new URL("https://aiworld.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "AI World",
    locale: "en_US",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "AI World — The Complete History of Artificial Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
  },
  other: {
    "theme-color": "#6366f1",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
