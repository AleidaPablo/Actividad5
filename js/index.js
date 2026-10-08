document.addEventListener('DOMContentLoaded', () => {
    const correoUsuarioSesion = sessionStorage.getItem('usuario');
    const nombreUsuarioNavbar = document.getElementById('nombre-usuario-navbar');
    if (!correoUsuarioSesion) {
        window.location.href = 'login.html';
        return;
    }
    nombreUsuarioNavbar.textContent = correoUsuarioSesion;
    document.getElementById('boton-cerrar-sesion').addEventListener('click', () => {
        sessionStorage.removeItem('usuario');
        window.location.href = 'login.html';
    });
    const botonHamburguesa = document.getElementById('boton-hamburguesa');
    const menuLateral = document.getElementById('menu-lateral');
    const contenidoPrincipal = document.getElementById('contenido-principal');
    botonHamburguesa.addEventListener('click', () => {
        menuLateral.classList.toggle('oculto');
        contenidoPrincipal.classList.toggle('expandido');
    });
    const formularioUsuario = document.getElementById('formulario-usuario');
    const mensajeError = document.getElementById('mensaje-error');
    const elementoModalEdad = document.getElementById('modal-edad');
    const modalEdad = new bootstrap.Modal(elementoModalEdad);
    const contenidoModalEdad = document.getElementById('contenido-modal-edad');
    formularioUsuario.addEventListener('submit', (e) => {
        e.preventDefault();
        mensajeError.textContent = '';
        const nombre = document.getElementById('nombre-usuario').value.trim();
        const correo = document.getElementById('correo-usuario').value.trim();
        const clave = document.getElementById('contraseña-usuario').value;
        const numControl = document.getElementById('numero-control').value.trim();
        const edad = parseInt(document.getElementById('edad-usuario').value, 10);
        
        if (nombre === '') {
            mensajeError.textContent = 'Ingresa el nombre del usuario';
            return;
        }

        if (!validarCorreo(correo)) {
            mensajeError.textContent = 'Ingresa un correo electrónico válido';
            return;
        }

        const erroresPass = erroresPassword(clave);
        if (erroresPass.length > 0) {
            mensajeError.textContent = `Contraseña inválida: ${erroresPass[0]}`;
            return;
        }

        if (!validarNumeroControl(numControl)) {
            mensajeError.textContent = 'El número de control debe tener exactamente 8 dígitos';
            return;
        }

        if (isNaN(edad) || edad <= 0) {
            mensajeError.textContent = 'Ingresa una edad válida.';
            return;
        }

        if (edad >= 18) {
            contenidoModalEdad.innerHTML = 
            `<div class="icono-modal-contenedor mx-auto mb-3 text-success-pastel"> <i class="bi bi-patch-check-fill"></i>
            </div>
            <h4 class="fw-semibold mb-1" style="color: #3c2a4d;">El usuario <span class="texto-destacado-purple">${nombre}</span>
            </h4>
            <p class="badge-edad-pastel mayor">MAYOR DE EDAD (${edad} años)</p>`;
        } else {
    contenidoModalEdad.innerHTML =
        `<div class="icono-modal-contenedor mx-auto mb-3 text-warning-pastel">
            <i class="bi bi-exclamation-heart-fill"></i>
        </div>
        <h4 class="fw-semibold mb-1" style="color: #3c2a4d;">
            El usuario <span class="texto-destacado-purple">${nombre}</span>
        </h4>
        <p class="badge-edad-pastel menor">MENOR DE EDAD (${edad} años)</p>`;
        }
        
        modalEdad.show();
        formularioUsuario.reset();
    });
});