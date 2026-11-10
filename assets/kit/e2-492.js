/* Al-Qalam - pagina e2 v492: sblocco col QR del libro, ascolta e ripeti, progresso personale.
   Tutto nel browser: nessuna immagine esce dal dispositivo, nessun cookie, nessun servizio esterno.
   Limite onesto: e' una protezione di cortesia, non di sicurezza (uno screenshot del QR la supera). */
(function(){
  'use strict';
  var K_SBLOC='alq_sbloccato_v1', K_PROG='alq_prog_v1';
  var root=document.documentElement;
  function leggi(k){try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}}
  function scrivi(k,v){try{if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}}
  function $(s,r){return (r||document).querySelector(s)}

  /* Il QR e' valido solo se e' un URL di una pagina e2 del libro: /a/it/e2/NNN/ sul sito.
     Il QR di p. 97 (/ig/), un link altrove o un testo qualunque NON sbloccano. */
  function valida(testo){
    var u; try{u=new URL(String(testo).trim())}catch(e){return false}
    var locale=(u.hostname==='127.0.0.1'||u.hostname==='localhost');
    if(!(u.protocol==='https:'||(locale&&u.protocol==='http:')))return false;
    var okHost=(u.hostname==='alqalamit.it'||u.hostname==='www.alqalamit.it'||u.hostname===location.hostname);
    return okHost&&/^\/a\/it\/e2\/\d{3}\/?$/.test(u.pathname);
  }
  window.__alqValidaQR=valida; /* per i test */

  function sbloccato(){var s=leggi(K_SBLOC);return !!(s&&s.v===1)}
  function applica(){root.classList.toggle('sbloccato',sbloccato());contaImparati()}
  function sblocca(){scrivi(K_SBLOC,{v:1,t:new Date().toISOString().slice(0,10)});applica()}
  function blocca(){scrivi(K_SBLOC,null);applica()}

  /* progresso: {dNNNN:{n:ascolti, i:0|1}} */
  function prog(){return leggi(K_PROG)||{}}
  function salvaProg(p){scrivi(K_PROG,p)}
  function contaImparati(){
    var el=$('#imparati'); if(!el)return;
    var p=prog(),n=0;for(var k in p){if(p[k]&&p[k].i)n++}
    el.textContent=n;
  }

  function costruisciFx(v){
    var id=v.id; if(!id||$('.fx',v))return;
    var num=$('.num',v), m=num&&num.textContent.match(/\(x(\d+)\)/), obiettivo=m?parseInt(m[1],10):0;
    var fonte=$('.fonte',v); if(!fonte)return;
    var fx=document.createElement('div'); fx.className='fx';
    fx.innerHTML='<span class="cont" aria-live="polite"></span>'+
      '<button type="button" class="imp" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>Imparato</button>'+
      '<button type="button" class="azz">Azzera</button>'+
      '<p class="ok" hidden></p>';
    fonte.parentNode.insertBefore(fx,fonte.nextSibling);
    var cont=$('.cont',fx), imp=$('.imp',fx), azz=$('.azz',fx), ok=$('.ok',fx);
    function disegna(){
      var s=prog()[id]||{n:0,i:0};
      cont.textContent='Ascolti: '+s.n+(obiettivo?' di '+obiettivo:'');
      imp.setAttribute('aria-pressed',s.i?'true':'false');
      if(obiettivo&&s.n>=obiettivo){ok.hidden=false;ok.textContent='Obiettivo di ascolti raggiunto.'}else ok.hidden=true;
    }
    function muta(f){var p=prog();p[id]=p[id]||{n:0,i:0};f(p[id]);salvaProg(p);disegna();contaImparati()}
    imp.addEventListener('click',function(){muta(function(s){s.i=s.i?0:1})});
    azz.addEventListener('click',function(){muta(function(s){s.n=0;s.i=0})});
    var au=$('audio',v);
    if(au){
      var ult=0;
      au.addEventListener('ended',function(){muta(function(s){s.n++})});
      au.addEventListener('timeupdate',function(){
        /* con «Ripeti» attivo l'evento ended non scatta: si conta il ritorno all'inizio */
        if(au.loop&&au.duration&&ult>au.duration*0.7&&au.currentTime<au.duration*0.3){muta(function(s){s.n++})}
        ult=au.currentTime;
      });
    }
    disegna();
  }

  /* ---- scanner ---- */
  var dlg=$('#scan'), vid=$('#scan-video'), stato=$('#scan-stato'), flusso=null, attivo=false, jsqrCaricato=null;
  function msg(t){if(stato)stato.textContent=t}
  function fermaFlusso(){
    attivo=false;
    if(flusso){flusso.getTracks().forEach(function(t){t.stop()});flusso=null}
    if(vid)vid.srcObject=null;
  }
  function chiudi(){fermaFlusso();if(dlg&&dlg.open)dlg.close()}
  function caricaJsqr(){
    if(window.jsQR)return Promise.resolve();
    if(jsqrCaricato)return jsqrCaricato;
    var me=document.currentScript||document.querySelector('script[src*="e2-492.js"]');
    var base=me?me.src.replace(/e2-492\.js.*$/,''):'/assets/kit/';
    jsqrCaricato=new Promise(function(res,rej){
      var s=document.createElement('script');s.src=base+'jsQR.js';s.onload=res;s.onerror=rej;document.head.appendChild(s);
    });
    return jsqrCaricato;
  }
  function apriScanner(){
    if(!dlg)return;
    if(!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)){
      dlg.showModal();msg('La fotocamera non è disponibile su questo dispositivo o in questo browser.');return;
    }
    dlg.showModal();msg('Sto aprendo la fotocamera…');
    navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}},audio:false}).then(function(st){
      flusso=st;vid.srcObject=st;vid.setAttribute('playsinline','');
      return vid.play();
    }).then(function(){
      msg('Inquadra il codice QR di una pagina del libro.');attivo=true;ciclo();
    }).catch(function(e){
      fermaFlusso();
      if(e&&(e.name==='NotAllowedError'||e.name==='SecurityError'))msg('La fotocamera è bloccata: consenti l’accesso dalle impostazioni del browser e riprova.');
      else if(e&&e.name==='NotFoundError')msg('Non trovo nessuna fotocamera su questo dispositivo.');
      else msg('Non riesco ad aprire la fotocamera.');
    });
  }
  var ultimoErrore=0;
  function trovato(testo){
    if(valida(testo)){chiudi();sblocca();var f=$('#sb-stato');if(f){f.focus&&f.focus()}return true}
    var ora=Date.now();
    if(ora-ultimoErrore>1500){ultimoErrore=ora;msg('Questo non è il codice di una pagina del libro con audio. Prova con un altro.')}
    return false;
  }
  function ciclo(){
    var det=null,cv=document.createElement('canvas'),cx=cv.getContext('2d',{willReadFrequently:true});
    if('BarcodeDetector' in window){try{det=new BarcodeDetector({formats:['qr_code']})}catch(e){det=null}}
    var prima=det?Promise.resolve():caricaJsqr();
    prima.then(function(){
      function passo(){
        if(!attivo)return;
        if(vid.readyState>=2&&vid.videoWidth){
          if(det){
            det.detect(vid).then(function(r){if(attivo&&r&&r.length&&trovato(r[0].rawValue))return;setTimeout(passo,150)}).catch(function(){setTimeout(passo,250)});
            return;
          }
          var w=Math.min(480,vid.videoWidth),h=Math.round(vid.videoHeight*w/vid.videoWidth);
          cv.width=w;cv.height=h;cx.drawImage(vid,0,0,w,h);
          var d=cx.getImageData(0,0,w,h),r=window.jsQR(d.data,w,h,{inversionAttempts:'attemptBoth'});
          if(r&&r.data&&trovato(r.data))return;
        }
        setTimeout(passo,120);
      }
      passo();
    }).catch(function(){msg('Non riesco a caricare il lettore di codici QR.')});
  }

  function avvia(){
    applica();
    Array.prototype.forEach.call(document.querySelectorAll('.voce'),costruisciFx);
    var b=$('#sb-apri'); if(b)b.addEventListener('click',apriScanner);
    var o=$('#sb-off'); if(o)o.addEventListener('click',blocca);
    var c=$('#scan-chiudi'); if(c)c.addEventListener('click',chiudi);
    if(dlg)dlg.addEventListener('close',fermaFlusso);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',avvia);else avvia();
})();
