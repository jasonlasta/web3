
const form = document.getElementById('formulario');
form.addEventListener('submit', (e) => {
    e.preventDefault(); //evita que se recargue la web por defecto
    
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const ciudad = document.getElementById('ciudad').value;
    const mensaje = document.getElementById('mensaje').value;
    
    const datos = {
        nombre,
        apellido,
        ciudad,
        mensaje
}
console.log(datos);
})