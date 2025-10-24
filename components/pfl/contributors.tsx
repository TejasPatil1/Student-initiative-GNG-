"use client"

import useSWR from "swr"
type Contributor = { name: string; role?: string; link?: string }

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function ContributorsPage() {
  const { data } = useSWR<Contributor[]>("/data/contributors.json", fetcher)

  return (
    <section className="space-y-8 pt-24 px-4 md:px-8 relative z-10">
      {/* Header */}
      <header className="relative z-10 text-center">
        <h2 className="font-[var(--font-orbitron)] text-4xl sm:text-5xl md:text-5xl lg:text-6xl tracking-tight text-white">
          Contributors
        </h2>
        <p className="mt-2 text-sm text-gray-300">
          Thanks to everyone who helped PFL.
        </p>
      </header>

      {/* Contributors Grid */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {(data ?? []).map((c) => (
          <li
            key={c.name}
            className="card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md bg-card/80 backdrop-blur-sm"
          >
            <div className="font-medium text-white">{c.name}</div>
            {c.role ? <div className="text-sm text-gray-300">{c.role}</div> : null}
            {c.link ? (
              <a
                className="btn mt-3"
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Profile
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  )
}
