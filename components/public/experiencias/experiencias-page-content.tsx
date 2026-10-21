import { ArrowUpRight, Briefcase, GraduationCap } from "lucide-react"

const experiences = [
  {
    company: "Kernel Solutions",
    role: "Analista de Cibersegurança Pleno",
    period: "Setembro 2026 · Presente",
    description: [
      "Atuação em operações híbridas de cibersegurança (Purple Team), unindo monitoramento defensivo, resposta a incidentes e testes ofensivos controlados.",
      "Execução de testes de invasão (Pentest) e simulações de Red Team para identificar, explorar e documentar vulnerabilidades em aplicações e infraestrutura corporativa.",
      "Monitoramento contínuo e triagem de alertas de segurança utilizando Microsoft Sentinel e Microsoft 365 Defender.",
      "Desenvolvimento de consultas em Kusto Query Language (KQL) para Threat Hunting e validação de logs gerados durante as simulações de ataque.",
      "Atuação estratégica na ponte entre ataque e defesa, auxiliando na remediação de falhas e na criação de regras de detecção mais eficientes.",
    ],
    tech: ["Pentest", "Red Team", "Microsoft Sentinel", "Threat Hunting · KQL", "Resposta a incidentes"],
  },
  {
    company: "Mitutoyo Sul Americana",
    role: "Estagiário de Suporte de Informática",
    period: "Março 2025 · Março 2026",
    description: [
      "Suporte de nível 1 e 2 para mais de 50 usuários corporativos, garantindo a continuidade do negócio.",
      "Redução de 63% no TMA (Tempo Médio de Atendimento) por meio de documentação técnica detalhada no ITSM.",
      "Administração de sistemas Windows, infraestrutura Active Directory e troubleshooting de rede.",
    ],
    tech: ["ITSM", "Windows Active Directory", "Redes", "Troubleshooting"],
  },
  {
    company: "FUMAS · Fundação Municipal de Ação Social",
    role: "Estagiário de Suporte",
    period: "Fevereiro 2024 · Março 2025",
    description: [
      "Administração de roteadores e switches Cisco, gerenciamento de firewall Check Point e rede local.",
      "Garantia de segurança e integridade de dados por meio de políticas de controle de acesso à rede interna.",
      "Suporte a usuários de infraestrutura de rede e sistemas operacionais Windows Server.",
    ],
    tech: ["Cisco IOS", "Check Point Firewall", "TCP/IP", "Windows Server"],
  },
  {
    company: "SAM · Sistema de Atendimento Médico",
    role: "Desenvolvedor Full Stack",
    period: "Janeiro 2023 · Janeiro 2024",
    description: [
      "Desenvolvimento de APIs RESTful utilizando Java (Spring Boot) e criação de interfaces em React.js.",
      "Otimização de processos administrativos usando scripts de automação em Python, reduzindo em 40% o tempo de processamento manual.",
      "Modelagem e manutenção de bancos de dados relacionais e otimização de consultas SQL.",
    ],
    tech: ["Java", "Spring Boot", "React.js", "Python", "SQL"],
  },
]

const certifications = [
  { name: "DCPT · Desec Certified Penetration Tester", issuer: "Desec Security", status: "Em andamento", year: "2026", link: "https://desecsecurity.com/" },
  { name: "Pentest na Prática", issuer: "Desec Security", year: "2025", link: "https://desecsecurity.com/" },
  { name: "Segurança em Linux", issuer: "IBSEC", year: "2025", link: "https://ibsec.com.br/" },
  { name: "Google Hacking OffSec", issuer: "XPSec Security", year: "2024" },
  { name: "Santander Cibersegurança Bootcamp", issuer: "Santander / DIO", year: "2024" },
]

const education = {
  degree: "Tecnólogo em Segurança da Informação",
  institution: "PUC Minas",
  period: "Conclusão prevista: julho de 2026",
}

export function ExperienciasPageContent() {
  return (
    <section className="px-4 sm:px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 max-w-3xl sm:mb-16">
          <p className="mb-3 text-sm text-muted-foreground">Trajetória profissional</p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Experiências &amp; certificações
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Minha trajetória em cibersegurança, suporte de infraestrutura e desenvolvimento full-stack, junto à formação e às certificações técnicas.
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div>
            <h2 className="mb-6 flex items-center gap-2 border-b border-border/50 pb-3 font-display text-2xl font-semibold tracking-tight">
              <Briefcase className="h-5 w-5 text-primary" aria-hidden="true" />
              Histórico profissional
            </h2>
            <ol className="border-l border-border/60">
              {experiences.map((exp) => (
                <li key={exp.company} className="relative border-b border-border/40 py-7 pl-6 first:pt-4 sm:pl-8 sm:py-9">
                  <span className="absolute -left-[4.5px] top-9 h-2 w-2 rounded-full bg-primary ring-4 ring-background" aria-hidden="true" />
                  <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{exp.role}</h3>
                      <p className="mt-1 text-sm text-primary">{exp.company}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{exp.period}</p>
                  </div>
                  <ul className="mb-5 list-disc space-y-2 pl-4 text-sm leading-relaxed text-muted-foreground marker:text-primary sm:text-base">
                    {exp.description.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                    {exp.tech.map((tech) => <span key={tech}>{tech}</span>)}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="space-y-12 lg:border-l lg:border-border/50 lg:pl-10">
            <section>
              <h2 className="mb-6 font-display text-2xl font-semibold">Certificações</h2>
              <ul className="border-t border-border/50">
                {certifications.map((cert) => (
                  <li key={cert.name} className="flex items-center justify-between gap-4 border-b border-border/50 py-4">
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-foreground">{cert.name}</h3>
                      <p className="mt-1 font-mono text-xs text-muted-foreground">{cert.issuer}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3 font-mono text-xs text-muted-foreground">
                      <span className={cert.status ? "text-primary" : ""}>{cert.status ?? cert.year}</span>
                      {cert.link && (
                        <a href={cert.link} target="_blank" rel="noopener noreferrer" aria-label={`Site de ${cert.issuer}`} className="hover:text-primary">
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="mb-6 flex items-center gap-2 border-b border-border/50 pb-3 font-display text-2xl font-semibold tracking-tight">
                <GraduationCap className="h-5 w-5 text-primary" aria-hidden="true" />
                Formação
              </h2>
              <div className="border-t border-border/50 pt-5">
                <h3 className="font-medium text-foreground">{education.degree}</h3>
                <p className="mt-1 text-sm text-primary">{education.institution}</p>
                <p className="mt-3 font-mono text-xs text-muted-foreground">{education.period}</p>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </section>
  )
}
