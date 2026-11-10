/* Al-Qalam - du'a del giorno (495). Nessun testo religioso qui: il du'a e' LETTO dalla sua pagina e2 e copiato com'e'.
   Prima visita del giorno su un dispositivo: du'a deterministico per data di Roma (uguale per tutti). Ogni nuova visita (nuova scheda/sessione)
   passa al successivo della rotazione; «Un altro du'a» ne mostra uno a caso, mai lo stesso due volte di seguito. Memoria: solo localStorage del dispositivo. */
(function(){
  'use strict';
  var L=[["036","d0029"],["022","d0008"],["026","d0014"],["059","d0064"],["065","d0074"],["038","d0032"],["035","d0026"],["082","d0101"],["027","d0017"],["043","d0040"],["092","d0116"],["080","d0097"],["027","d0016"],["081","d0100"],["022","d0009"],["055","d0059"],["090","d0113"],["074","d0087"],["054","d0057"],["031","d0118"],["023","d0010"],["073","d0084"],["036","d0028"],["041","d0037"],["034","d0024"],["018","d0001"],["028","d0019"],["042","d0039"],["089","d0112"],["062","d0069"],["087","d0108"],["061","d0067"],["035","d0027"],["047","d0046"],["043","d0041"],["033","d0023"],["088","d0110"],["020","d0005"],["026","d0015"],["080","d0098"],["046","d0045"],["092","d0117"],["085","d0105"],["042","d0038"],["064","d0072"],["065","d0073"],["049","d0049"],["024","d0011"],["052","d0054"],["074","d0121"],["038","d0031"],["087","d0109"],["025","d0013"],["076","d0090"],["064","d0071"],["030","d0021"],["021","d0006"],["068","d0077"],["045","d0043"],["077","d0092"],["032","d0022"],["060","d0066"],["021","d0007"],["060","d0065"],["069","d0078"],["086","d0107"],["051","d0053"],["079","d0096"],["040","d0034"],["041","d0036"],["053","d0056"],["063","d0070"],["039","d0033"],["056","d0060"],["092","d0115"],["066","d0075"],["048","d0048"],["044","d0042"],["058","d0063"],["073","d0085"],["028","d0018"],["079","d0095"],["046","d0044"],["019","d0002"],["070","d0079"],["088","d0111"],["037","d0030"],["075","d0089"],["057","d0062"],["048","d0047"],["078","d0093"],["024","d0012"],["050","d0051"],["078","d0094"],["054","d0058"],["062","d0068"],["077","d0091"],["081","d0099"],["073","d0083"],["084","d0103"],["083","d0102"],["034","d0025"],["050","d0052"],["049","d0050"],["091","d0114"],["053","d0055"],["040","d0035"],["057","d0061"],["072","d0082"],["020","d0004"],["019","d0003"],["029","d0020"],["084","d0104"],["072","d0081"],["085","d0106"],["075","d0088"],["067","d0076"],["071","d0080"]],K='alq_giorno_v1',SS='alq_giorno_sess',corrente=-1;
  function leggi(){try{return JSON.parse(localStorage.getItem(K)||'null')}catch(e){return null}}
  function scrivi(o){try{localStorage.setItem(K,JSON.stringify(o))}catch(e){}}
  function oggiRoma(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Rome',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}
  function indice(d,n){var a=d.split('-').map(Number);var g=Math.floor(Date.UTC(a[0],a[1]-1,a[2])/864e5);return((g%n)+n)%n}
  function scegli(d){return L[indice(d||oggiRoma(),L.length)]}
  function etichetta(num){var p=(num||'').split(' · ');p.shift();return p.join(' · ')}
  function render(i,d){
    var v=L[i],pag=v[0],id=v[1];corrente=i;
    return fetch('/a/it/e2/'+pag+'/').then(function(r){if(!r.ok)throw new Error('http '+r.status);return r.text()}).then(function(t){
      var doc=new DOMParser().parseFromString(t,'text/html'),voce=doc.getElementById(id);
      if(!voce)throw new Error('du’a non trovato');
      var gr=voce.closest('.gruppo'),tit=gr&&gr.querySelector('h2'),num=voce.querySelector('.num');
      var box=document.getElementById('giorno-corpo');box.textContent='';
      var data=new Intl.DateTimeFormat('it-IT',{timeZone:'Europe/Rome',day:'numeric',month:'long'}).format(new Date(d+'T12:00:00Z'));
      var occ=document.createElement('p');occ.className='num';var et=etichetta(num&&num.textContent);
      occ.textContent=data+' · pag. '+parseInt(pag,10)+(et?' · '+et:'');box.appendChild(occ);
      if(tit){var h=document.createElement('h3');h.className='giorno-tit';h.textContent=tit.textContent;box.appendChild(h)}
      ['.it.pre','.ar','.tr','.it:not(.pre)','.fonte'].forEach(function(s){var e=voce.querySelector(s);if(e)box.appendChild(document.importNode(e,true))});
      var a=document.getElementById('giorno-link');if(a)a.href='/a/it/e2/'+pag+'/#'+id;
      document.getElementById('giorno').hidden=false;return {pag:pag,id:id,idx:i,data:d};
    });
  }
  function mostra(d){d=d||oggiRoma();return render(indice(d,L.length),d)}   /* rotazione per data (usata dai test) */
  function altro(){
    var n=L.length,i=corrente;if(n>1){do{i=Math.floor(Math.random()*n)}while(i===corrente)}
    var d=oggiRoma();scrivi({data:d,idx:i});return render(i,d);
  }
  function visita(){
    var d=oggiRoma(),st=leggi(),i;
    var contata=false;try{contata=sessionStorage.getItem(SS)==='1'}catch(e){}
    if(st&&st.data===d&&typeof st.idx==='number'){i=contata?st.idx:(st.idx+1)%L.length}   /* nuova visita nello stesso giorno: il successivo */
    else i=indice(d,L.length);                                                           /* prima visita del giorno: per data */
    scrivi({data:d,idx:i});try{sessionStorage.setItem(SS,'1')}catch(e){}
    return render(i,d);
  }
  window.alqGiorno={lista:L,scegli:scegli,mostra:mostra,altro:altro,visita:visita,oggiRoma:oggiRoma,corrente:function(){return corrente}};
  function avvia(){var b=document.getElementById('giorno-altro');if(b)b.addEventListener('click',function(){altro().catch(function(){})});
    if(document.getElementById('giorno-corpo'))visita().catch(function(){})}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',avvia);else avvia();
})();
