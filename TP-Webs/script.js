let header=
    `
    <nav class="socialmedia">
    <ul>
        <li><a><img src="Instagram.png" alt="Instagram"></a></li>
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

    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var mensaje = document.getElementById("mensaje").value;
    var aceptarNovedades = document.getElementById("novedades").checked;
    var aceptarPoliticaPrivacidad = document.getElementById("privacidad").checked;

    if (nombre.trim() === "" || apellido.trim() === "" || mensaje.trim() === "") {
        alert("Por favor, complete los campos obligatorios.");
        return;
    }

    if (!aceptarNovedades && !aceptarPoliticaPrivacidad) {
        alert("Por favor, acepta recibir novedades y la política de privacidad para enviar el formulario.");
        return;
    } else if (!aceptarNovedades) {
        alert("Por favor, acepta recibir novedades para enviar el formulario.");
        return;
    } else if (!aceptarPoliticaPrivacidad) {
        alert("Por favor, acepta la política de privacidad para enviar el formulario.");
        return;
    }

    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => {
            console.log(json);
            alert("Formulario enviado correctamente. Respuesta de la API: " + JSON.stringify(json));
            // Deshabilitar el botón de enviar después de enviar el formulario
            document.getElementById("enviarBtn").disabled = true;
        })
        .catch(error => {
            console.error("Error al hacer la solicitud a la API:", error);
            alert("Ocurrió un error al enviar el formulario. Por favor, inténtelo nuevamente.");
        });
});

