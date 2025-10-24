"use client";
import { RevealSection } from "@/components/ui/reveal-section";
import { NavLink } from "react-router-dom";

export function AboutPFLSection() {
  return (
    <RevealSection variant="slide-up">
      <div className="mx-auto max-w-6xl px-4 md:px-6 w-full">

        {/* Black blended rectangle bar behind section links (Hero style) */}
        <div className="relative w-full mb-12">
          <div className="absolute inset-0 flex items-center justify-center">
            

        </div>
        </div>

        {/* About PFL content card */}
        <div className="rounded-3xl bg-white/10 backdrop-blur-lg shadow-2xl hover:shadow-3xl transition-all p-12 md:p-20 w-full text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 md:mb-8">
            About PFL
          </h2>
          <p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
            libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
            imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
          </p>
        </div>
      </div>
    </RevealSection>
  );
}
