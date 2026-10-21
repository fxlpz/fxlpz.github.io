export function BlogHero() {
  return (
    <section className="px-4 pt-32 pb-12 sm:px-6 sm:pt-40 sm:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 border-b border-border/60 pb-10 sm:gap-12 sm:pb-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div className="max-w-4xl">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Caderno de investigação
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Análises práticas de segurança, laboratórios documentados e notas sobre o que aprendo explorando sistemas.
            </p>
          </div>
          <div className="flex items-end justify-between gap-4 lg:block lg:justify-self-end">
            <p className="max-w-xs border-l-2 border-primary/70 pl-4 text-sm leading-relaxed text-muted-foreground">
              Pesquisa de campo, evidências e aprendizados em segurança digital.
            </p>
            <pre aria-hidden="true" className="shrink-0 font-mono text-[9px] leading-tight text-primary/70 lg:mt-5 lg:ml-4">{`[?]\n/|\\\n/_\\`}</pre>
          </div>
        </div>
      </div>
    </section>
  )
}
