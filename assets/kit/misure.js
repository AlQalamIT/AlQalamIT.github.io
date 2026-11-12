/* Al-Qalam - misure 494: eventi del contatore GoatCounter (senza cookie, senza dati personali).
   Si usa SOLO il frammento ufficiale count.js: qui si chiama soltanto goatcounter.count({event:true}).
   Nessun testo scansionato, nessun identificativo: solo il nome dell'evento e il percorso della pagina. */
(function(){
  'use strict';
  function ev(nome){
    try{var g=window.goatcounter;if(g&&typeof g.count==='function')g.count({path:nome,title:location.pathname,event:true})}catch(e){}
  }
  window.alqEv=ev;
  document.addEventListener('click',function(e){
    var t=e.target&&e.target.closest;
    if(t&&e.target.closest('a[data-amazon]'))ev('clic-amazon');
    else if(t&&e.target.closest('a[href="/vai/libro.html"]'))ev('clic-pagina-libro');
  },true);
  var visti=typeof WeakSet==='function'?new WeakSet():null;
  document.addEventListener('play',function(e){
    var t=e.target;
    if(t&&t.tagName==='AUDIO'&&visti&&!visti.has(t)){visti.add(t);ev('ascolto-avviato')}
  },true);
})();
