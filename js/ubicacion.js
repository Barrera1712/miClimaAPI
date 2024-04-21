// Cambia Tu_ApiKey_OpenCage por el apiKey proporcionada al crear una aplicacion en OpenCage API y Tu_ApiKey_OpenWeatherMap por el apiKey proporcionada al crear una alicacion en OpenWeatherMap API
const apiKeyOpenCage = 'Tu_ApiKey_OpenCage';
const apiKeyOpenWeatherMap = 'Tu_ApiKey_OpenWeatherMap';

let datosClimaGlobal = {};

document.addEventListener('DOMContentLoaded', obtenerUbicacionUsuario);

function obtenerUbicacionUsuario() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitud = position.coords.latitude;
                const longitud = position.coords.longitude;
                mostrarDatosUbicacion(latitud, longitud);
                obtenerDatosClima(latitud, longitud);
            },
            error => {
                console.error('Error al obtener la ubicación del usuario:', error);
            }
        );
    } else {
        console.error('Geolocalización no es compatible en tu navegador.');
    }
}

async function mostrarDatosUbicacion(latitud, longitud) {
    const openCageUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitud}+${longitud}&key=${apiKeyOpenCage}`;

    try {
        const response = await fetch(openCageUrl);
        const data = await response.json();
        const location = data.results[0].formatted;
        document.getElementById('location').innerHTML = `Radar meteorológico en ${location}`;
        mostrarMapa(latitud, longitud, location);
    } catch (error) {
        console.error('Error al obtener la ubicación:', error);
    }
}

async function obtenerDatosClima(latitud, longitud) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apiKeyOpenWeatherMap}&lang=es`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        mostrarDatosClima(data);
        datosClimaGlobal = {
            temperatura: (data.main.temp - 273.15).toFixed(2),
            descripcionClima: data.weather[0].description,
            presion: data.main.pressure,
            humedad: data.main.humidity,
            velviento: data.wind.speed,
            dirviento: data.wind.deg,
            rfgviento: data.wind.gust,
            nubosidad: data.clouds.all,
            nombreLugar: data.name,
        };
    } catch (error) {
        console.error('Error al obtener datos de OpenWeatherMap:', error);
    }
}

function mostrarDatosClima(data) {
    const weatherDataElement = document.getElementById('weather-data');
    const maselement =document.getElementById('mas');

    const temperaturaCelsius = (data.main.temp - 273.15).toFixed(2);
    const descripcionClima = data.weather[0].description;
    const temperaturaNocturnaCelsius = (data.main.temp_min - 273.15).toFixed(2);
    const iconoClima = data.weather[0].icon;
    const iconoUrlBase = 'http://openweathermap.org/img/wn/';
    const pression =data.main.pressure;
    const humedad=data.main.humidity;

    const velviento=data.wind.speed;
    const dirviento=data.wind.deg;
    const rfgviento=data.wind.gust;

    const nubosidad=data.clouds.all;
    

    weatherDataElement.innerHTML = `
        <div id="tem-tie">
            <div>
                <p id="temperatura">${temperaturaCelsius}°C</p>
                <p id="tiempo">${descripcionClima}</p>
                <p id="temperatura-diurna">Día ${temperaturaCelsius} °C - Noche ${temperaturaNocturnaCelsius} °C</p>
            </div>
            <img src="${iconoUrlBase}${iconoClima}@2x.png" alt="Icono del clima">
        </div>
    `;

    maselement.innerHTML= `
        <div>
            <div>
                <p><i class="fa-solid fa-temperature-low"></i> Temperatura: ${temperaturaCelsius} °C</p>
                <p><i class="fa-solid fa-wind"></i> Presion: ${pression} hPA</p>
                <p><i class="fa-solid fa-snowflake"></i> Temperatura minima: ${temperaturaCelsius} °C</p>
                <p><i class="fa-solid fa-sun"></i> Temperatura maxima: ${temperaturaCelsius} °C</p>
            </div>
        </div>
        <div class="grafica">
            <canvas id="myCanvas" width="150" height="150"></canvas>
            <i class="fa-solid fa-droplet"></i>
            <p>Humedad</p>
        </div>
        <div>
            <h2>Viento</h2>
            <p><i class="fa-solid fa-wind"></i> Velocidad: ${velviento} m/s</p>
            <p><i class="fa-brands fa-nfc-directional"></i> Direccion: ${dirviento} °</p>
            <p><i class="fa-solid fa-burst"></i> Rafaga: ${rfgviento} m/s</p>
        </div>
        <div class="grafica">
            <canvas id="myCanvas2" width="150" height="150"></canvas>
            <i class="fa-solid fa-cloud"></i>
            <p>Nubosidad</p>
        </div>
    `;

    drawCircleWithPercentage("myCanvas", humedad);
    drawCircleWithPercentage("myCanvas2", nubosidad);
}

let map;  // Variable global para almacenar la instancia del mapa

function mostrarMapa(latitud, longitud, location) {
    if (!map) {
        // Crea el mapa solo si no existe
        map = L.map('map').setView([latitud, longitud], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    } else {
        // Actualiza la vista del mapa si ya existe
        map.setView([latitud, longitud], 15);
    }

    // Elimina marcadores antiguos y agrega uno nuevo
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            layer.remove();
        }
    });

    L.marker([latitud, longitud]).addTo(map)
        .bindPopup(location)
        .openPopup();
}

function buscarSugerencias() {
    const inputPlace = document.getElementById('placeInput');
    const place = inputPlace.value.trim();

    if (place !== '') {
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(place)}&key=${apiKeyOpenCage}&limit=5`;

        axios.get(apiUrl)
            .then(response => {
                const results = response.data.results;
                mostrarSugerencias(results);
            })
            .catch(error => {
                console.error('Error al obtener sugerencias:', error);
            });
    } else {
        document.getElementById('sugerencias').innerHTML = '';
    }
}

function mostrarSugerencias(sugerencias) {
    const sugerenciasDiv = document.getElementById('sugerencias');
    sugerenciasDiv.innerHTML = '';

    sugerencias.forEach(sugerencia => {
        const sugerenciaItem = document.createElement('div');
        sugerenciaItem.textContent = sugerencia.formatted;
        sugerenciaItem.classList.add('sugerencia-item');

        sugerenciaItem.addEventListener('click', () => {
            document.getElementById('placeInput').value = sugerencia.formatted;
            sugerenciasDiv.innerHTML = '';
        });

        sugerenciasDiv.appendChild(sugerenciaItem);
    });
}

async function obtenerCoordenadas() {
    const inputPlace = document.getElementById('placeInput');
    const place = inputPlace.value.trim();

    if (place !== '') {
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(place)}&key=${apiKeyOpenCage}`;

        try {
            const response = await axios.get(apiUrl);
            const results = response.data.results;

            if (results.length > 0) {
                const location = results[0].formatted;
                const coordinates = results[0].geometry;
                mostrarDatosUbicacion(coordinates.lat, coordinates.lng);
                obtenerDatosClima(coordinates.lat, coordinates.lng);
            } else {
                alert('No se encontraron coordenadas para el lugar ingresado.');
            }
        } catch (error) {
            console.error('Error al obtener coordenadas:', error);
        }
    } else {
        alert('Por favor, ingrese un lugar.');
    }
    inputPlace.value='';
}

function drawCircleWithPercentage(canvasId, percentage) {
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext("2d");

    // Calcula el radio y el centro del círculo
    var radius = canvas.width / 2;
    var centerX = radius;
    var centerY = radius;

    // Calcula el ángulo correspondiente al porcentaje
    var startAngle = -Math.PI / 2; // Inicia desde las 12 en punto
    var angle = (percentage / 100) * 2 * Math.PI;

    // Dibuja el círculo
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 10, startAngle, startAngle + angle);
    ctx.lineWidth = 20; // Ancho del contorno
    ctx.strokeStyle = "#3498db"; // Color del contorno
    ctx.stroke();

    // Coloca el porcentaje dentro del círculo
    ctx.fillStyle = "#2c3e50"; // Color del texto
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(percentage + "%", centerX, centerY);
}

function enviarMensaje() {
    const url = 'php/function/enviar-mensaje.php';

    // Realizar la solicitud POST con los datos del clima
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosClimaGlobal),
    })
    .then(response => response.text())
    .catch(error => console.error(error));
}
