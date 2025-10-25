"use client";

export function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Optional gradient/grid overlay */}
      <div className="absolute inset-0 hero-gradient" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-surface" aria-hidden="true" />

      {/* Transparent rectangle behind text with mobile-friendly padding */}
      <div className="relative z-10 mx-auto mt-25 max-w-6xl rounded-xl bg-white/20 backdrop-blur-md p-4 sm:p-8 md:p-12 text-center">
        <h1 className="font-[var(--font-orbitron)] text-2xl sm:text-3xl md:text-5xl tracking-tight text-white">
          Programming for GenZs
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
          Turning coding struggles into success stories. Be part of our student-driven community of future programmers and innovators! 
        </p>
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mt-4">
          <a
            href="#/assignments"
            className="btn btn-primary text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2"
          >
            Assignments
          </a>
          <a
            href="https://chat.whatsapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2"
          >
            Join WhatsApp
          </a>
          <a
            href="#/chat"
            className="btn text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2"
          >
            Chat Room
          </a>
          <a
            href="#/pyqs"
            className="btn text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2"
          >
            PYQs
          </a>
        </div>
      </div>
    </section>
  );
}
