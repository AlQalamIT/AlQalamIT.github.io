<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $oggetto = $_POST['oggetto'];
    $messaggio = $_POST['messaggio'];

    $destinatario = "alqalam.ita@gmail.com";
    $corpo_email = "Email: $email\nMessaggio: $messaggio";

    // Invio dell'email
    mail($destinatario, $oggetto, $corpo_email);

    // Reindirizzamento dopo l'invio dell'email
    header('Location: grazie.html');
}
?>