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

fetch(URL + 'empleados')
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al obtener los empleados.');
        }
    })
    .then(data => {
        let tablaEmpleados = document.getElementById('tablaEmpleados');

        data.forEach(empleado => {
            let fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${empleado.nombre}</td>
                <td>${empleado.apellido}</td>
                <td>${empleado.dni}</td>
                <td>${empleado.puesto}</td>
                <td>${empleado.salario}</td>
                <td>${empleado.turno}</td>
            `;
            tablaEmpleados.appendChild(fila);
        });
    })
    .catch(error => {
        // Código para manejar errores
        alert(error.message);
    });
