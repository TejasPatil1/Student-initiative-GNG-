"use client"

type CardProps = {
  title: string
  meta?: string
  tags?: string[]
  actions?: { label: string; href: string; external?: boolean }[]
}

export function GridCard({ title, meta, tags, actions }: CardProps) {
  return (
    <div className="group card relative flex flex-col justify-between p-4 transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div>
        <h3 className="text-base font-semibold">{title}</h3>
        {meta ? <p className="mt-1 text-sm text-muted-foreground">{meta}</p> : null}
        {tags && tags.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      {actions && actions.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {actions.map((a) =>
            a.external ? (
              <a key={a.label} href={a.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                {a.label}
              </a>
            ) : (
              <a key={a.label} href={a.href} className="btn">
                {a.label}
              </a>
            ),
          )}
        </div>
      ) : null}
      <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-primary/10"></div>
    </div>
  )
}
