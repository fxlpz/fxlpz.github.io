# Padrão de Writeup — Estilo Relatório de Pentest

Todo writeup de CTF/máquina neste blog deve seguir o padrão abaixo. Aplique sempre que criar ou revisar um arquivo em `src/content/blog/` com categoria `Machine Write-ups`.

---

## Estrutura obrigatória (nesta ordem)

1. **Frontmatter** — título, description, pubDate, category, tags
2. **Introdução** — contexto da máquina, plataforma, dificuldade, o que será demonstrado
3. **Sumário Executivo** — parágrafo curto: vetor inicial → cadeia de exploração → impacto final (sem flags aqui)
4. **Escopo e Ambiente**
   - Plataforma (TryHackMe / HackTheBox / etc.)
   - IP do alvo
   - Sistema operacional identificado
   - Data do teste (usar `pubDate`)
5. **Metodologia** — seções numeradas cobrindo cada fase:
   - Reconhecimento (Nmap, enumeração de serviços)
   - Enumeração (diretórios, usuários, shares, etc.)
   - Exploração (com contexto: por que essa técnica funciona aqui)
   - Pós-exploração / Escalação de Privilégio
6. **Análise de Risco** — para cada vulnerabilidade encontrada:
   - Nome da vulnerabilidade
   - Severidade (Crítica / Alta / Média / Baixa)
   - Causa raiz
   - Recomendação de remediação
7. **Lições Aprendidas** — o que o atacante explorou, o que o defensor deveria ter feito
8. **Flags / Evidências** — sempre por último, em tabela

---

## Tom e linguagem

- Escreva como um **analista de segurança documentando para um cliente técnico** — objetivo, preciso, sem jargão desnecessário
- Explique o *porquê* de cada técnica, não só o comando
- Inclua a saída real dos terminais em blocos de código
- Evite frases vazias ("como podemos ver", "agora iremos")
- Use voz ativa: "identificamos", "exploramos", "obtivemos"

---

## Frontmatter obrigatório

```yaml
---
title: "[Plataforma] — [Nome da Máquina] Writeup"
description: "Resolução completa de [máquina]: [resumo de 1 linha das técnicas]."
pubDate: YYYY-MM-DD
category: "Machine Write-ups"
tags: ["Plataforma", "SO", "Técnicas principais"]
---
```

---

## Tabela de flags (sempre ao final)

```markdown
## Flags

| Flag | Localização | Método |
|------|-------------|--------|
| user.txt | `/home/user/user.txt` | SSH após crack de hash |
| root.txt | `/root/root.txt` | SUID nmap → shell root |
```

---

## Análise de Risco — modelo de tabela

```markdown
## Análise de Risco

| Vulnerabilidade | Severidade | Causa Raiz | Remediação |
|-----------------|------------|------------|------------|
| robots.txt expondo wordlist | Média | Má configuração de servidor | Remover arquivos sensíveis do webroot |
| WordPress brute force | Alta | Ausência de rate limiting + lockout | Implementar lockout após N tentativas |
| Hash MD5 sem sal | Alta | Algoritmo inseguro de armazenamento | Migrar para bcrypt / Argon2 |
| SUID em nmap legado | Crítica | Permissão excessiva em binário | Remover bit SUID; atualizar ou remover nmap |
```
