"use client"

import React from "react"

type OptionKey = "subject" | "year" | "type" | "semester"

type FilterProps = {
  filters: Partial<Record<OptionKey, string[]>>
  values: Partial<Record<OptionKey, string>>
  onChange: (key: OptionKey, value: string) => void
}

export function Filters({ filters, values, onChange }: FilterProps) {
  const renderSelect = (label: string, key: OptionKey, options?: string[]) => {
    if (!options || options.length === 0) return null

    return (
      <label className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">{label}</span>
        <select
          className="rounded-md border bg-card px-3 py-2 text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring"
          value={values[key] ?? ""}
          onChange={(e) => onChange(key, e.target.value)}
        >
          <option value="">All</option>
          {options.map((opt, index) => (
            <option key={`${opt}-${index}`} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {renderSelect("Subject", "subject", filters.subject)}
      {renderSelect("Year", "year", filters.year)}
      {renderSelect("Type", "type", filters.type)}
      {renderSelect("Semester", "semester", filters.semester)}
    </div>
  )
}
