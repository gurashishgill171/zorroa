/** @format */

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { EdgeStoreProvider } from "../lib/edgestore";

const roboto = Roboto({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - AI Portfolio Builder",
    absolute: "AI Portfolio Builder",
  },
  description:
    "An AI-powered portfolio builder that helps professionals and creatives instantly generate stunning, personalized portfolios. Showcase your work, experience, and skills with AI-driven designs and content suggestions. No coding or design skills required—just describe your vision, and let AI do the rest!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <EdgeStoreProvider>
        <html lang="en">
          <body className={roboto.className}>{children}</body>
        </html>
      </EdgeStoreProvider>
    </ClerkProvider>
  );
}
