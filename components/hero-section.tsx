"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { blogPosts } from "@/lib/blog-data"
import { projects } from "@/components/projects-grid"

const roles = ["hacking the web", "hunting bugs", "breaking barriers", "forging exploits", "doing recon"]

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const targetText = roles[currentRole]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < targetText.length) {
            setDisplayText(targetText.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentRole((prev) => (prev + 1) % roles.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole])

  return (
    <section className="relative px-4 sm:px-6 pt-28 sm:pt-36 pb-16 sm:pb-24">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-8 sm:space-y-10">
          <p className="font-mono text-sm text-muted-foreground animate-fade-in-up">
            <span className="text-primary">~$</span> whoami{" "}
            <span className="text-foreground">Felipe da Silva Rosa</span>
          </p>

          <h1
            aria-label="Segurança ofensiva, documentada."
            className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance animate-fade-in-up stagger-1"
          >
            Segurança ofensiva,
            <br />
            <span aria-hidden="true" className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text typing-cursor">
              {displayText || " "}
            </span>
          </h1>

          <p className="max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground animate-fade-in-up stagger-2">
            Escrevo sobre pentest web e bug bounty: writeups detalhados de máquinas, técnicas de exploração e projetos
            open-source. Aqui, vulnerabilidades são encontradas, exploradas e documentadas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-3">
            <Link
              href="/blog"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-lg border border-primary bg-primary/10 px-7 py-4 sm:py-3.5 font-mono text-sm text-primary transition-all duration-500 hover:bg-primary hover:text-primary-foreground active:scale-[0.98]"
            >
              <span className="relative z-10">ler os writeups</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
              <span className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-500 group-hover:translate-x-0" />
            </Link>
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-3 rounded-lg border border-border px-7 py-4 sm:py-3.5 font-mono text-sm text-muted-foreground transition-all duration-300 hover:border-foreground hover:text-foreground hover:bg-secondary/50 active:scale-[0.98]"
            >
              <span>ver projetos</span>
              <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                →
              </span>
            </a>
          </div>

          <dl className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 font-mono text-xs text-muted-foreground animate-fade-in-up stagger-4">
            <div className="flex items-baseline gap-2">
              <dt className="sr-only">Writeups publicados</dt>
              <dd>
                <span className="text-foreground font-semibold">{blogPosts.length}</span> writeups
              </dd>
            </div>
            <span aria-hidden="true" className="h-4 w-px bg-border" />
            <div className="flex items-baseline gap-2">
              <dt className="sr-only">Projetos open-source</dt>
              <dd>
                <span className="text-foreground font-semibold">{projects.length}</span> projetos
              </dd>
            </div>
            <span aria-hidden="true" className="h-4 w-px bg-border" />
            <div className="flex items-baseline gap-2">
              <dt className="sr-only">Plataformas</dt>
              <dd>THM &amp; HTB</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-fade-in stagger-6">
        <span className="font-mono text-xs text-muted-foreground">scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
