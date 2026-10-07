function validarCorreo(correo){
    const correoElectronico=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return correoElectronico.test(correo);
}
function validarContraseña(contraseña){
    return contraseña.trim().length >=8;
}
function validarNumeroControl(numControl){
    const control = /^\d{7}$/;
    return control.test(numControl);
}