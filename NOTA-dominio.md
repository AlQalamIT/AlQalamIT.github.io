# Nota tecnica — dominio proprio davanti a GitHub Pages

**Data:** 2026-09-06
**Da fare PRIMA di qualsiasi ristampa del libro.**

Tag: **[V]** verificato sulla fonte citata · **[ND]** non documentato.

---

## 1 · Il rischio, in una riga

Il repository si chiama **`AlQalamIT.github.io`**: è uno **user site**, il cui URL
coincide col nome dell'account.

[V] Documentazione GitHub Pages, [About GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages):
> *User/Organization Site: repository denominato `<owner>.github.io`, URL
> `http(s)://<owner>.github.io`, massimo un sito per account.*

**Conseguenza:** l'URL non è un indirizzo che possedete, è un derivato del nome
dell'account. Se l'account `AlQalamIT` viene perso, rinominato o sospeso,
**l'URL cambia o smette di esistere — e con esso ogni QR già stampato.**

I QR sono su carta. Non si aggiornano. Ogni copia venduta diventa muta.

[ND] La documentazione consultata **non specifica** cosa accada esattamente
all'URL in caso di rinomina dell'account o perdita d'accesso. Non ho trovato una
pagina ufficiale che lo tratti: resta una lacuna, ma non cambia la conclusione —
un identificatore che non controllate non va messo su un supporto permanente.

---

## 2 · Cosa serve, in concreto

### a) Registrazione del dominio
Un dominio apex, per esempio `alqalam.it`.
**[ND] Disponibilità non verificata.** Da controllare presso un registrar.
Alternative se occupato: `alqalam.eu`, `al-qalam.it`, `alqalamit.it`.

### b) Record DNS presso il registrar

[V] [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

Per un dominio apex, **quattro record A**:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Opzionali, per IPv6, **quattro record AAAA**:

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

In alternativa, se il registrar lo supporta: un record **ALIAS/ANAME** verso
`alqalamit.github.io`.

### c) File `CNAME` nel repository

[V] Salvando il dominio in *Settings → Pages*, GitHub
> *"creerà un commit che aggiunge un file `CNAME` direttamente nella radice del
> tuo branch sorgente"*.

Non va creato a mano: lo genera GitHub. (Non viene creato se si pubblica tramite
un workflow GitHub Actions personalizzato — non è il nostro caso.)

### d) HTTPS

[V] In *Settings → Pages* si spunta **Enforce HTTPS**.
> *"può volerci fino a 24 ore prima che questa opzione sia disponibile"*.

Il certificato è gratuito e automatico.

### e) Tempi

[V] *"I cambiamenti DNS possono impiegare fino a 24 ore per propagarsi."*

**Da mettere in conto: fino a 48 ore** tra propagazione DNS e disponibilità di
Enforce HTTPS.

---

## 3 · Costo annuo

| Voce | Costo |
|---|---|
| Dominio `.it`, registrazione e rinnovo | **€8,99 + IVA/anno** (fino a ~€13-20 con altri registrar) |
| Dominio personalizzato su GitHub Pages | **gratuito** |
| Certificato HTTPS | **gratuito** |
| Hosting | **gratuito** |
| **Totale ricorrente** | **~€9-20 l'anno** |

⚠️ Attenzione alle offerte promozionali a €0,99 o €3,99: valgono **solo il primo
anno**. Va guardato il prezzo di rinnovo, non quello di ingresso.

[ND] Il costo del dominio viene da una ricerca del 2026-09-06, non da un
preventivo di un registrar specifico.

---

## 4 · Cosa succede ai QR già stampati

Questa è la parte che conta, ed è più sfumata di quanto sembri.

### La catena attuale

```
QR stampato  →  qr.page/g/XXXXX  →  alqalamit.github.io/pagina.html
                (servizio terzo,       (dominio di terzi)
                 account gratuito,
                 con pagina pubblicitaria)
```

**Due dipendenze esterne** su un supporto permanente.

### Il fatto decisivo: i QR esistenti sono dinamici

I QR stampati **non contengono l'indirizzo finale**: contengono il link `qr.page`,
che rimanda. La destinazione **si può cambiare dal pannello del servizio**.

**Quindi le copie già vendute si possono migrare senza ristampare nulla:**

1. Si registra il dominio e lo si punta a GitHub Pages
2. Si aggiorna la destinazione di ciascuno dei **41 QR dinamici** sul pannello di
   the-qrcode-generator, da `alqalamit.github.io/...` a `alqalam.it/...`
3. Da quel momento le vecchie copie passano per `qr.page → alqalam.it`

**Cosa migliora:** sparisce la dipendenza da GitHub. Se un domani Pages cambia
politica, si sposta il DNS e le copie vendute continuano a funzionare.

**Cosa resta:** la dipendenza da `qr.page`, che per le copie già stampate **non
si può eliminare** — quel link è inciso sulla carta. E resta anche la pagina
pubblicitaria, legata al piano gratuito.

### Per le ristampe future

**QR statici che puntano direttamente a `alqalam.it/pagina.html`.**
Zero intermediari, zero pubblicità, zero scadenze, zero costi ricorrenti oltre al
dominio. Un QR statico non si rompe finché vive il dominio.

### Ordine corretto delle operazioni

```
1. Registrare il dominio
2. Configurare DNS + CNAME + HTTPS, verificare che il sito risponda
3. Aggiornare le destinazioni dei 41 QR dinamici (salva le copie già vendute)
4. SOLO ORA generare i QR statici per la ristampa
5. Ristampare
```

Invertire i passi 4 e 1 significa stampare di nuovo QR su un dominio che non
possedete.

---

## 5 · Limiti di GitHub Pages — verifica di capienza

[V] [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)

| Limite | Valore | Situazione attuale |
|---|---|---|
| Dimensione del sito pubblicato | **1 GB** | **38,2 MB** ✅ ampio margine |
| Banda mensile (soft) | **100 GB/mese** | [ND] traffico non misurato |
| Build orarie (soft) | **10/ora** | non rilevante |

Il superamento dei soft limit comporta rate limiting con risposta HTTP 429.

Il sito contiene **221 file audio** per 38,2 MB: c'è spazio per crescere di oltre
venti volte prima di avvicinarsi al limite.

[ND] GitHub non dichiara esplicitamente in questa pagina la gratuità per i
repository pubblici; il servizio è presentato senza menzione di costi.

---

## 6 · Riepilogo per la decisione

| | |
|---|---|
| **Costo** | ~€9-20 l'anno, tutto il resto gratuito |
| **Lavoro tecnico** | 4 record DNS + una spunta. Il file CNAME lo fa GitHub |
| **Tempo** | fino a 48 ore per propagazione e HTTPS |
| **Rischio se non si fa** | ogni QR di ogni copia venduta dipende dal fatto che l'account `AlQalamIT` resti vostro, per sempre |
| **Recupero delle copie già vendute** | ✅ possibile, aggiornando i 41 QR dinamici |
| **Urgenza** | **prima della ristampa** |

**Da fare a mano da Aniss:** registrazione del dominio e configurazione DNS presso
il registrar (richiedono le sue credenziali). Il resto — file CNAME, verifica,
aggiornamento del sito — lo posso fare io.
