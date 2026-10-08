function validarCorreo(correo) {
  const correoElectronico = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return correoElectronico.test(correo);
}

const CONTRASENAS_COMUNES = [
  'password', 'contraseña', '12345678', '123456789', 'qwertyui',
  'abc12345', 'password1', 'admin123', 'iloveyou', '11111111'
];

function erroresPassword(pass) {
  const errores = [];
  if (typeof pass !== 'string') return ['Contraseña inválida'];

  if (pass.length < 8)            errores.push('Mínimo 8 caracteres');
  if (pass.length > 20)           errores.push('Máximo 20 caracteres');
  if (/\s/.test(pass))            errores.push('No debe tener espacios');
  if (!/[a-z]/.test(pass))        errores.push('Falta una minúscula');
  if (!/[A-Z]/.test(pass))        errores.push('Falta una mayúscula');
  if (!/\d/.test(pass))           errores.push('Falta un número');
  if (!/[^A-Za-z0-9]/.test(pass)) errores.push('Falta un símbolo (por ejemplo ! @ # $ %)');
  if (/(.)\1{2,}/.test(pass))     errores.push('No repitas el mismo carácter 3 veces seguidas');
  if (CONTRASENAS_COMUNES.includes(pass.toLowerCase()))
                                  errores.push('Es una contraseña demasiado común');
  return errores;
}

function validarPassword(pass) {
  return erroresPassword(pass).length === 0;
}

function validarNumeroControl(numControl) {
  const control = /^\d{8}$/;   
  return control.test(numControl);
}