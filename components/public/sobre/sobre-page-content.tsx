"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Shield, Server, Terminal, Cpu, Info, CheckCircle2 } from "lucide-react"

const stats = [
  { label: "Status", value: "Active / OffSec", active: true },
  { label: "HackerOne Rep", value: "Active Program" },
  { label: "TMA Support", value: "-63% Reduction" },
  { label: "Automation", value: "40% Optimized" },
]

const skillsList = [
  {
    category: "Segurança Ofensiva",
    icon: Shield,
    items: [
      "Pentest Web (OWASP Top 10)",
      "Recon Avançado & OSINT",
      "Análise de JWT & API Security",
      "Identificação de IDOR / SSRF",
      "Exploração Controlada & PoC",
    ],
  },
  {
    category: "Infraestrutura & Redes",
    icon: Server,
    items: [
      "Linux (Debian / Arch / RHEL)",
      "Windows Server / Active Directory",
      "Docker / Containerization",
      "TCP/IP & Firewall Check Point",
      "Fundamentos Cisco & Routing",
    ],
  },
]

const tools = [
  "Kali Linux", "Burp Suite", "Nmap", "Ffuf", "Subfinder",
  "Amass", "SQLMap", "Metasploit", "Wireshark", "Docker"
]

const languages = [
  "Python (Exploits/Automação)", "GoLang", "Java (Spring Boot)",
  "React.js", "Shell Script", "SQL"
]

export function SobrePageContent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="px-4 sm:px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className={cn("mb-12 sm:mb-16 space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">
            Identity & Arsenal
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Sobre o Analista
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Hacker ético, programador e especialista em segurança defensiva/ofensiva. Uma fusão de bagagem de desenvolvimento full-stack com táticas de invasão web.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.8fr_1fr] items-start mb-16 w-full min-w-0">
          {/* Left - Story & Metadata */}
          <div className="space-y-8 w-full min-w-0 overflow-hidden">
            <div
              className={cn(
                "space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed opacity-0 w-full",
                isVisible && "animate-fade-in-up"
              )}
              style={{ animationDelay: "150ms" }}
            >
              <p>
                Minha atuação em segurança ofensiva é fundamentada em uma sólida bagagem de{" "}
                <strong className="text-foreground font-semibold">3+ anos de desenvolvimento Full Stack (Java/React)</strong> e suporte N2. Essa transição me confere uma vantagem crucial na análise de vulnerabilidades lógicas e revisão de código-fonte: eu entendo como a aplicação foi estruturada do outro lado, permitindo ir além das assinaturas de scanners automáticos.
              </p>
              <p>
                Formado em <strong className="text-foreground font-semibold">Segurança da Informação pela PUC Minas</strong> e com a certificação prática{" "}
                <strong className="text-foreground font-semibold">DCPT (Desec Certified Penetration Tester)</strong> em andamento, combino teoria avançada com aplicação contínua em projetos reais através da plataforma <strong className="text-foreground font-semibold">HackerOne</strong> e da criação de scripts de automação ofensiva em Python e GoLang.
              </p>
            </div>

            {/* Terminal Metadata */}
            <div
              className={cn(
                "rounded-xl border border-border bg-card/40 glass backdrop-blur-sm overflow-hidden opacity-0 w-full max-w-full min-w-0",
                isVisible && "animate-scale-in"
              )}
              style={{ animationDelay: "300ms" }}
            >
              <div className="flex items-center gap-2 border-b border-border/50 bg-secondary/40 px-4 py-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-primary/60" />
                <span className="ml-3 font-mono text-[11px] text-muted-foreground">metadata.json</span>
              </div>
              <pre className="p-4 sm:p-5 font-mono text-xs text-primary/80 overflow-x-auto select-all leading-relaxed max-w-full w-full">
                {`{
  "name": "Felipe da Silva Rosa",
  "location": "Jundiaí, SP, Brasil",
  "degree": "B.S. Information Security (PUC Minas)",
  "languages": ["Português (Native)", "Inglês (Tech Document/Report Write-up)"]
}`}
              </pre>
            </div>
          </div>

          {/* Right - Stats Card */}
          <div
            className={cn(
              "rounded-xl border border-border bg-card/40 p-6 glass opacity-0",
              isVisible && "animate-fade-in-up"
            )}
            style={{ animationDelay: "200ms" }}
          >
            <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-3 mb-5">
              <Terminal className="h-4 w-4 text-primary" />
              Estatísticas Gerais
            </h3>
            <ul className="space-y-4 font-mono text-xs">
              {stats.map((stat, i) => (
                <li key={i} className="flex items-center justify-between border-b border-border/20 pb-2">
                  <span className="text-muted-foreground">{stat.label}:</span>
                  {stat.active ? (
                    <span className="text-primary flex items-center gap-1.5 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      {stat.value}
                    </span>
                  ) : (
                    <span className="text-foreground font-semibold">{stat.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="border-t border-border/30 pt-16">
          <div className="mb-10 space-y-3">
            <h2 className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-primary">
              <Cpu className="h-4 w-4" />
              Arsenal Tecnológico
            </h2>
            <p className="max-w-xl text-sm text-muted-foreground">
              Habilidades consolidadas e stack utilizada em investigações ofensivas e desenvolvimento de exploits.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
            {skillsList.map((skill, index) => (
              <div
                key={index}
                className={cn(
                  "p-6 rounded-xl border border-border bg-card/30 glass space-y-4 opacity-0",
                  isVisible && "animate-fade-in-up"
                )}
                style={{ animationDelay: `${index * 80 + 400}ms` }}
              >
                <h3 className="font-semibold text-foreground flex items-center gap-2 border-b border-border/40 pb-2">
                  <skill.icon className="h-4 w-4 text-primary" />
                  {skill.category}
                </h3>
                <ul className="space-y-2 text-xs font-mono text-muted-foreground">
                  {skill.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-primary">&gt;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Languages & Scripts */}
            <div
              className={cn(
                "p-6 rounded-xl border border-border bg-card/30 glass space-y-4 opacity-0",
                isVisible && "animate-fade-in-up"
              )}
              style={{ animationDelay: "560ms" }}
            >
              <h3 className="font-semibold text-foreground flex items-center gap-2 border-b border-border/40 pb-2">
                <Terminal className="h-4 w-4 text-primary" />
                Linguagens & Scripts
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {languages.map((lang, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded bg-secondary/50 border border-border text-[10px] text-muted-foreground font-mono"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tools Grid Section */}
          <div
            className={cn(
              "p-6 rounded-xl border border-border bg-card/20 glass opacity-0",
              isVisible && "animate-fade-in"
            )}
            style={{ animationDelay: "650ms" }}
          >
            <h3 className="font-semibold text-sm text-foreground flex items-center gap-2 mb-4">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Ferramentas & Softwares Operacionais
            </h3>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1.5 rounded-lg bg-card border border-border text-xs text-muted-foreground font-mono hover:border-primary/40 hover:text-foreground transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
