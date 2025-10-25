"use client";

import { RevealSection } from "@/components/ui/reveal-section";

export function PeerLearningSection() {
  return (
    <RevealSection className="min-h-screen flex items-center py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6 w-full">
        <div className="rounded-2xl border shadow-md hover:shadow-lg transition-shadow bg-[radial-gradient(1200px_600px_at_80%_-20%,hsl(var(--primary)/0.12),transparent)] w-full">
          <div className="p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-balance">
              Peer Learning, Not Teaching
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
                At <strong>PFG</strong>, we learn and grow together.<br />
  We share experiences, tackle coding challenges, and collaborate on projects.<br />
  It's all about collective growth and peer support.

            </p>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
