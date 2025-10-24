"use client"

import useSWR from "swr"
import { useMemo, useState } from "react"
import { Filters } from "./filters"
import { GridCard } from "./grid-card"

type PYQ = {
  name: string
  subject: string
  year: string
  type: string
  semester: string
  link: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function PYQsPage() {
  const { data } = useSWR<PYQ[]>("/data/pyqs.json", fetcher)
  const [values, setValues] = useState<Record<string, string>>({})

  // Unique lists for each filter
  const subjects = useMemo(() => Array.from(new Set((data ?? []).map((d) => d.subject))).sort(), [data])
  const years = useMemo(
    () =>
      Array.from(new Set((data ?? []).map((d) => d.year)))
        .sort()
        .reverse(),
    [data],
  )
  const types = useMemo(() => Array.from(new Set((data ?? []).map((d) => d.type))).sort(), [data])
  const semesters = useMemo(() => Array.from(new Set((data ?? []).map((d) => d.semester))).sort(), [data])

  // Filtered data
  const filtered = useMemo(() => {
    if (!data) return []
    return data.filter((d) => {
      if (values.subject && d.subject !== values.subject) return false
      if (values.year && d.year !== values.year) return false
      if (values.semester && d.semester !== values.semester) return false
      if (values.type && d.type !== values.type) return false
      return true
    })
  }, [data, values])

  const set = (k: string, v: string) => setValues((s) => ({ ...s, [k]: v }))

  return (
    <section className="space-y-8 pt-24 px-4 md:px-8 relative z-10">
       <div className="relative z-10 mx-auto mt-25 max-w-5xl rounded-xl bg-white/20 backdrop-blur-md p-25 shadow-lg text-center">
      {/* Header */}
      <header className="relative z-10 my-8 text-center flex flex-col items-center gap-3">
        <h2 className="font-[var(--font-orbitron)] text-4xl sm:text-5xl md:text-5xl lg:text-6xl tracking-tight text-white">
          Previous Year Questions
        </h2>
      </header>

      {/* Filters */}
      <div className="flex justify-center">
        <div className="w-full max-w-6xl">
          <Filters
            filters={{
              subject: subjects,
              year: years,
              semester: semesters,
              type: types,
            }}
            values={values}
            onChange={set}
          />
        </div>
      </div>

      {/* Grid of PYQs */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {filtered.map((q) => (
          <GridCard
            key={`${q.name}-${q.year}-${q.type}-${q.semester}`}
            title={q.name}
            meta={`${q.subject} • ${q.year} • ${q.semester} • ${q.type}`}
            actions={[{ label: "View PDF", href: q.link, external: true }]}
          />
        ))}
      
      </div></div>
    </section>
  )
}
