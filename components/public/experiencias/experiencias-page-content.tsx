"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Shield, Briefcase, Award, Clock, ArrowUpRight, GraduationCap } from "lucide-react"

const experiences = [
  {
    id: 0,
    company: "Mitutoyo Sul Americana",
    role: "Estagiário de Suporte de Informática",
    period: "Março 2025 · Março 2026",
    description: [
      "Suporte de nível 1 e 2 para mais de 50 usuários corporativos, garantindo a continuidade do negócio.",
      "Redução de 63% no TMA (Tempo Médio de Atendimento) por meio de documentação técnica detalhada no ITSM.",
      "Administração de sistemas Windows, infraestrutura Active Directory e Troubleshooting de rede.",
    ],
    tech: ["ITSM", "Windows Active Directory", "Networking", "Troubleshooting"],
  },
  {
    id: 1,
    company: "FUMAS (Fundação Municipal de Ação Social)",
    role: "Estagiário de Suporte",
    period: "Fevereiro 2024 · Março 2025",
    description: [
      "Administração de roteadores/switches Cisco, gerenciamento de firewall Check Point e switches de rede local.",
      "Garantia de segurança e integridade de dados por meio de políticas de controle de acesso de rede interna.",
      "Suporte a usuários de infraestrutura de rede e sistemas operacionais Windows Server.",
    ],
    tech: ["Cisco IOS", "Check Point Firewall", "TCP/IP", "Windows Server"],
  },
  {
    id: 2,
    company: "SAM (Sistema de Atendimento Médico)",
    role: "Desenvolvedor Full Stack",
    period: "Janeiro 2023 · Janeiro 2024",
    description: [
      "Desenvolvimento de APIs RESTful utilizando Java (Spring Boot) e criação de interfaces em React.js.",
      "Otimização de processos administrativos usando scripts de automação em Python, reduzindo o tempo de processamento manual em 40%.",
      "Modelagem e manutenção de bancos de dados relacionais e otimização de consultas SQL.",
    ],
    tech: ["Java", "Spring Boot", "React.js", "Python", "SQL"],
  },
]

const certifications = [
  {
    name: "DCPT · Desec Certified Penetration Tester",
    issuer: "Desec Security",
    status: "in-progress",
    year: "2026",
    link: "https://desecsecurity.com/",
  },
  {
    name: "Pentest na Prática",
    issuer: "Desec Security",
    status: "concluded",
    year: "2025",
    link: "https://desecsecurity.com/",
  },
  {
    name: "Segurança em Linux",
    issuer: "IBSEC",
    status: "concluded",
    year: "2025",
    link: "https://ibsec.com.br/",
  },
  {
    name: "Google Hacking OffSec",
    issuer: "XPSec Security",
    status: "concluded",
    year: "2024",
  },
  {
    name: "Santander Cibersegurança Bootcamp",
    issuer: "Santander / DIO",
    status: "concluded",
    year: "2024",
  },
]

const education = {
  degree: "Tecnólogo em Segurança da Informação",
  institution: "PUC Minas",
  period: "Até Julho 2026",
}

export function ExperienciasPageContent() {
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
            Curriculum
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Experiências & Certificações
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Minha trajetória profissional em cibersegurança, suporte de infraestrutura e desenvolvimento full-stack, além de conquistas acadêmicas e certificações técnicas.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.8fr_1fr]">
          {/* Work Experience */}
          <div className="space-y-8">
            <h2 className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-primary mb-6">
              <Briefcase className="h-4 w-4" />
              Histórico Profissional
            </h2>

            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className={cn(
                    "group relative overflow-hidden rounded-xl border border-border bg-card/40 p-6 sm:p-7 glass transition-all duration-300 hover:border-primary/30 opacity-0",
                    isVisible && "animate-fade-in-up"
                  )}
                  style={{ animationDelay: `${index * 80 + 200}ms` }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-semibold text-lg sm:text-xl text-foreground group-hover:text-gradient">
                        {exp.role}
                      </h3>
                      <p className="font-mono text-sm text-primary">{exp.company}</p>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground flex items-center gap-1.5 sm:text-right">
                      <Clock className="h-3.5 w-3.5" />
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2.5 mb-6 text-sm text-muted-foreground list-disc pl-4 marker:text-primary">
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border bg-secondary/50 px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certs & Education */}
          <div className="space-y-10">
            {/* Certifications */}
            <div>
              <h2 className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-primary mb-6">
                <Award className="h-4 w-4" />
                Certificações
              </h2>

              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className={cn(
                      "group flex items-center justify-between p-4 rounded-xl border border-border bg-card/30 glass transition-all hover:border-primary/20 opacity-0",
                      isVisible && "animate-fade-in-up"
                    )}
                    style={{ animationDelay: `${index * 60 + 400}ms` }}
                  >
                    <div className="space-y-1 min-w-0">
                      <h4 className="font-medium text-sm text-foreground truncate">{cert.name}</h4>
                      <p className="font-mono text-[11px] text-muted-foreground">{cert.issuer}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      {cert.status === "in-progress" ? (
                        <span className="rounded-full bg-yellow-500/10 border border-yellow-500/30 px-2.5 py-0.5 font-mono text-[10px] text-yellow-500 animate-pulse">
                          curtindo
                        </span>
                      ) : (
                        <span className="rounded-full bg-primary/10 border border-primary/30 px-2.5 py-0.5 font-mono text-[10px] text-primary">
                          {cert.year}
                        </span>
                      )}
                      {"link" in cert && cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground/50 hover:text-primary transition-colors"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-primary mb-6">
                <GraduationCap className="h-4 w-4" />
                Educação
              </h2>

              <div
                className={cn(
                  "p-5 rounded-xl border border-border bg-card/30 glass opacity-0",
                  isVisible && "animate-fade-in-up"
                )}
                style={{ animationDelay: "700ms" }}
              >
                <h4 className="font-semibold text-foreground">{education.degree}</h4>
                <p className="font-mono text-sm text-primary mb-3">{education.institution}</p>
                <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{education.period}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
