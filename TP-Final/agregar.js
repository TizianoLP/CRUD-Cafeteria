const URL = "https://tizianolp.pythonanywhere.com/";

let header=
    `
    <nav class="socialmedia">
    <ul>
        <li><a href="https://www.instagram.com/vedra.cafe/?igshid=MzRlODBiNWFlZA%3D%3D"><img src="Instagram.png" alt="Instagram"></a></li>
        <li><a><img src="X.png" alt="Twitter"></a></li>
    </ul>
    </nav>
    <a href="https://vedracafe.netlify.app/index.html">
    <img src="mainlogo.jpg" class="mainlogo" alt="Logo">
    </a>
    <nav>
    <ul>
        <li><a href="https://vedracafe.netlify.app/bio">Quienes somos</a></li>
        <li><a href="https://vedracafe.netlify.app/menu">Menú</a></li>
        <li><a href="https://vedracafe.netlify.app/form">Contacto</a></li>
    </ul>
    </nav>
    `
document.getElementById("idheader").innerHTML=header

let footer=
    `
    © 2023 Vedra Cafe | Todos los derechos reservados | Terminos y Condiciones
    `
document.getElementById("idfooter").innerHTML=footer

document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault();

    var formData = new FormData();
    formData.append('nombre', document.getElementById('nombre').value);
    formData.append('apellido', document.getElementById('apellido').value);
    formData.append('dni', document.getElementById('dni').value);
    formData.append('puesto', document.getElementById('puesto').value);
    formData.append('salario', document.getElementById('salario').value);
    formData.append('turno', document.getElementById('turno').value);

    fetch(URL + 'empleados', {
        method: 'POST',
        body: formData
    })
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function (data) {
        alert('Empleado agregado correctamente.');

        document.getElementById('nombre').value = "";
        document.getElementById('apellido').value = "";
        document.getElementById('dni').value = "";
        document.getElementById('puesto').value = "";
        document.getElementById('salario').value = "";
        document.getElementById('turno').value = "";
    })
    .catch(function (error) {
        alert('Error al agregar al empleado.');
    });
});
