<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verifica che tutti i campi siano stati compilati
    if (empty($_POST['email']) || empty($_POST['oggetto']) || empty($_POST['messaggio'])) {
        echo "Errore: Tutti i campi sono obbligatori.";
        exit;
    }

    $email = $_POST['email'];
    $oggetto = $_POST['oggetto'];
    $messaggio = $_POST['messaggio'];

    // Verifica che l'email sia valida
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Errore: Inserisci un indirizzo email valido.";
        exit;
    }

    $destinatario = "alqalam.ita@gmail.com";
    $corpo_email = "Email: $email\nMessaggio: $messaggio";

    // Invio dell'email
    if (mail($destinatario, $oggetto, $corpo_email)) {
        echo "Messaggio inviato con successo!";
    } else {
        echo "Errore nell'invio del messaggio. Riprova più tardi.";
    }
}
?>
