"use client"


export function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Vanta background */}
  

      {/* Optional gradient/grid overlay */}
      <div className="absolute -0 hero-gradient" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid-surface" aria-hidden="true" />

      {/* Transparent rectangle behind text */}
      <div className="relative z-10 mx-auto mt-25 max-w-6xl rounded-xl bg-white/20 backdrop-blur-md p-25 shadow-lg text-center">
        <h1 className="font-[var(--font-orbitron)] text-3xl md:text-5xl tracking-tight text-white">
          GECG Web project
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl">
          Where coding failures become programming triumphs.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-4">
          <a href="#/assignments" className="btn btn-primary">Assignments</a>
          <a href="https://chat.whatsapp.com/" target="_blank" rel="noopener noreferrer" className="btn">Join WhatsApp</a>
          <a href="#/chat" className="btn">Chat Room</a>
          <a href="#/pyqs" className="btn">PYQs</a>
        </div>
      </div>
    </section>
  )
}
