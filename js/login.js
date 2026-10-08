const formLogin = document.getElementById('formLogin');

if (formLogin) {
  const inputCorreo = document.getElementById('correo');
  const inputPassword = document.getElementById('password');
  const chkRecordar = document.getElementById('recordar');
  const mensajeError = document.getElementById('error');

  const correoGuardado = localStorage.getItem('correoRecordado');
  if (correoGuardado) {
    inputCorreo.value = correoGuardado;
    chkRecordar.checked = true;
  }

  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    mensajeError.textContent = '';

    const correo = inputCorreo.value.trim();
    const password = inputPassword.value;

    if (!validarCorreo(correo)) {
      mensajeError.textContent = 'Escribe un correo electrónico válido.';
      inputCorreo.focus();
      return;
    }

    const faltas = erroresPassword(password);
    if (faltas.length > 0) {
      mensajeError.textContent = faltas.join(' · ');
      inputPassword.focus();
      return;
    }

    if (chkRecordar.checked) {
      localStorage.setItem('correoRecordado', correo);
    } else {
      localStorage.removeItem('correoRecordado');
    }

    sessionStorage.setItem('usuario', correo);
    window.location.href = 'index.html';
  });

  document.getElementById('olvide').addEventListener('click', (e) => {
    e.preventDefault();
    mensajeError.textContent = 'Función no disponible.';
  });
}