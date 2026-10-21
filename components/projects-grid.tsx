import { cn } from "@/lib/utils"
import { ArrowUpRight, Github } from "lucide-react"

export const projects = [
  {
    id: 0,
    title: "GoGuard-SIEM",
    description:
      "Engine de ingestão de logs SIEM concorrente de alta performance construída em Go com gRPC, streaming TLS, worker pools e métricas Prometheus.",
    tags: ["Go", "gRPC", "TLS", "Prometheus", "SIEM"],
    status: "in-progress",
    year: "2026",
    url: "https://github.com/fxlpz/GoGuard-SIEM",
    featured: true,
  },
  {
    id: 1,
    title: "VoidScope",
    description:
      "Canivete suíço para Reconhecimento Moderno. Unifica varreduras e utilitários de análise de superfície de ataque em um único executável de alta velocidade.",
    tags: ["Go", "Recon", "Pentest", "OSINT"],
    status: "shipped",
    year: "2026",
    url: "https://github.com/fxlpz/VoidScope",
    featured: false,
  },
  {
    id: 2,
    title: "Python IDS Framework",
    description:
      "Sistema de Detecção de Intrusão em Rede (NIDS) baseado em regras, desenvolvido em Python utilizando a biblioteca Scapy para inspeção profunda de pacotes.",
    tags: ["Python", "Scapy", "NIDS", "Packets"],
    status: "shipped",
    year: "2025",
    url: "https://github.com/fxlpz/python-ids-framework",
    featured: false,
  },
  {
    id: 3,
    title: "Ransomware Analysis Toolkit",
    description:
      "Toolkit educacional de análise de malware cobrindo criptografia híbrida RSA-4096 + AES-256-GCM e PBKDF2 para pesquisa em cibersegurança.",
    tags: ["Python", "Cryptography", "Malware Analysis"],
    status: "shipped",
    year: "2025",
    url: "https://github.com/fxlpz/ransomware-analysis-toolkit",
    featured: false,
  },
  {
    id: 4,
    title: "CASDE",
    description:
      "Ferramenta de monitoramento contínuo de superfície de ataque. Funciona como um 'git' para dados de reconhecimento e mudança de escopo.",
    tags: ["Go", "ASM", "Recon"],
    status: "in-progress",
    year: "2026",
    url: "https://github.com/fxlpz/casde",
    featured: false,
  },
  {
    id: 5,
    title: "Security Scan Dashboard",
    description:
      "Painel de controle centralizador em Java que agrega e normaliza relatórios vindo de múltiplas ferramentas de varredura e segurança.",
    tags: ["Java", "Dashboard", "AppSec"],
    status: "shipped",
    year: "2025",
    url: "https://github.com/fxlpz/security-dashboard",
    featured: false,
  },
]

export const statusLabel: Record<string, string> = {
  shipped: "publicado",
  "in-progress": "em desenvolvimento",
  archived: "arquivado",
}

export function ProjectsGrid() {
  return (
    <section id="projects" className="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-14">
          <p className="mb-3 font-mono text-xs text-primary">Repositórios</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Projetos open-source</h2>
        </div>

        <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li
              key={project.id}
              className={cn(
                "group relative flex flex-col border-b border-border/70 py-6 transition-colors duration-300 hover:border-primary/50 sm:py-7",
                project.featured && "project-featured border border-primary/30 p-6 sm:p-8 lg:col-span-2 lg:grid lg:grid-cols-[1fr_auto] lg:gap-x-10",
              )}
            >
              <div className="mb-5 flex items-center justify-between font-mono text-xs text-muted-foreground lg:col-span-2">
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      project.status === "shipped" ? "bg-primary" : "bg-muted-foreground",
                    )}
                  />
                  {statusLabel[project.status]}
                </span>
                <span>{project.year}</span>
              </div>

              <h3 className={cn("font-display font-semibold tracking-tight transition-colors group-hover:text-primary", project.featured ? "text-2xl sm:text-3xl" : "text-lg")}>
                {project.title}
              </h3>
              <p className={cn("mt-3 flex-1 text-sm leading-relaxed text-muted-foreground", project.featured && "max-w-2xl lg:col-start-1")}>{project.description}</p>

              <div className={cn("mt-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground", project.featured && "lg:col-start-1")}>
                {project.tags.map((tag) => (
                  <span key={tag}>#{tag.toLowerCase().replace(/\s+/g, "-")}</span>
                ))}
              </div>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("mt-6 inline-flex w-fit items-center gap-2 text-sm text-foreground after:absolute after:inset-0 after:content-['']", project.featured && "lg:col-start-2 lg:row-start-2 lg:row-span-2 lg:self-end")}
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                <span>Ver no GitHub</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
