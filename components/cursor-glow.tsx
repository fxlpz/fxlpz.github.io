"use client"

import { useEffect, useState, useRef } from "react"

export function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const glowRef = useRef<HTMLDivElement>(null)
  const pointerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frameId: number

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)

      // Update element position directly in the DOM to bypass React render loop
      if (glowRef.current && pointerRef.current) {
        frameId = requestAnimationFrame(() => {
          if (glowRef.current && pointerRef.current) {
            glowRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
            pointerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
          }
        })
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select')
      setIsHovering(!!isInteractive)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.body.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseover", handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseover", handleMouseOver)
      cancelAnimationFrame(frameId)
    }
  }, [isVisible])

  return (
    <>
      <div
        ref={glowRef}
        className="cursor-glow hidden lg:block pointer-events-none fixed top-0 left-0"
        style={{
          width: isHovering ? "500px" : "400px",
          height: isHovering ? "500px" : "400px",
          // Offset to center the glow at cursor position
          marginLeft: isHovering ? "-250px" : "-200px",
          marginTop: isHovering ? "-250px" : "-200px",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.4s ease, width 0.3s ease, height 0.3s ease, margin 0.3s ease",
          willChange: "transform",
        }}
      />
      <div
        ref={pointerRef}
        className="hidden lg:block pointer-events-none fixed top-0 left-0 w-8 h-8 rounded-full mix-blend-screen"
        style={{
          marginLeft: "-16px",
          marginTop: "-16px",
          background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          opacity: isVisible ? 0.15 : 0,
          transition: "opacity 0.2s ease",
          filter: "blur(4px)",
          willChange: "transform",
        }}
      />
    </>
  )
}
