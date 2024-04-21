<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    //Cambia Tu_Bot_Token por el token del bot que creaste en telegram y Tu_Cchat_Id por el id del chat
    $botToken = 'Tu_Bot_Token';
    $chatId = 'Tu_Cchat_Id';
    
    $datosClima = json_decode(file_get_contents('php://input'), true);
    $mensaje = "\n*Reporte del clima en {$datosClima['nombreLugar']}:*\n\n";
    $mensaje .= "Temperatura: {$datosClima['temperatura']}°C 🌡️\n";
    $mensaje .= "Descripción: {$datosClima['descripcionClima']} 🌦️\n";
    $mensaje .= "Presión: {$datosClima['presion']} hPa 📊\n";
    $mensaje .= "Humedad: {$datosClima['humedad']}% 💧\n";
    $mensaje .= "Velocidad del viento: {$datosClima['velviento']} m/s 🌬️\n";
    $mensaje .= "Dirección del viento: {$datosClima['dirviento']}° 🧭\n";
    $mensaje .= "Ráfaga de viento: {$datosClima['rfgviento']} m/s 💨\n";
    $mensaje .= "Nubosidad: {$datosClima['nubosidad']}% ☁️";

    $url = "https://api.telegram.org/bot$botToken/sendMessage?chat_id=$chatId&text=" . urlencode($mensaje);
    

    $response = file_get_contents($url);

    if ($response === FALSE) {
        echo 'Error al enviar el mensaje';
    } else {
        echo 'Mensaje enviado exitosamente';
    }
} else {
    http_response_code(405);
    echo 'Método no permitido';
}
?>