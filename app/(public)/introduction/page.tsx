import { Code2, Layers, FileText, Zap, Bot, Globe } from "lucide-react";

export default function IntroductionPage() {
  return (
    <main className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <header className="border-b border-border pb-10 sm:pb-14">
          <p className="mb-4 text-sm font-medium text-primary">Bem-vindo à FXLPZ</p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Onde tecnologia encontra criatividade
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            A FXLPZ é uma oficina digital e plataforma de portfólio para desenvolvedores que acreditam em construir em público. Um espaço onde ideias ganham forma, experimentos se desenvolvem e projetos de código aberto ganham vida.
          </p>
        </header>

        <section className="grid gap-8 border-b border-border py-12 sm:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] sm:gap-16 sm:py-16">
          <div>
            <p className="mb-3 text-sm font-medium text-primary">Sobre a plataforma</p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Uma oficina digital para desenvolvedores</h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              A FXLPZ não é apenas mais um site de portfólio: é uma vitrine viva de aprendizado contínuo e experimentação. Feita por desenvolvedores para desenvolvedores, representa a ideia de que a melhor forma de aprender é construir, compartilhar e iterar.
            </p>
            <p>
              Seja para explorar integrações atuais de IA, mergulhar em programação de sistemas ou encontrar padrões modernos de desenvolvimento web, a FXLPZ oferece uma janela para projetos reais em diferentes etapas — dos experimentos iniciais a soluções prontas para produção.
            </p>
            <p>
              A plataforma é totalmente de código aberto e incentiva a colaboração e a troca de conhecimento na comunidade de desenvolvimento. Cada projeto, nota de laboratório e linha de código busca inspirar e ensinar.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-sm font-medium text-primary">Recursos da plataforma</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Feita para o desenvolvimento moderno</h2>
          </div>

          <div className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Code2,
                title: "Projetos de código aberto",
                description:
                  "Cada projeto está disponível no GitHub para aprendizado e colaboração. Processo de desenvolvimento transparente, do início ao fim.",
              },
              {
                icon: Layers,
                title: "Bancada de desenvolvimento",
                description:
                  "Um espaço dedicado a experimentos e protótipos em andamento. Acompanhe as ideias desde o conceito até a implementação.",
              },
              {
                icon: FileText,
                title: "Notas de laboratório",
                description:
                  "Documentação detalhada de jornadas de aprendizado, descobertas técnicas e padrões de desenvolvimento encontrados pelo caminho.",
              },
              {
                icon: Zap,
                title: "Tecnologias modernas",
                description:
                  "Construída com tecnologias atuais, incluindo Next.js, React, TypeScript e Tailwind CSS, para oferecer bom desempenho.",
              },
              {
                icon: Bot,
                title: "Integração com IA",
                description:
                  "Explora a interseção entre IA e desenvolvimento web por meio de implementações práticas e usos do mundo real.",
              },
              {
                icon: Globe,
                title: "Localização",
                description:
                  "Suporte a vários idiomas com integração i18n, tornando os projetos acessíveis a uma comunidade global de desenvolvedores.",
              },
            ].map((feature) => (
              <article key={feature.title} className="border-b border-border py-6 sm:px-5 sm:py-7 [&:nth-child(odd)]:sm:pl-0 [&:nth-child(even)]:sm:border-l [&:nth-child(even)]:sm:pl-6 lg:[&:nth-child(3n+1)]:pl-0 lg:[&:nth-child(3n+2)]:border-l lg:[&:nth-child(3n+2)]:pl-6 lg:[&:nth-child(3n)]:border-l lg:[&:nth-child(3n)]:pl-6">
                <feature.icon aria-hidden="true" className="mb-4 h-5 w-5 text-primary" />
                <h3 className="mb-2 text-base font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
