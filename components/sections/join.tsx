"use client";

import Link from "next/link";
import { RevealSection } from "@/components/ui/reveal-section";
import { cn } from "@/lib/utils";

export function JoinPFLSection() {
  return (
    <RevealSection variant="slide-up" className="min-h-screen flex items-center py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6 w-full">
        <div
          className={cn(
            "rounded-2xl p-8 md:p-12 shadow-md hover:shadow-xl transition bg-[linear-gradient(140deg,hsl(var(--primary)/0.10),transparent_40%)] w-full"
          )}
        >
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Join PFL Today</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacinia arcu eget nulla.
          </p>
          <div className="mt-6">
            <Link
              href="#get-started"
              className={cn(
                "inline-flex items-center justify-center rounded-full px-5 py-2.5 bg-primary text-primary-foreground shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              )}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
