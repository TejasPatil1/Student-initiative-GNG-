"use client"

import React from "react"
import { cn } from "@/lib/utils"

type RevealVariant = "fade" | "slide-up"

interface RevealSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
  variant?: RevealVariant
  delayMs?: number
  once?: boolean
  threshold?: number
}

export function RevealSection({
  as: Tag = "section",
  className,
  children,
  variant = "slide-up",
  delayMs = 0,
  once = true,
  threshold = 0.2,
  ...props
}: RevealSectionProps) {
  const ref = React.useRef<HTMLElement | null>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setVisible(true)
      return
    }

    const node = ref.current
    if (!node) return

    let timer: number | undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delayMs > 0) {
              timer = window.setTimeout(() => setVisible(true), delayMs)
            } else {
              setVisible(true)
            }
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { threshold },
    )

    observer.observe(node)
    return () => {
      if (timer !== undefined) window.clearTimeout(timer)
      observer.disconnect()
    }
  }, [delayMs, once, threshold])

  const base = "transition-all duration-700 ease-out will-change-transform will-change-opacity"
  const hidden = variant === "fade" ? "opacity-0" : "opacity-0 translate-y-6 md:translate-y-8"
  const shown = variant === "fade" ? "opacity-100" : "opacity-100 translate-y-0"

  return (
    <Tag ref={ref as any} className={cn(base, visible ? shown : hidden, className)} {...props}>
      {children}
    </Tag>
  )
}
