# Banco di prova — non viene pubblicato

GitHub Pages non serve le cartelle che iniziano con un punto, quindi tutto
quello che sta qui resta in locale anche dopo il push.

| File | A cosa serve |
|---|---|
| `audit.html?tema=light\|dark` | misura il contrasto di ogni elemento della pagina QR nei due temi e dice quali stanno sotto soglia WCAG |
| `chiaro.html` `scuro.html` | aprono la pagina forzando il tema (scrivono `alq_tema` e reindirizzano) |
| `chiaro-ripeti.html` `scuro-ripeti.html` | come sopra, con il tasto Ripeti gia' attivo |
| `tel-*.html` | le stesse pagine dentro un iframe da 390 px: servono per gli screenshot a larghezza telefono |

## Perche' l'iframe

Chrome headless su Windows non scende sotto i 500 px di viewport: `--window-size=390`
viene ignorato e la pagina si impagina a 500. L'iframe da 390 px da' alla pagina un
viewport vero da telefono.

## Come si rigenerano gli screenshot

```
python -m http.server 8765 --directory 08-sito
chrome --headless=new --disable-gpu --hide-scrollbars --window-size=520,1660 \
       --virtual-time-budget=8000 --screenshot=out.png \
       http://localhost:8765/.qa/tel-scuro.html
```
poi si ritaglia a 390 px di larghezza.

## Come si legge l'audit

```
chrome --headless=new --virtual-time-budget=8000 --dump-dom \
       "http://localhost:8765/.qa/audit.html?tema=dark"
```
