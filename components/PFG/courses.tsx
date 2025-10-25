"use client"

import useSWR from "swr"

type Course = {
  name: string
  link: string
  tags?: string[]
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function CoursesPage() {
  const { data } = useSWR<Course[]>("/data/courses.json", fetcher)

  return (
    <section className="space-y-6">
      <header className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
          Courses
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Curated learning paths and resources to accelerate your growth
        </p>
      </header>

      <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {(data ?? []).map((c) => (
          <div
            key={c.name}
            className="group bg-card border border-border rounded-xl p-4 sm:p-5 hover:border-primary/50 hover:shadow-lg transition-all duration-300 flex flex-col gap-3"
          >
            <div className="flex flex-col gap-2 flex-grow">
              <h3 className="text-base sm:text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {c.name}
              </h3>
              {c.tags && c.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-border/50 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z"
                  />
                </svg>
                Course
              </div>
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Visit
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {(data ?? []).length === 0 && (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
          <svg
            className="w-12 h-12 text-muted-foreground/50 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-foreground mb-1">No courses available</h3>
          <p className="text-sm text-muted-foreground">Check back soon for curated learning resources</p>
        </div>
      )}
    </section>
  )
}
