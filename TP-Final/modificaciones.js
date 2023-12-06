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

const app = Vue.createApp({
    data() {
        return {
            nombre: '',
            apellido: '',
            dni: '',
            puesto: '',
            salario: '',
            turno: '',
            mostrarDatosEmpleado: false,
        };
    },
    methods: {
        obtenerEmpleado() {
            fetch(URL + 'empleados/' + this.dni)
                .then(response => response.json())
                .then(data => {
                    this.nombre = data.nombre;
                    this.apellido = data.apellido;
                    this.puesto = data.puesto;
                    this.salario = data.salario;
                    this.turno = data.turno;
                    this.mostrarDatosEmpleado = true;
                })
                .catch(error => console.error('Error:', error));
            },
        guardarCambios() {
            const formData = new FormData();
            formData.append('nombre', this.nombre);
            formData.append('apellido', this.apellido);
            formData.append('dni',this.dni);
            formData.append('puesto', this.puesto);
            formData.append('salario', this.salario);
            formData.append('turno', this.turno);

            fetch(URL + 'empleados/' + this.dni, {
                method: 'PUT',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    alert('Datos actualizados');
                    this.limpiarFormulario();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al actualizar datos');
                });
        },
        limpiarFormulario() {
            this.nombre = '';
            this.apellido = '';
            this.puesto = '';
            this.salario = '';
            this.turno = '';
            this.mostrarDatosEmpleado = false;
        }
    }
});

app.mount('#app');
