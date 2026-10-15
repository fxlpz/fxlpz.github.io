# OG Images

As imagens Open Graph dos posts (`/og-images/<slug>.png`, 1200x630) são geradas
automaticamente no build pelo route handler `app/og-images/[file]/route.tsx`
usando `next/og`. Não é preciso criar PNGs à mão: para um post novo, a imagem é
gerada sozinha a partir de título, categoria e autor em `lib/blog-data.tsx`.

Para testar localmente: `pnpm build` e abra `out/og-images/<slug>.png`.

Validadores úteis:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [OpenGraph.xyz](https://www.opengraph.xyz/)
