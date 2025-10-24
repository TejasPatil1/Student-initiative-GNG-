"use client";

import { RevealSection } from "@/components/ui/reveal-section";

export function LearningTracksSection() {
  const tracks = [
    { title: "Web Development", desc: "HTML, CSS, JS, frameworks, and tooling." },
    { title: "Data & ML", desc: "Python, data analysis, and machine learning." },
    { title: "Systems", desc: "Low-level, OS concepts, performance." },
  ];

  return (
    <RevealSection variant="slide-up" className="min-h-screen flex items-center py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6 w-full">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Our Learning Tracks</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed max-w-3xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat condimentum velit. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {tracks.map((t) => (
            <div
              key={t.title}
              className="rounded-2xl bg-background p-6 shadow-md hover:shadow-lg transition hover:-translate-y-0.5 w-full"
            >
              <h3 className="font-medium text-lg">{t.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
