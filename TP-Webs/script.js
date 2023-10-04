let header=
    `
    <nav class="socialmedia">
    <ul>
        <li><a><img src="Instagram.png" alt="Instagram"></a></li>
        <li><a><img src="X.png" alt="Twitter"></a></li>
    </ul>
    </nav>
    <a href="index.html">
    <img src="mainlogo.jpg" class="mainlogo">
    </a>
    <nav>
    <ul>
        <li><a href="Menu.html">Menu</a></li>
        <li><a href="Form.html">Iniciar Sesion</a></li>
        <li><a href="Bio.html">Quienes somos</a></li>
    </ul>
    </nav>
    `
document.getElementById("idheader").innerHTML=header

let footer=
    `
    © 2023 Cafeteria | Todos los derechos reservados | Terminos y Condiciones 
    `
document.getElementById("idfooter").innerHTML=footer