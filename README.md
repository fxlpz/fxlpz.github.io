# FXLPZ · SEC

Portfolio e blog pessoal de segurança ofensiva desenvolvido com Next.js 16 (App Router), React 19, TypeScript e Tailwind CSS v4, otimizado para exportação estática no GitHub Pages.

## O que é este projeto

É o laboratório digital e centralizador de writeups, exploits e projetos open-source de **Felipe da Silva Rosa**, especialista em segurança ofensiva e desenvolvimento.

- **Sobre o Analista**: Trajetória profissional, acadêmica e arsenal técnico (ferramentas e linguagens).
- **Projetos**: Repositórios reais integrados (GoGuard-SIEM, VoidScope, Python NIDS, etc.).
- **Blog & Writeups**: Guias de exploração detalhados e writeups de máquinas (Mr. Robot, Attacktive Directory, etc.) renderizados dinamicamente a partir de um parser Markdown personalizado.

## Stack Técnica

- **Framework**: Next.js 16.1.0 (Static Export)
- **Biblioteca**: React 19
- **Estilização**: Tailwind CSS v4 + Tailwind Animate
- **Ícones**: Lucide React
- **Gerenciador**: pnpm

## Como executar localmente

### Pré-requisitos

- Node.js v18 ou superior
- pnpm instalado globalmente (`npm install -g pnpm`)

### Início Rápido

1. Clone o repositório:
```bash
git clone git@github.com:fxlpz/fxlpz.github.io.git
cd fxlpz.github.io
```

2. Instale as dependências:
```bash
pnpm install
```

3. Aprove os scripts de compilação necessários do Tailwind/PostCSS se o pnpm solicitar:
```bash
pnpm approve-builds
```

4. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

Acesse em `http://localhost:3000`.

## Scripts Disponíveis

- `pnpm dev` — Executa o servidor de desenvolvimento (`next dev`).
- `pnpm build` — Compila a aplicação e gera a exportação estática na pasta `/out/` (`next build`).
- `pnpm lint` — Executa a análise estática com o ESLint.

## Deploy

O deploy é feito de forma totalmente automática no **GitHub Pages** por meio do GitHub Actions configurado em `.github/workflows/deploy.yml` a cada push na branch `main`.

---

## Contato e Redes

- **GitHub**: [fxlpz](https://github.com/fxlpz)
- **LinkedIn**: [Felipe Rosa](https://www.linkedin.com/in/felipe0x01/)
- **X / Twitter**: [@FelipeBuffer](https://x.com/FelipeBuffer)
- **TryHackMe**: [Fxplz](https://tryhackme.com/p/Fxplz)
- **HackTheBox**: [2483868](https://app.hackthebox.com/users/2483868)
- **Email**: felipe.rosa.secdev@gmail.com
