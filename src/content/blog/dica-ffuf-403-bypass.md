---
title: "Dica Rápida: Bypass de 403 Forbidden com Ffuf e Header Spoofing"
description: "Uma técnica rápida de Bug Bounty: como contornar respostas 403 em endpoints administrativos usando falsificação de headers e mudança de método HTTP."
pubDate: 2026-08-12
category: "Dicas da Área"
tags: ["Bug Bounty", "Ffuf", "403 Bypass", "Web", "Tips"]
---

Quem faz **Bug Bounty** sabe: encontrar um endpoint administrativo que retorna `403 Forbidden` é um dos melhores sinais de que algo valioso está atrás daquele caminho. Mas um 403 não é um "não" definitivo.

## O Cenário

Você descobriu via recon passivo o endpoint `/api/v1/admin/users`, mas recebe:

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{"error": "Access denied from your location"}
```

## Técnica 1: Spoofing de Headers de Origem

Muitas WAFs e filtros de ACL confiam cegamente em headers de controle de roteamento. Teste variações de `X-Forwarded-For`, `X-Forwarded-Host` e `X-Real-IP`:

```bash
ffuf -w headers.txt -u https://target.com/api/v1/admin/users \
  -H "X-Forwarded-For: 127.0.0.1" \
  -mc 200,201,301,302
```

## Técnica 2: Troca de Método HTTP

Controladores modernos (Spring, Express, Django) às vezes esquecem de validar o método. Um `POST` ou `PUT` em um endpoint que só validava `GET` pode passar limpo:

```bash
curl -k -X POST https://target.com/api/v1/admin/users \
  -H "Content-Type: application/json"
```

## Técnica 3: Path Obfuscation

Adicionar trailing slash, ponto ou codificação dupla frequentemente quebra regras de deny-list mal escritas:

```text
/api/v1/admin/users/..
/api/v1/admin/users/
/api/v1/admin//users
/%2e%2e/admin/users
```

## Checklist Rápido

- [ ] Trocar método (GET → POST/PUT/HEAD)
- [ ] Headers `X-Forwarded-For: 127.0.0.1`
- [ ] Adicionar trailing slash ou ponto
- [ ] Codificação URL dupla
- [ ] Mudar `Content-Type`

> **Pro tip:** Automatize isso com o `ffuf` + wordlist de headers. Economiza horas de trabalho manual em cada programa de bug bounty.
