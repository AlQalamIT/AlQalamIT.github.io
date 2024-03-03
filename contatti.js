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

    // Invio dell'email tramite PHP
    const formData = new FormData();
    formData.append('email', email);
    formData.append('oggetto', oggetto);
    formData.append('messaggio', messaggio);

    fetch('contact.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Messaggio di conferma dal server
        alert('Invio avvenuto con successo!');
    })
    .catch(error => {
        console.error('Errore durante l\'invio del messaggio:', error);
        alert('Errore durante l\'invio del messaggio. Controlla la console per i dettagli.');
    });
});

// Funzione di validazione dell'email
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}


  
