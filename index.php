<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

    <script src="https://kit.fontawesome.com/56497fa989.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/estilos.css">
    <title>Mi Clima</title>
</head>
<body>
    <header>
        <Nav>
           <h1>Mi Clima</h1>
           <div id="busqueda">
            <input type="text" name="ubicacion" id="placeInput" placeholder="Tiempo atmosferico en ..." oninput="buscarSugerencias()">
            <button onclick="obtenerCoordenadas()"><i class="fa-solid fa-magnifying-glass"></i></button>
           </div>
           <button onclick="enviarMensaje()">Enviar reporte de clima <i class="fa-brands fa-telegram"></i></button>
        </Nav>
        <section>
            <p id="fecha-hora"></p>
            <div id="iconos">
                <i class="fa-solid fa-cloud-sun"></i>
                <i class="fa-solid fa-cloud-sun-rain"></i>
                <i class="fa-solid fa-cloud-rain"></i>
            </div>
        </section>
        <div class="sugerencia-item"  onclick="obtenerUbicacionUsuario()"> <i class="fa-solid fa-location-dot"></i> Mi ubicacion actual</div>
        <div id="sugerencias"></div>
    </header>
    <main>
        <?php
            if(isset($_GET['seccion'])){
                $seccion=$_GET['seccion'];
                switch ($seccion) {
                    case 'inisio':
                        include("php/inisio.php");
                        break;
                    case 'mision':
                        include("php/mision.php");
                        break;
                    case 'contacto':
                        include("php/contacto.php");
                        break;
                    default:
                        include("php/inisio.php");
                        break;
                }
            }else{
                include("php/diseno/inicio.php");
            }
        ?>
    </main>
    <footer>
        <p>@Derechos recervados por: Barrera Sánchez Uriel</p>
    </footer>
    <script src="js/fecha.js"></script>
    <script src="js/ubicacion.js"></script>
</body>
</html>
