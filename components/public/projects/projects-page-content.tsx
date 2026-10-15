"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowUpRight, Github, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { projects, statusLabel } from "@/components/projects-grid"

const filters = [
  { value: "all", label: "todos" },
  { value: "shipped", label: "publicados" },
  { value: "in-progress", label: "em desenvolvimento" },
]

export function ProjectsPageContent() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const query = searchQuery.trim().toLowerCase()
  const filteredProjects = projects.filter((p) => {
    const matchesFilter = activeFilter === "all" || p.status === activeFilter
    const matchesSearch =
      query === "" ||
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tags.some((tag) => tag.toLowerCase().includes(query))
    return matchesFilter && matchesSearch
  })

  return (
    <section className="px-4 sm:px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 sm:mb-16">
          <p className="mb-3 font-mono text-sm text-muted-foreground">Repositórios</p>
          <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl text-balance">
            Projetos open-source
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
            Ferramentas de reconhecimento, detecção e análise que nasceram de estudo e de problemas reais.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 border-b border-border/50 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div role="group" aria-label="Filtrar por status" className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                aria-pressed={activeFilter === filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  "rounded-md border px-3 py-1.5 font-mono text-xs transition-colors",
                  activeFilter === filter.value
                    ? "border-primary/60 bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              type="search"
              aria-label="Buscar projetos"
              placeholder="Buscar projeto ou tecnologia"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-transparent border-border/60 text-sm"
            />
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <p className="py-20 text-center font-mono text-sm text-muted-foreground">
            Nenhum projeto encontrado com esses filtros.
          </p>
        ) : (
          <ul className="border-t border-border/50">
            {filteredProjects.map((project) => (
              <li key={project.id} className="group relative border-b border-border/50">
                <div className="grid gap-4 py-7 sm:grid-cols-[120px_1fr_auto] sm:gap-10 sm:py-9">
                  <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground sm:flex-col sm:items-start sm:gap-2">
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          project.status === "shipped" ? "bg-primary" : "bg-yellow-500",
                        )}
                      />
                      {statusLabel[project.status]}
                    </span>
                    <span>{project.year}</span>
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-gradient sm:text-3xl">
                      {project.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground">
                      {project.tags.map((tag) => (
                        <span key={tag}>#{tag.toLowerCase().replace(/\s+/g, "-")}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 inline-flex items-center gap-2 text-sm text-foreground after:absolute after:inset-0 after:content-['']"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                      <span>ver no GitHub</span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
