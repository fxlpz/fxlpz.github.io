"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Calendar, Tag, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const notes = [
  {
    id: 1,
    title: "Criando uma distribuição Linux do zero",
    excerpt:
      "Aprendizados ao compilar o kernel, configurar o BusyBox e criar imagens ISO inicializáveis com o Syslinux. Um mergulho nos fundamentos dos sistemas operacionais.",
    content:
      "Guia completo para criar uma distribuição Linux mínima, incluindo a compilação do kernel, a configuração do initramfs e do carregador de inicialização.",
    date: "nov. de 2025",
    category: "systems",
    tags: ["Linux", "Terminal", "Docker"],
    readTime: "12 min",
  },
  {
    id: 2,
    title: "Protocolo MCP em aplicações com LLMs",
    excerpt:
      "Implementação do Model Context Protocol para integrar modelos de IA a bancos de dados vetoriais em aplicações RAG. Uma exploração das possibilidades de comunicação entre agentes de IA.",
    content: "Um mergulho na implementação do protocolo MCP e em sua integração com aplicações que usam modelos de linguagem e recuperação aumentada por geração.",
    date: "abr. de 2025",
    category: "ai",
    tags: ["IA", "MCP", "RAG", "LangChain"],
    readTime: "8 min",
  },
  {
    id: 3,
    title: "Next.js 16 + Tailwind v4",
    excerpt:
      "Exploração dos novos recursos do Next.js 16 e migração para o novo sistema de configuração do Tailwind CSS v4, com foco em desempenho e experiência de desenvolvimento.",
    content: "Visão geral dos novos recursos e dos principais passos para migrar a configuração do projeto.",
    date: "dez. de 2024",
    category: "frontend",
    tags: ["Next.js", "Tailwind", "TypeScript"],
    readTime: "6 min",
  },
  {
    id: 4,
    title: "Hospedando LLMs com FastAPI",
    excerpt:
      "Execução local do Llama 2 e criação de uma API pessoal de chatbot para tarefas de linguagem natural. Um guia de configuração com conteinerização usando Docker.",
    content: "Guia passo a passo para hospedar modelos de linguagem localmente e disponibilizá-los por meio de uma API com FastAPI.",
    date: "out. de 2023",
    category: "ai",
    tags: ["Python", "FastAPI", "Llama 2", "Docker"],
    readTime: "10 min",
  },
  {
    id: 5,
    title: "Builds multi-stage do Docker para Next.js",
    excerpt:
      "Otimização do tamanho das imagens e do tempo de build com etapas múltiplas no Docker. Configurações prontas para produção em aplicações Next.js.",
    content: "Técnicas para otimizar imagens Docker e organizar etapas de build em aplicações Next.js.",
    date: "set. de 2023",
    category: "devops",
    tags: ["Docker", "Next.js", "Integração e entrega contínuas"],
    readTime: "7 min",
  },
  {
    id: 6,
    title: "Um mergulho nos React Server Components",
    excerpt:
      "Entenda a mudança de paradigma dos RSCs: como os componentes de servidor transformam a busca de dados e podem melhorar o desempenho.",
    content: "Guia sobre React Server Components e seus efeitos na arquitetura e na busca de dados em aplicações React.",
    date: "ago. de 2023",
    category: "frontend",
    tags: ["React", "Componentes de servidor", "Next.js"],
    readTime: "9 min",
  },
]

const categories = ["all", "frontend", "ai", "systems", "devops"]
const allTags = [...new Set(notes.flatMap((n) => n.tags))]

export function NotesPageContent() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [expandedNote, setExpandedNote] = useState<number | null>(null)

  const filteredNotes = notes.filter((n) => {
    const matchesCategory = activeCategory === "all" || n.category === activeCategory
    const matchesSearch =
      searchQuery === "" ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => n.tags.includes(tag))
    return matchesCategory && matchesSearch && matchesTags
  })

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const categoryLabels: Record<string, string> = {
    all: "Todas",
    frontend: "Desenvolvimento web",
    ai: "Inteligência artificial",
    systems: "Sistemas",
    devops: "DevOps",
  }

  return (
    <section className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 max-w-3xl border-b border-border pb-8 sm:mb-16 sm:pb-10">
          <p className="mb-4 text-sm font-medium text-primary">Caderno de anotações</p>
          <h1 className="mb-5 text-4xl font-semibold tracking-tight sm:text-5xl">Notas de laboratório</h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Observações breves, descobertas técnicas e ideias registradas durante o trabalho. Um percurso de aprendizado documentado.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14">
          <aside className="space-y-8">
            <div className="relative">
              <Search aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar notas..."
                aria-label="Buscar notas"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 border-b border-border bg-transparent pl-10 shadow-none focus-visible:border-primary focus-visible:ring-0"
              />
            </div>

            <div>
              <h2 className="mb-3 border-b border-border pb-2 text-sm font-semibold">Categorias</h2>
              <div className="flex flex-wrap gap-x-2 gap-y-1 lg:flex-col lg:gap-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={activeCategory === category}
                    className={cn(
                      "border-l-2 px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      activeCategory === category
                        ? "border-primary font-medium text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {categoryLabels[category]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-3 flex items-center gap-2 border-b border-border pb-2 text-sm font-semibold">
                <Tag aria-hidden="true" className="h-3.5 w-3.5 text-primary" />
                Marcadores
              </h2>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    aria-pressed={selectedTags.includes(tag)}
                    className={cn(
                      "rounded-sm border px-2 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      selectedTags.includes(tag)
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <div className="divide-y divide-border border-y border-border">
              {filteredNotes.map((note) => (
                <article
                  key={note.id}
                  className={cn(
                    "py-6 sm:py-8",
                    expandedNote === note.id && "border-l-2 border-primary pl-4 sm:pl-6",
                  )}
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-muted-foreground">
                    <span className="text-primary">{categoryLabels[note.category]}</span>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar aria-hidden="true" className="h-3.5 w-3.5" />
                        {note.date}
                      </span>
                      <span>{note.readTime}</span>
                    </div>
                  </div>
                  <h2 className="mb-2 text-xl font-semibold tracking-tight sm:text-2xl">
                    <button
                      type="button"
                      aria-expanded={expandedNote === note.id}
                      aria-controls={`note-content-${note.id}`}
                      onClick={() => setExpandedNote(expandedNote === note.id ? null : note.id)}
                      className="rounded-sm text-left underline-offset-4 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      {note.title}
                    </button>
                  </h2>
                  <p className="mb-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">{note.excerpt}</p>
                  <p
                    id={`note-content-${note.id}`}
                    hidden={expandedNote !== note.id}
                    className="mb-5 max-w-3xl border-l border-primary/40 pl-4 leading-relaxed text-foreground/80"
                  >
                    {note.content}
                  </p>
                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    {note.tags.map((tag) => (
                      <span key={tag} className="text-xs text-muted-foreground">#{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            {filteredNotes.length === 0 && (
              <div className="border-b border-border py-12">
                <p className="text-sm text-muted-foreground">Nenhuma nota corresponde aos filtros selecionados.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
