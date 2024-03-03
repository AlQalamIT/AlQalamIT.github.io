<?php
$to = 'alqalam.ita@gmail.com'; // Indirizzo email di destinazione
$subject = 'Oggetto del messaggio'; // Oggetto dell'email
$message = 'Contenuto del messaggio'; // Testo del messaggio

// Intestazioni dell'email
$headers = 'From: webmaster@example.com' . "\r\n" .
    'Reply-To: webmaster@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

// Invia l'email
if (mail($to, $subject, $message, $headers)) {
    echo 'Messaggio inviato con successo!';
} else {
    echo 'Errore durante l\'invio del messaggio.';
}
?>
