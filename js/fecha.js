function actualizarHora() {
    // Obtiene la fecha y la hora actual
    const fechaHora = new Date();

    // Obtiene el día, mes y año
    const dia = fechaHora.getDate();
    const mes = fechaHora.toLocaleString('default', { month: 'long' });
    const ano = fechaHora.getFullYear();

    // Obtiene la hora y los minutos
    const horas = fechaHora.getHours();
    const minutos = fechaHora.getMinutes();

    // Formatea la fecha y la hora
    const fechaHoraFormateada = `${dia} ${mes} ${ano} ${horas}:${minutos} horas`;

    // Muestra la fecha y la hora en el elemento HTML
    document.getElementById('fecha-hora').innerText = fechaHoraFormateada;

    // Solicita la próxima animación de fotograma antes de redibujar
    requestAnimationFrame(actualizarHora);
}

// Llama a la función inicialmente para mostrar la hora al cargar la página
actualizarHora();