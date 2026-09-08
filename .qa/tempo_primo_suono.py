#!/usr/bin/env python
"""
Misura il TEMPO AL PRIMO SUONO su rete lenta, sulla pagina servita in HTTPS
dal dominio vero. Non da file:// e non da localhost: i tempi non sarebbero
confrontabili.

Come funziona: apre Chrome headless col protocollo DevTools, impone una
strozzatura di rete reale (Network.emulateNetworkConditions), carica la pagina,
tocca il pulsante play e cronometra fino al primo campione riprodotto -
l'evento 'playing' dell'elemento audio, non 'canplay'.

Obiettivo dichiarato: sotto i 2 secondi su 3G lento.

Uso:
    python tempo_primo_suono.py [url] [--profilo lento3g|3g|4g]
"""
import argparse
import json
import os
import re
import subprocess
import sys
import time
import urllib.request

import websocket

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
PORTA = 9333

# Gli stessi profili usati dal pannello Rete di Chrome.
PROFILI = {
    # nome        download B/s   upload B/s   latenza ms
    "lento3g":  (400 * 1024 / 8, 400 * 1024 / 8, 2000),
    "3g":       (1.6 * 1024 * 1024 / 8, 750 * 1024 / 8, 300),
    "4g":       (9 * 1024 * 1024 / 8, 9 * 1024 * 1024 / 8, 170),
}


def avvia_chrome(profilo_dir):
    p = subprocess.Popen(
        [CHROME, "--headless=new", "--disable-gpu", f"--remote-debugging-port={PORTA}",
         f"--user-data-dir={profilo_dir}", "--no-first-run",
         "--remote-allow-origins=*", "--autoplay-policy=no-user-gesture-required",
         "--window-size=390,900", "about:blank"],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for _ in range(60):
        try:
            d = json.load(urllib.request.urlopen(f"http://127.0.0.1:{PORTA}/json", timeout=2))
            for t in d:
                if t.get("type") == "page":
                    return p, t["webSocketDebuggerUrl"]
        except Exception:
            time.sleep(0.5)
    p.kill()
    raise SystemExit("Chrome non ha aperto la porta di debug")


class Cdp:
    def __init__(self, url):
        self.ws = websocket.create_connection(url, timeout=90)
        self.n = 0

    def __call__(self, metodo, **par):
        self.n += 1
        mio = self.n
        self.ws.send(json.dumps({"id": mio, "method": metodo, "params": par}))
        if getattr(self, "risposte", None) is not None:
            for _ in range(4000):
                if mio in self.risposte:
                    m = self.risposte.pop(mio)
                    if "error" in m:
                        raise RuntimeError(f"{metodo}: {m['error']}")
                    return m.get("result", {})
                time.sleep(0.02)
            raise RuntimeError(f"{metodo}: nessuna risposta")
        while True:
            m = json.loads(self.ws.recv())
            if m.get("id") == mio:
                if "error" in m:
                    raise RuntimeError(f"{metodo}: {m['error']}")
                return m.get("result", {})

    def scarta_estranee(self, consentiti):
        """
        Fa fallire ogni richiesta che la pagina non ha davvero chiesto.

        Serve perche' l'ambiente in cui gira questa misura inietta nel browser
        alcune risorse sul nostro stesso dominio, con nomi casuali e senza
        estensione: un solo script da 104 KB. Da curl quelle URL danno 404 e la
        pagina non le dichiara. Lasciandole passare la misura risultava
        gonfiata di circa 162 KB che un lettore vero non scarichera' mai.
        """
        self("Fetch.enable", patterns=[{"urlPattern": "*"}])
        import re as _re
        ok = _re.compile(consentiti)
        def pompa():
            while True:
                m = json.loads(self.ws.recv())
                if m.get("method") == "Fetch.requestPaused":
                    rid = m["params"]["requestId"]
                    url = m["params"]["request"]["url"]
                    self.n += 1
                    if ok.search(url):
                        self.ws.send(json.dumps({"id": self.n, "method": "Fetch.continueRequest",
                                                 "params": {"requestId": rid}}))
                    else:
                        self.scartate.append(url)
                        self.ws.send(json.dumps({"id": self.n, "method": "Fetch.failRequest",
                                                 "params": {"requestId": rid, "errorReason": "BlockedByClient"}}))
                elif m.get("id"):
                    self.risposte[m["id"]] = m
        import threading
        self.scartate = []
        self.risposte = {}
        threading.Thread(target=pompa, daemon=True).start()

    def valuta(self, espressione, attesa=False):
        r = self("Runtime.evaluate", expression=espressione, awaitPromise=attesa,
                 returnByValue=True)
        return r.get("result", {}).get("value")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("url", nargs="?", default="https://alqalamit.it/a/it/0010.html")
    ap.add_argument("--profilo", default="lento3g", choices=list(PROFILI))
    ap.add_argument("--ripetizioni", type=int, default=3)
    a = ap.parse_args()

    giu, su, lat = PROFILI[a.profilo]
    misure, pesi = [], []
    for k in range(a.ripetizioni):
        dirprof = os.path.join(os.environ.get("TEMP", "."), f"alqalam-cdp-{k}-{int(time.time())}")
        proc, wsurl = avvia_chrome(dirprof)
        try:
            c = Cdp(wsurl)
            c("Page.enable"); c("Network.enable"); c("Runtime.enable")
            c("Network.setCacheDisabled", cacheDisabled=True)
            c.scarta_estranee(r"\.(html|woff2|png|mp3|ico|css|js|svg|jpg)(\?|$)")
            c("Network.emulateNetworkConditions", offline=False, latency=lat,
              downloadThroughput=giu, uploadThroughput=su)
            # Lo strumento va montato PRIMA della navigazione, altrimenti si
            # misura una pagina gia' caricata e l'audio e' gia' in memoria:
            # la prima versione dava 1 ms, che non e' una misura ma un
            # artefatto. Qui il cronometro parte dall'inizio della navigazione
            # e il tocco su play avviene appena la pagina e' interattiva.
            c("Page.addScriptToEvaluateOnNewDocument", source="""
              window.__alq = {};
              document.addEventListener('DOMContentLoaded', () => {
                const au = document.getElementById('au');
                const play = document.getElementById('play');
                if (!au || !play) return;
                window.__alq.dom = performance.now();
                au.addEventListener('playing', () => {
                  window.__alq.suono = performance.now();
                  const r = performance.getEntriesByType('resource')
                            .find(x => x.name.endsWith('.mp3'));
                  window.__alq.audio_byte = r ? r.transferSize : null;
                  au.pause();
                }, {once:true});
                au.addEventListener('error', () => { window.__alq.suono = -1; }, {once:true});
                play.click();
              });
            """)
            c("Page.navigate", url=a.url)
            for _ in range(300):
                fatto = c.valuta("window.__alq && window.__alq.suono ? 1 : 0")
                if fatto:
                    break
                time.sleep(0.25)
            m = c.valuta("JSON.stringify(window.__alq||{})")
            m = json.loads(m or "{}")
            t = round(m.get("suono", -2))
            dal_dom = round(m.get("suono", 0) - m.get("dom", 0)) if m.get("dom") else None
            peso = c.valuta("performance.getEntriesByType('resource')"
                            ".reduce((s,r)=>s+(r.transferSize||0),0)")
            misure.append(t)
            pesi.append(peso)
            if c.scartate:
                print(f"     (scartate {len(c.scartate)} richieste estranee alla pagina)")
            print(f"  prova {k+1}: {t} ms dall'inizio della navigazione, "
                  f"{dal_dom} ms dal tocco su play  "
                  f"(byte totali {peso}, di cui audio {m.get('audio_byte')})")
        finally:
            proc.kill()

    buone = [m for m in misure if m and m > 0]
    print()
    print(f"profilo di rete: {a.profilo}  ({giu*8/1024:.0f} kbit/s, latenza {lat} ms)")
    print(f"URL: {a.url}")
    if not buone:
        print("NESSUNA MISURA VALIDA:", misure)
        sys.exit(1)
    print(f"tempo al primo suono, dall'apertura della pagina — mediana {sorted(buone)[len(buone)//2]} ms, "
          f"min {min(buone)} ms, max {max(buone)} ms")
    print(f"obiettivo dichiarato: sotto 2000 ms -> "
          f"{'RAGGIUNTO' if sorted(buone)[len(buone)//2] < 2000 else 'NON RAGGIUNTO'}")


if __name__ == "__main__":
    main()
