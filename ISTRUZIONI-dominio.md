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
