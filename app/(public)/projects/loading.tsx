export default function Loading() {
  return (
    <main aria-busy="true" aria-label="Carregando projetos" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <p role="status" className="sr-only">Carregando projetos…</p>
      <div aria-hidden="true">
        <header className="mb-10 border-b border-border pb-8 sm:mb-12 sm:pb-10">
          <div className="mb-5 h-3 w-28 bg-muted" />
          <div className="mb-5 h-11 w-64 max-w-full bg-muted sm:h-14" />
          <div className="h-4 w-full max-w-xl bg-muted" />
        </header>
        <div className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <article key={i} className="space-y-4 border-b border-border py-6 sm:px-5 sm:py-7 [&:nth-child(odd)]:sm:pl-0 [&:nth-child(even)]:sm:border-l [&:nth-child(even)]:sm:pl-6 lg:[&:nth-child(3n+1)]:pl-0 lg:[&:nth-child(3n+2)]:border-l lg:[&:nth-child(3n+2)]:pl-6 lg:[&:nth-child(3n)]:border-l lg:[&:nth-child(3n)]:pl-6">
              <div className="aspect-[16/9] w-full bg-muted/60" />
              <div className="h-6 w-3/4 bg-muted" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted" />
                <div className="h-4 w-5/6 bg-muted" />
              </div>
              <div className="flex gap-2 pt-1">
                <div className="h-3 w-14 bg-muted" />
                <div className="h-3 w-20 bg-muted" />
                <div className="h-3 w-16 bg-muted" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
