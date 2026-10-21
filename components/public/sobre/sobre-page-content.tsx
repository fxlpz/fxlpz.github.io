"use client"

import { Shield, Server, Terminal } from "lucide-react"

const facts = [
  { label: "Base", value: "Jundiaí, SP, Brasil" },
  { label: "Formação", value: "Segurança da Informação · PUC Minas" },
  { label: "Certificação", value: "DCPT (Desec) em andamento" },
  { label: "Idiomas", value: "Português (nativo) · Inglês (técnico)" },
]

const skillsList = [
  {
    category: "Segurança Ofensiva",
    icon: Shield,
    items: [
      "Pentest Web (OWASP Top 10)",
      "Recon avançado & OSINT",
      "Análise de JWT & API Security",
      "Identificação de IDOR / SSRF",
      "Exploração controlada & PoC",
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
  "Amass", "SQLMap", "Metasploit", "Wireshark", "Docker",
]

const languages = [
  "Python (exploits/automação)", "GoLang", "Java (Spring Boot)",
  "React.js", "Shell Script", "SQL",
]

export function SobrePageContent() {
  return (
    <section className="px-4 sm:px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 max-w-3xl sm:mb-16">
          <p className="mb-3 text-sm text-muted-foreground">Perfil profissional</p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Sobre o analista
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Hacker ético e programador. Venho do desenvolvimento full-stack e do suporte a infraestrutura — por isso
            analiso aplicações entendendo como elas foram construídas, indo além do que os scanners automáticos enxergam.
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div className="min-w-0 space-y-10">
            <div className="space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                Minha atuação em segurança ofensiva é fundamentada em{" "}
                <strong className="font-semibold text-foreground">3+ anos de desenvolvimento Full Stack (Java/React)</strong>{" "}
                e suporte N2. Essa transição me confere uma vantagem crucial na análise de vulnerabilidades lógicas e
                revisão de código-fonte: eu entendo como a aplicação foi estruturada do outro lado.
              </p>
              <p>
                Formado em{" "}
                <strong className="font-semibold text-foreground">Segurança da Informação pela PUC Minas</strong> e com a
                certificação prática{" "}
                <strong className="font-semibold text-foreground">DCPT (Desec Certified Penetration Tester)</strong> em
                andamento, combino teoria avançada com aplicação contínua em programas reais na{" "}
                <strong className="font-semibold text-foreground">HackerOne</strong> e no desenvolvimento de scripts de
                automação ofensiva em Python e Go.
              </p>
            </div>

            <div>
              <h2 className="mb-6 border-b border-border/50 pb-3 font-display text-2xl font-semibold tracking-tight">Arsenal</h2>
              <div className="space-y-8">
                {skillsList.map((skill) => (
                  <div key={skill.category} className="border-t border-border/50 pt-6">
                    <h3 className="mb-4 flex items-center gap-2 font-medium text-foreground">
                      <skill.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                      {skill.category}
                    </h3>
                    <ul className="grid gap-x-8 gap-y-2 font-mono text-sm text-muted-foreground sm:grid-cols-2">
                      {skill.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className="border-t border-border/50 pt-6">
                  <h3 className="mb-4 flex items-center gap-2 font-medium text-foreground">
                    <Terminal className="h-4 w-4 text-primary" aria-hidden="true" />
                    Linguagens &amp; scripts
                  </h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm text-muted-foreground">
                    {languages.map((lang) => (
                      <span key={lang}>{lang}</span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border/50 pt-6">
                  <h3 className="mb-4 font-medium text-foreground">Ferramentas operacionais</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm text-muted-foreground">
                    {tools.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:border-l lg:border-border/50 lg:pl-10">
            <dl className="border-t border-border/50 pt-2 lg:sticky lg:top-24">
              {facts.map((fact) => (
                <div key={fact.label} className="border-b border-border/30 pb-4">
                  <dt className="font-mono text-xs text-muted-foreground">{fact.label}</dt>
                  <dd className="mt-1 text-sm text-foreground">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  )
}
