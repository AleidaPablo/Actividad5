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

        if (!validarContraseña(clave)) {
            mensajeError.textContent = 'La contraseña debe tener al menos 8 caracteres';
            return;
        }

        if (!validarNumeroControl(numControl)) {
            mensajeError.textContent = 'El número de control debe tener 7 dígitos';
            return;
        }

        if (isNaN(edad) || edad <= 0) {
            mensajeError.textContent = 'Ingresa una edad válida.';
            return;
        }

        if (edad >= 18) {
            contenidoModalEdad.innerHTML = `<i class="bi bi-check-circle-fill text-success fs-1 mb-2"></i><h5>El usuario <strong>${nombre}</strong> es <u>MAYOR DE EDAD</u> (${edad} años).</h5>`;
        } else {
            contenidoModalEdad.innerHTML = `<i class="bi bi-exclamation-triangle-fill text-warning fs-1 mb-2"></i> <h5>El usuario <strong>${nombre}</strong> es <u>MENOR DE EDAD</u> (${edad} años).</h5>`;
        }
        
        modalEdad.show();
        formularioUsuario.reset();
    });
});