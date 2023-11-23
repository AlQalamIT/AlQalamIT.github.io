document.getElementById('inviaButton').addEventListener('click', function() {
    const email = document.getElementById('emailInput').value;
    const oggetto = document.getElementById('oggettoInput').value;
    const messaggio = document.getElementById('messaggioInput').value;

    // Simulazione dell'invio del messaggio tramite console
    console.log('Email: ' + email);
    console.log('Oggetto: ' + oggetto);
    console.log('Messaggio: ' + messaggio);

    // Qui puoi inserire il codice per inviare il messaggio a "alqalam.ita@gmail.com" tramite PHP o altre soluzioni server-side.
});


  