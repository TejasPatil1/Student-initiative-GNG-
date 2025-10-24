"use client"

import useSWR from "swr"
import { GridCard } from "./grid-card"

type Course = {
  name: string
  link: string
  tags?: string[]
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function CoursesPage() {
  const { data } = useSWR<Course[]>("/data/courses.json", fetcher)

  return (
    
    <section className="space-y-8 relative z-10">
       <div className="relative z-10 mx-auto mt-25 max-w-6xl rounded-xl bg-blue/20 backdrop-blur-md p-25 shadow-lg text-center">
      
      <header className="text-center relative z-10">
        <h2 className="font-[var(--font-orbitron)] text-4xl sm:text-5xl md:text-6xl lg:text-6xl tracking-tight text-white">
          Courses
        </h2>
        <p className="mt-2 text-sm text-gray-300">
          Curated learning paths and resources.
        </p>
      </header>

      {/* Courses Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {(data ?? []).map((c) => (
          <GridCard
            key={c.name}
            title={c.name}
            tags={c.tags}
            actions={[{ label: "Open", href: c.link, external: true }]}
          />
        ))}
      </div>
     </div>
    </section>
  )
}
