export default function Loading() {
  return (
    <main aria-busy="true" aria-label="Carregando o artigo" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <p role="status" className="sr-only">Carregando o artigo…</p>
      <article aria-hidden="true" className="mx-auto max-w-3xl">
        <header className="mb-10 border-b border-border pb-8 sm:mb-12 sm:pb-10">
          <div className="mb-5 h-3 w-28 bg-muted" />
          <div className="mb-6 h-10 w-3/4 max-w-2xl bg-muted sm:h-12" />
          <div className="mb-6 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-muted" />
            <div className="space-y-2">
              <div className="h-3 w-32 bg-muted" />
              <div className="h-3 w-44 bg-muted" />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="h-4 w-16 bg-muted" />
            <div className="h-4 w-20 bg-muted" />
            <div className="h-4 w-16 bg-muted" />
          </div>
        </header>
        <div className="space-y-4 border-b border-border pb-10 sm:pb-12">
          <div className="h-4 w-full bg-muted" />
          <div className="h-4 w-full bg-muted" />
          <div className="h-4 w-5/6 bg-muted" />
          <div className="h-7 w-1/2 bg-muted pt-2" />
          <div className="h-4 w-full bg-muted" />
          <div className="h-4 w-full bg-muted" />
          <div className="h-4 w-4/5 bg-muted" />
          <div className="my-7 h-28 w-full bg-muted" />
          <div className="h-4 w-full bg-muted" />
          <div className="h-4 w-full bg-muted" />
          <div className="h-4 w-3/4 bg-muted" />
        </div>
      </article>
    </main>
  )
}
