import type { Metadata } from "next";
import { Orbitron, Inter, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import "./globals.css";

// Font configurations

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Customize weights as needed
});


export const metadata: Metadata = {
  title: "Codex Club | Student Initiative GNG",
  description:
    "Codex Club (CXC) — a student-driven platform for courses, assignments, PYQs, community learning, and tech collaboration.",
  keywords: [
    "Codex Club",
    "CXC",
    "Student Initiative",
    "GNG",
    "Courses",
    "Assignments",
    "PYQs",
    "Tech Club",
    "Student Projects",
    "Coding Community",
    "Hackathons",
    "AI Learning",
  ],
  authors: [{ name: "Codex Club Team", url: "https://student-initiative-gng.vercel.app/" }],
  generator: "Next.js",
  metadataBase: new URL("https://student-initiative-gng.vercel.app"),
  alternates: {
    canonical: "https://student-initiative-gng.vercel.app/",
  },
  openGraph: {
    title: "Codex Club | Student Initiative GNG",
    description:
      "A student-driven tech community offering resources, assignments, PYQs, and learning opportunities.",
    url: "https://student-initiative-gng.vercel.app/",
    siteName: "Codex Club",
    images: [
      {
        url: "https://student-initiative-gng.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Codex Club Banner",
      },
    ],
    locale: "en_IN", // India-based for better regional targeting
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codex Club | Student Initiative GNG",
    description:
      "Join Codex Club (CXC) — a student community for coding, learning, and tech collaboration.",
    images: ["https://student-initiative-gng.vercel.app/og-image.png"],
    creator: "@CodexClub",
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
  icons: {
    icon: "/favicon.ico",
  },
  category: "education",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${inter.variable} dark antialiased`}>
      <body className={poppins.className}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  );
}
  