

export const metadata = {
  title: "Codex Club | Coding, Courses & PYQs for Students",
  description:
    "Join Codex Club — a student-driven coding community with assignments, PYQs, courses, and opportunities to grow in tech.",
  keywords:
    "Codex Club, coding community, student coding platform, PYQs, programming courses, CodexClub",
  openGraph: {
    title: "Codex Club | Coding Community",
    description:
      "Explore Codex Club — a platform for students to learn, code, and collaborate.",
    url: "https://codexclub.vercel.app",
    siteName: "Codex Club",
    images: [
      {
        url: "https://codexclub.vercel.app/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

// Import after metadata
import PageClientWrapper from "@/components/ui/PageClientWrapper";

export default function Page() {
  return <PageClientWrapper />;
}


