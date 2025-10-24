"use client";

import useSWR from "swr";
import { useMemo, useState } from "react";
import { Filters } from "./filters";
import { GridCard } from "./grid-card";

type Assignment = {
  name: string;
  subject: string;
  semester: string;
  link: string;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function AssignmentsPage() {
  const { data } = useSWR<Assignment[]>("/data/assignments.json", fetcher);
  const [values, setValues] = useState<Record<string, string>>({});

  const subjects = useMemo(
    () => Array.from(new Set((data ?? []).map((d) => d.subject))).sort(),
    [data]
  );
  const semesters = useMemo(
    () => Array.from(new Set((data ?? []).map((d) => d.semester))).sort(),
    [data]
  );

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter((d) => {
      if (values.subject && d.subject !== values.subject) return false;
      if (values.semester && d.semester !== values.semester) return false;
      return true;
    });
  }, [data, values]);

  const set = (k: string, v: string) => setValues((s) => ({ ...s, [k]: v }));

  return (
    <section className="space-y-10 pt-24 px-4 md:px-8 relative z-10">
       <div className="relative z-10 mx-auto mt-25 max-w-8xl rounded-xl bg-blue/20 backdrop-blur-md p-25 shadow-lg text-center">
      {/* Page Heading */}
      <header className="relative z-10 my-8 text-center">
        <h2 className="font-[var(--font-orbitron)] text-4xl sm:text-5xl md:text-6xl tracking-tight text-white">
          Assignments
        </h2>
      </header>

      {/* Filters */}
     <div className="flex justify-center mt-8">
  <div className="w-full max-w-8xl px-4">
    <div className="flex flex-wrap justify-center gap-6 scale-110">
      <Filters
        filters={{ subject: subjects, semester: semesters }}
        values={values}
        onChange={set}
      />
    </div>
  </div>
</div>

      {/* Grid of Assignments */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
        {filtered.map((a) => (
          <GridCard
            key={`${a.name}-${a.semester}`}
            title={a.name}
            meta={`${a.subject} • Semester ${a.semester}`}
            actions={[{ label: "View PDF", href: a.link, external: true }]}
          />
        ))}
      </div>
      </div>
    </section>
  );
}
