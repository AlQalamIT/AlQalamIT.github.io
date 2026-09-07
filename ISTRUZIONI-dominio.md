# Attivazione del dominio — istruzioni operative

Verifica WHOIS eseguita il 2026-09-06 sul registro ufficiale `.it` (porta 43).

## Disponibilita' verificata

| Dominio | Stato | Note |
|---|---|---|
| `alqalam.it` | **OCCUPATO** | Registrato 2025-09-17, **scadenza 2026-09-17** (fra 11 giorni). Intestato a un privato tramite Mondadori Digital |
| **`al-qalam.it`** | **LIBERO** | Consigliato |
| **`alqalamit.it`** | **LIBERO** | Corrisponde al nome dell'account GitHub |
| **`alqalam.org`** | **LIBERO** | Estensione adatta a un progetto divulgativo |
| `alqalam.com` | occupato | |
| `alqalam.net` | occupato | |

> `alqalam.it` scade il **17 settembre 2026**. Se non viene rinnovato entra nel
> periodo di grazia e poi torna libero. La maggior parte dei domini viene rinnovata
> automaticamente: **non contarci**, ma vale la pena ricontrollare a fine ottobre.

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

**Contenuto attuale:** `al-qalam.it` — da cambiare se scegli un altro dominio.

## Tempi

Fino a **48 ore** tra propagazione DNS e disponibilita' di Enforce HTTPS.

## Dopo l'attivazione

1. Aggiornare le destinazioni dei **41 QR dinamici** sul pannello di
   the-qrcode-generator, dal vecchio `alqalamit.github.io/...` al nuovo dominio.
   **Questo salva tutte le copie gia' vendute.**
2. Solo a quel punto generare i **QR statici** per la ristampa.
3. Usare il dominio nuovo anche nei link dell'ebook.
