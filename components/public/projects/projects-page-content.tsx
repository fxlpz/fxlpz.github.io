"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowUpRight, Github, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { projects, statusLabel } from "@/components/projects-grid"

const filters = [
  { value: "all", label: "Todos" },
  { value: "shipped", label: "Publicados" },
  { value: "in-progress", label: "Em desenvolvimento" },
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
        <header className="mb-12 max-w-3xl sm:mb-16">
          <p className="mb-3 text-sm text-muted-foreground">Repositórios</p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Projetos open-source
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Ferramentas de reconhecimento, detecção e análise que nasceram de estudo e de problemas reais.
          </p>
        </header>

        <div className="mb-8 flex flex-col gap-4 border-y border-border/50 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div role="group" aria-label="Filtrar por status" className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                aria-pressed={activeFilter === filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  "rounded-sm border px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
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
                className="border-border/60 bg-transparent pl-10 text-sm focus-visible:ring-ring"
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
                  <div className="flex items-center gap-3 text-sm text-muted-foreground sm:flex-col sm:items-start sm:gap-2">
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          project.status === "shipped" ? "bg-primary" : "bg-chart-4",
                        )}
                      />
                      {statusLabel[project.status]}
                    </span>
                    <span>{project.year}</span>
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-2xl">
                      {project.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
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
                      className="relative z-10 inline-flex min-h-10 items-center gap-2 text-sm font-medium text-foreground after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                      <span>Ver no GitHub</span>
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
