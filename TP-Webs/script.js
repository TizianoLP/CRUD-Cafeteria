let header=
    `
    <nav class="socialmedia">
    <ul>
        <li><a href="https://www.instagram.com/vedra.cafe/?igshid=MzRlODBiNWFlZA%3D%3D"><img src="Instagram.png" alt="Instagram"></a></li>
        <li><a><img src="X.png" alt="Twitter"></a></li>
    </ul>
    </nav>
    <a href="index.html">
    <img src="mainlogo.jpg" class="mainlogo" alt="Logo">
    </a>
    <nav>
    <ul>
        <li><a href="Bio.html">Quienes somos</a></li>
        <li><a href="Menu.html">Menú</a></li>
        <li><a href="Form.html">Contacto</a></li>
    </ul>
    </nav>
    `
document.getElementById("idheader").innerHTML=header

let footer=
    `
    © 2023 Vedra Cafe | Todos los derechos reservados | Terminos y Condiciones
    `
document.getElementById("idfooter").innerHTML=footer

document.getElementById("formularioContacto").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente
    
    // Obtener los valores de los campos del formulario
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var mensaje = document.getElementById("mensaje").value;
    var aceptarNovedades = document.getElementById("novedades").checked;
    var aceptarPoliticaPrivacidad = document.getElementById("privacidad").checked;

    if (nombre.trim() === "" || apellido.trim() === "" || mensaje.trim() === "" || (!aceptarNovedades || !aceptarPoliticaPrivacidad)) {
        // Mostrar un mensaje indicando qué campo falta completar
        var mensajeError = "Por favor, complete los siguientes campos: ";
        if (nombre.trim() === "") mensajeError += "Nombre, ";
        if (apellido.trim() === "") mensajeError += "Apellido, ";
        if (mensaje.trim() === "") mensajeError += "Mensaje, ";
        if (!aceptarNovedades || !aceptarPoliticaPrivacidad) mensajeError += "Acepte los términos, ";
        alert(mensajeError.slice(0, -2));
        return;
    }

    // Resto del código para enviar el formulario a la API y mostrar la respuesta
    fetch('https://jsonplaceholder.typicode.com/comments', {
        method: 'POST',
        body: JSON.stringify({
            nombre: nombre,
            apellido: apellido,
            mensaje: mensaje,
            novedades: aceptarNovedades,
            politicaPrivacidad: aceptarPoliticaPrivacidad
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => response.json())
    .then(json => {
        // Agregar la respuesta de la API al div de respuestaAPI
        var respuestaDiv = document.getElementById("respuestaAPI");
        respuestaDiv.innerHTML = `<strong>${nombre} ${apellido}</strong>, ${mensaje}`;

        // Establecer un ancho máximo para el contenido de respuestaAPI
        respuestaDiv.style.maxWidth = "80%";

        // Deshabilitar el botón de enviar después de enviar el formulario
        document.getElementById("enviarBtn").disabled = true;

        // Mostrar la respuesta de la API en la consola
        console.log(json);
    })
    .catch(error => {
        console.error("Error al hacer la solicitud a la API:", error);
        alert("Ocurrió un error al enviar el formulario. Por favor, inténtelo nuevamente.");
    });
});

