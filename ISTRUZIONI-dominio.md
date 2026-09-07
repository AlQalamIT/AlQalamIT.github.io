# Attivazione del dominio — istruzioni operative

Verifica WHOIS eseguita il 2026-09-06 sul registro ufficiale `.it` (porta 43).

## WHOIS integrale di alqalam.it — registro .it, porta 43, 2026-09-06

| Campo | Valore |
|---|---|
| Domain | alqalam.it |
| **Status** | **ok** (attivo, non in scadenza tecnica) |
| Signed (DNSSEC) | no |
| **Created** | **2025-09-17 13:05:13** |
| Last Update | 2025-09-17 13:10:10 |
| **Expire Date** | **2026-09-17** |
| **Registrante** | **Alessio Pinna** — persona fisica, non oscurato. Indirizzo presente nel record: non lo riporto, e' un dato personale di un terzo e non serve alla decisione |
| Admin Contact | Alessio Pinna |
| Technical Contact | Gianluca Danesin — Arnoldo Mondadori Editore S.p.A. |
| **Registrar** | **Mondadori Digital s.p.a.** (AVD-REG) |
| **Nameserver** | ns1 / ns2 / ns3 .altervista.com |

## Il dominio risolve, ed e' un sito reale

Risoluzione via DNS pubblico Google: **status 0, record A 3.73.135.230**.
(Il DNS del router di casa non e' utilizzabile: risponde con un wildcard
`*.homenet.telecomitalia.it` verso 127.0.0.1 per qualunque dominio.)

Aperto col browser il 2026-09-06:

> **al-Qalam • Il Calamo**
> *Esegesi ed ermeneutica coraniche • Islamologia comparata • Arabistica*
> Risorse | Corsi | Eventi | Link | About — Osservatorio islamologico | Radio

**Non e' un parcheggio pubblicitario: e' un progetto attivo**, nello stesso campo
— studi islamici in italiano — con lo stesso nome e la stessa calligrafia araba.

### Il "dettaglio temporale" che avevo accennato

La scadenza e' il **17 settembre 2026, fra 11 giorni**. Lo avevo segnalato come
occasione. **Alla luce del contenuto del sito, la ritiro:** il dominio ospita un
progetto vivo, con corsi ed eventi, registrato tramite Mondadori Digital.
Sara' quasi certamente rinnovato. **Non e' una strategia su cui contare.**

C'e' pero' un secondo aspetto, piu' rilevante del dominio: **esiste gia' un
progetto italiano di studi islamici che si chiama al-Qalam.** Non e' un problema
legale automatico — il nome e' un termine comune del Corano — ma e' un fatto di
posizionamento da conoscere.

## Disponibilita' verificata delle alternative

| Dominio | Stato |
|---|---|
| alqalam.it | **OCCUPATO** — vedi sopra |
| **al-qalam.it** | **LIBERO** |
| **alqalamit.it** | **LIBERO** — corrisponde al nome dell'account GitHub |
| **alqalam.org** | **LIBERO** |
| alqalam.com | occupato |
| alqalam.net | occupato |

**Raccomandazione: `alqalamit.it`.** Coincide con l'account GitHub e col profilo
Instagram (@alqalam.it), e non si confonde con il progetto omonimo.
`al-qalam.it` e' graficamente troppo vicino a quello esistente.

## Cosa succede a un .it dopo la scadenza

Fonti: [Registro .it — Drop Time](https://www.nic.it/en/droptime) e
[Regolamento di assegnazione v7.1](https://www.nic.it/sites/default/files/archivio/docs/Regolamento_assegnazione_v7.1.pdf).

- [V] I domini .it si rinnovano **automaticamente** alla scadenza
- [V] Alla cancellazione il dominio passa a **pendingDelete/redemptionPeriod**,
  poi a **pendingDelete/pendingDelete**, e **il giorno seguente** e' cancellato
  in via definitiva dal database del Registro
- [V] La cancellazione definitiva avviene secondo il processo **Drop Time**, a
  orari programmati
- **[ND] La durata esatta in giorni** di redemptionPeriod e pendingDelete non
  l'ho estratta dalla documentazione ufficiale. Non riporto numeri non verificati.
- **[ND] La finestra esatta** in cui solo il titolare puo' recuperare il dominio

**In ogni caso la questione e' teorica:** il dominio e' in uso attivo.

## DOMINIO SCELTO: alqalamit.it — registrato il 2026-09-06

### Motivazione

| Criterio | alqalamit.it |
|---|---|
| Disponibilita' | unico `.it` sicuro tra quelli valutati |
| Coerenza | coincide con l'account GitHub `AlQalamIT` |
| Coerenza | coincide con l'handle Instagram `@alqalam.it` |
| Distinzione | non confondibile col progetto omonimo su `alqalam.it` |
| Pubblico | `.it` e' l'estensione giusta per un pubblico all'80,7% italiano |

### Scartati, e perche'

**`al-qalam.it`** — e' **il nome esatto dell'altro progetto** (*al-Qalam • Il
Calamo*, islamologia e arabistica) con l'aggiunta di un trattino. Confondibilita'
reale, sia per i lettori sia nei motori di ricerca. Rischio inutile.

**`alqalam.org`** — estensione valida per un progetto divulgativo, ma il pubblico
e' all'80,7% italiano e cerca `.it`. Da tenere come riserva se un giorno il
progetto diventasse internazionale.

**`alqalam.it`** — occupato da un progetto attivo, vedi WHOIS sopra.

---

## SEQUENZA DI ATTIVAZIONE — passo per passo

Stato attuale: **dominio registrato, DNS da impostare.**

### Passo 1 — DNS (Aniss)

Nel pannello del registrar, sul dominio nudo (`@` oppure campo vuoto):

**Quattro record A**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**Quattro record AAAA** (IPv6, consigliati)
```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

**Un record CNAME**: `www` -> `alqalamit.github.io`

**Attesa:** da pochi minuti a 24 ore.

**Verifica (la faccio io):**
```
curl -s "https://dns.google/resolve?name=alqalamit.it&type=A"
```
Deve restituire i quattro indirizzi `185.199.10x.153`. Finche' non li restituisce,
**non si prosegue**.

### Passo 2 — File CNAME nel repo (io)

Rinomino `CNAME.da-attivare` in `CNAME`, committo e spingo.
GitHub rileva il file e imposta il dominio personalizzato.

**Perche' solo ora:** un file `CNAME` con un dominio che non risolve ancora rende
il sito **irraggiungibile**. E' il motivo per cui il file ha un nome inerte.

**Verifica:** `https://alqalamit.it` risponde e mostra il sito.

### Passo 3 — HTTPS (io, poi Aniss conferma)

In *Settings -> Pages* si attende che compaia **Enforce HTTPS** e si spunta.

**Attesa:** fino a 24 ore dopo il passo 2 perche' l'opzione diventi disponibile.

**Verifica:**
```
curl -sI https://alqalamit.it | head -3
```
Deve dare `HTTP/2 200`, senza errori di certificato.

### Passo 4 — Collaudo (Aniss)

Aprire `https://alqalamit.it` **dal telefono**, in rete mobile, non in wifi.
Verificare che il lucchetto compaia e che un audio parta.

---

## Se dopo 48 ore il certificato non si attiva

Nell'ordine:

1. **Controllare che non esistano record AAAA sbagliati.** Se il dominio ha AAAA
   che puntano altrove, GitHub non emette il certificato. O sono i quattro
   corretti, o vanno rimossi del tutto.
2. **Controllare che non ci sia un record CAA** che vieta a Let's Encrypt di
   emettere. Verifica:
   ```
   curl -s "https://dns.google/resolve?name=alqalamit.it&type=CAA"
   ```
   Se esiste e non include `letsencrypt.org`, va corretto o rimosso.
3. **Togliere e rimettere il dominio** in *Settings -> Pages*: forza una nuova
   richiesta di certificato.
4. **Verificare che il dominio non sia dietro un proxy** (es. Cloudflare in
   modalita' arancione): con GitHub Pages i record devono essere DNS puri.
5. Se nessuna delle precedenti risolve, aprire un ticket al supporto GitHub
   allegando l'output di `dig alqalamit.it A` e `dig alqalamit.it CAA`.

**Nel frattempo il sito resta raggiungibile in HTTP** e su
`alqalamit.github.io`: nessuna interruzione di servizio.

---

## Cosa deve fare Aniss al momento dell'acquisto

**1. Registrare il dominio** presso un registrar (~9-20 EUR/anno).

**2. Impostare i record DNS** nel pannello del registrar:

Quattro record **A** sul dominio nudo (`@` oppure vuoto):

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Quattro record **AAAA** (IPv6, opzionali ma consigliati):

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

Un record **CNAME** per il sottodominio `www` verso `alqalamit.github.io`.

**3. Dirmelo.** Da qui in avanti faccio io: rinomino `CNAME.da-attivare` in `CNAME`,
committo e spingo. GitHub rileva il file e attiva il dominio.

**4. Spuntare "Enforce HTTPS"** in *Settings -> Pages*. Puo' richiedere fino a 24 ore
prima di essere disponibile. Il certificato e' gratuito e automatico.

## Perche' il file si chiama CNAME.da-attivare

Un file chiamato esattamente `CNAME` nella radice **attiva subito** il dominio
personalizzato. Se il dominio non e' ancora registrato, il sito diventerebbe
irraggiungibile. Il file e' gia' pronto col contenuto corretto, ma inerte finche'
non lo rinomino.

**Contenuto attuale del file:** `al-qalam.it`. **Da cambiare in `alqalamit.it`** se accetti la raccomandazione — dimmelo e lo aggiorno.

## Tempi

Fino a **48 ore** tra propagazione DNS e disponibilita' di Enforce HTTPS.

## Dopo l'attivazione

1. Aggiornare le destinazioni dei **41 QR dinamici** sul pannello di
   the-qrcode-generator, dal vecchio `alqalamit.github.io/...` al nuovo dominio.
   **Questo salva tutte le copie gia' vendute.**
2. Solo a quel punto generare i **QR statici** per la ristampa.
3. Usare il dominio nuovo anche nei link dell'ebook.
