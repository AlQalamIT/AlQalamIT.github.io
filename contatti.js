document.getElementById('inviaButton').addEventListener('click', function() {
    const email = document.getElementById('emailInput').value;
    const oggetto = document.getElementById('oggettoInput').value;
    const messaggio = document.getElementById('messaggioInput').value;

    // Validazione lato client
    if (!email || !oggetto || !messaggio) {
        alert('Errore: Tutti i campi sono obbligatori.');
        return;
    }

    // Verifica che l'email sia valida
    if (!validateEmail(email)) {
        alert('Errore: Inserisci un indirizzo email valido.');
        return;
    }

    // Simulazione dell'invio del messaggio tramite console
    console.log('Email: ' + email);
    console.log('Oggetto: ' + oggetto);
    console.log('Messaggio: ' + messaggio);

    // Qui puoi inserire il codice per inviare il messaggio a "alqalam.ita@gmail.com" tramite PHP o altre soluzioni server-side.

    // Mostra un messaggio di invio avvenuto con successo
    alert('Invio avvenuto con successo!');
});

// Funzione di validazione dell'email
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}


  