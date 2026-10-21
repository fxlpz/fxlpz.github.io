export default function Loading() {
  return (
    <main aria-busy="true" aria-label="Carregando o blog" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <p role="status" className="sr-only">Carregando o blog…</p>
      <div aria-hidden="true">
        <header className="mb-12 border-b border-border pb-8 sm:mb-14 sm:pb-10">
          <div className="mb-5 h-3 w-28 bg-muted" />
          <div className="mb-5 h-11 w-64 max-w-full bg-muted sm:h-14" />
          <div className="h-4 w-full max-w-xl bg-muted" />
        </header>
        <section className="mb-12 border-b border-border pb-8 sm:mb-14 sm:pb-10">
          <div className="mb-6 h-3 w-32 bg-muted" />
          <div className="mb-4 h-8 w-3/4 max-w-2xl bg-muted" />
          <div className="space-y-3">
            <div className="h-4 w-full max-w-3xl bg-muted" />
            <div className="h-4 w-5/6 max-w-3xl bg-muted" />
          </div>
        </section>
        <div className="divide-y divide-border border-y border-border">
          {[...Array(5)].map((_, i) => (
            <article key={i} className="space-y-4 py-6 sm:py-8">
              <div className="h-3 w-32 bg-muted" />
              <div className="h-6 w-3/4 max-w-xl bg-muted" />
              <div className="h-4 w-full max-w-3xl bg-muted" />
              <div className="h-4 w-5/6 max-w-3xl bg-muted" />
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
