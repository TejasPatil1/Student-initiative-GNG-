"use client"

import useSWR from "swr"

type Group = {
  name: string
  link: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function WhatsAppPage() {
  const { data } = useSWR<Group[]>("/data/whatsapp.json", fetcher)

  return (
    <section className="space-y-6 pt-24 px-4 md:px-8 relative z-10">
      {/* Header */}
       <div className="relative z-10 mx-auto mt-25 max-w-6xl rounded-xl bg-blue/20 backdrop-blur-md p-25 shadow-lg text-center">
      <header className="relative z-10 text-center">
        <h2 className="font-[var(--font-orbitron)] text-4xl sm:text-5xl md:text-5xl lg:text-6xl tracking-tight text-white">
          WhatsApp Groups
        </h2>
        <p className="mt-2 text-sm text-gray-300">
          Join the community groups.
        </p>
      </header>
      

      {/* Groups Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mt-4">
        {(data ?? []).map((g) => (
          <a
            key={g.name}
            href={g.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            {g.name}
          </a>
        ))}
      </div>
      </div>
    </section>
  )
}
  