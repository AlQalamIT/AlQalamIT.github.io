/* Al-Qalam - temi del sito (506): Automatico, Chiaro, Blu, Grigio. Nessun cookie, nessun terzo, nessun evento. Caricato nell'intestazione: il tema si imposta prima del disegno. */
(function(){
  'use strict';
  var R=document.documentElement,K='alq_tema',BG={light:'#F4EFE3',blu:'#02134B',grigio:'#1B1D21'},mem='auto';
  function leggi(){try{var s=localStorage.getItem(K);if(s==='dark')return'blu';return(s==='light'||s==='blu'||s==='grigio')?s:'auto'}catch(e){return mem}}
  function scrivi(v){mem=v;try{if(v==='auto')localStorage.removeItem(K);else localStorage.setItem(K,v)}catch(e){}}
  function sistemaScuro(){try{return!!(window.matchMedia&&matchMedia('(prefers-color-scheme:dark)').matches)}catch(e){return false}}
  function applica(){
    var s=leggi(),t=s==='auto'?(sistemaScuro()?'grigio':'light'):s;
    R.setAttribute('data-tema',t);R.setAttribute('data-scelta',s);
    if(t==='light')R.removeAttribute('data-scuro');else R.setAttribute('data-scuro','1');
    var m=document.querySelector('meta[name=theme-color]');if(m)m.setAttribute('content',BG[t]);
    var b=document.querySelectorAll('#selettore-tema button');
    for(var i=0;i<b.length;i++)b[i].setAttribute('aria-pressed',b[i].getAttribute('data-v')===s?'true':'false');
  }
  function avvia(){
    var g=document.getElementById('selettore-tema');
    if(g)g.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('button[data-v]');if(!b)return;scrivi(b.getAttribute('data-v'));applica()});
    applica();
  }
  applica();
  try{matchMedia('(prefers-color-scheme:dark)').addEventListener('change',applica)}catch(e){}
  window.addEventListener('storage',function(e){if(e.key===K)applica()});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',avvia);else avvia();
})();
