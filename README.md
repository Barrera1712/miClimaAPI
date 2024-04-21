# miClimaAPIs

## By: Barrera Sánchez Uriel

Aplicación web y bot de Telegram que proporcionan información meteorológica en tiempo real utilizando las APIs de OpenCage y OpenWeatherMap.


## Configuración:


Opten API kEY de OpenCage:  
  
> Antes de comenzar, asegúrate de tener un API KEY de OpenCage y OpenWeatherMap, Asi como un botToken y Chat Id de Telegram.

> Si aún no cuentas con ello:


1. Regístrate en [OpenCage](https://opencagedata.com/).
2. Crea una nueva aplicación y opten tu API Key. Una vez tengas tu API Key abre el archivo `js/ubicacion.js.` Busca la constante llamada `apiKeyOpenCage` y remplaza el texto `Tu_ApiKey_OpenCage` por la API Key que te proporciono OpenCage al crear tu aplicación.


3. Regístrate en [OpenWeatherMap](https://openweathermap.org/).
4. Crea una nueva aplicación y opten tu API kEY Una vez tengas tu API Key abre el archivo `js/ubicacion.js`. Busca la constante llamada `apiKeyOpenWeatherMap` y remplaza el texto `Tu_ApiKey_OpenWeatherMap` por la API Key que te proporciono OpenCage al crear tu aplicación.

5. Crea un bot en Telegram y opten el botToken y chatId.
6. Una vez tengas tu botToken y chatId abre el archivo `php/function/enviar-mensaje.php`. Busca las variables `$botToken`, `$chatId` y remplaza los textos `Tu_Bot_Token`, `Tu_Chat_Id` por el botToken y chatId que te proporciono Telegram.


## Requisitos del Sistema:


- Servidor web con soporte para PHP (por ejemplo, Apache, Nginx). PHP versión 7.x o superior.
- API Key de OpenCage, API Key de OpenWeatherMap, botToken y chatId descritos anteriormente.


## Instrucciones de Implementación:


1. Clona este repositorio en tu servidor web o descarga los archivos en tu máquina local.
2. Configura las APIs Keys, botToken y chatId.
3. Accede a la URL de tu aplicación en un navegador web.
