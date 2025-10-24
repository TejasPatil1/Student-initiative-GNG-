"use client";
import React from "react";

export function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/Background.mp4" type="video/mp4" />
      </video>

      {/* Content on top */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black/40 text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to My Site</h1>
        <p className="text-lg">Smooth video animation instead of Vanta 🌌</p>
      </div>
    </section>
  );
}
