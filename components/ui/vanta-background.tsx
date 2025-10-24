"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    VANTA?: {
      NET: (options: VantaNetOptions) => VantaEffect
    }
    THREE?: any
  }
}

interface VantaNetOptions {
  el: HTMLElement
  mouseControls: boolean
  touchControls: boolean
  gyroControls: boolean
  minHeight: number
  minWidth: number
  scale: number
  scaleMobile: number
  color: number
  backgroundColor: number
  points: number
  maxDistance: number
  spacing: number
}

interface VantaEffect {
  destroy: () => void
}

export interface VantaProps {
  color?: number
  backgroundColor?: number
  points?: number
  maxDistance?: number
  spacing?: number
}

export function VantaBackground({
  color = 0x1e90ff,
  backgroundColor = 0x000000,
  points = 12,
  maxDistance = 20,
  spacing = 15,
}: VantaProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const effectRef = useRef<VantaEffect | null>(null)

  useEffect(() => {
    const threeScript = document.createElement("script")
    threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
    threeScript.async = true

    const vantaScript = document.createElement("script")
    vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"
    vantaScript.async = true

    const initVanta = () => {
      if (window.VANTA && containerRef.current) {
        effectRef.current = window.VANTA.NET({
          el: containerRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: window.innerHeight,
          minWidth: window.innerWidth,
          scale: 1.0,
          scaleMobile: 1.0,
          color,
          backgroundColor,
          points,
          maxDistance,
          spacing,
        })
      }
    }

    threeScript.onload = () => {
      vantaScript.onload = initVanta
      document.body.appendChild(vantaScript)
    }

    document.body.appendChild(threeScript)

    return () => {
      if (effectRef.current) effectRef.current.destroy()
    }
  }, [color, backgroundColor, points, maxDistance, spacing])

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />
}
