import { productos } from "./stock.js";

document.addEventListener("DOMContentLoaded", () => {
  cargarStorage()
  pintarProductos();
  pintarCarrito();
});

const carrito = []

function pintarProductos() {

    const tienda = document.getElementById('tienda');
    productos.forEach(({nombre,img,imgHover,precio, id}) => { // DESESTRUCTURACION
        
        let producto = 
         document.createElement('div');
         producto.classList.add('col-12');  
         producto.classList.add('col-md-4'); 
         //producto.classList.add('row'); 
         producto.classList.add('d-flex'); 
         producto.classList.add('mb-5'); 
         producto.classList.add('aling-items-center'); 
         producto.classList.add('justify-content-center');  

        producto.innerHTML = `
        
        
        <div class="card d-flex justify-content-between">
           <div class="card-body text-center">
           <h3 class="d-flex justify-content-center">${nombre}</h3>
             <img src="${img}" class=" card-img-top" alt="buso nike gris">
             <p class="infoProdu mt-5 d-flex justify-content-between font-italic">Buso nike <span>$USD ${precio}</span></p>
             <img src="${imgHover}" alt="buso nike gris" class="hoverImg card-img-top">
             <button type="button" id="${id}" class="btn mt-5 btn-light text-center">AGREGAR</button>
        `

        tienda.appendChild(producto);

        producto.querySelector('button')
        .addEventListener('click', ()=> {
            agregarProductos(id)

        })

    })
        
}
pintarProductos();

function agregarProductos(id){
    
let producto = productos.find(producto => producto.id === id);
 // validacion de carga del mismo producto 
let productoCargado = carrito.find(producto => producto.id == id)

  if(productoCargado) {
    productoCargado.cantidad++; // OPERADOR AVANZADO ++
    console.log(carrito);

  } else {
    producto.cantidad = 1;
    carrito.push(producto);
    console.log(carrito);

  }
  
  pintarCarrito(); 
  totalCompra();
  guardarStorage ();
}

function pintarCarrito() {
    
    let carritoHTML=document.querySelector('#carrito');
    carritoHTML.innerHTML = '';
    
    carrito.forEach((p, indice) =>{
        let producto = document.createElement('div');
         producto.classList.add('col-12'); 
         producto.classList.add('col-md-4'); 
         producto.classList.add('d-flex'); 
         producto.classList.add('mb-3'); 
         producto.classList.add('p-4'); 
         producto.classList.add('justify-content-between'); 
         producto.classList.add('row'); 


        producto.innerHTML = `

         <div class="card">
           <div class="card-body text-center p-3">
           <h1 class="d-flex justify-content-center">${p.nombre}</h1>
             <img src="${p.img}" class=" card-img-top" alt="buso nike gris">
             <p>Cantidad: ${p.cantidad}</p>
             <p class="infoProdu mt-5 d-flex justify-content-between font-italic">Buso nike <span>$USD ${p.precio}</span></p>
             <img src="${p.imgHover}" alt="buso nike gris" class="hoverImg card-img-top">
             <button class="btn btn-light">Eliminar</button>
        `
        producto.querySelector('button').addEventListener('click', () =>{
          eliminarProductoCarrito(indice)

        }
        )
         carritoHTML.appendChild(producto);

         
    })
} 
function eliminarProductoCarrito(indice) {
  carrito[indice].cantidad--;

  carrito[indice].cantidad === 0 && carrito.splice(indice,1); //OPERADOR LOGICO AND

  /* if(carrito[indice].cantidad === 0) {

    carrito.splice(indice,1);

  } */
  pintarCarrito();
  totalCompra();

}

function totalCompra () {

  let total = 0;
  carrito.forEach((p) => {
    total += p.precio * p.cantidad;

  })
  console.log(total);
  const t = document.getElementById('total'); 

  t.innerHTML = `<h5>${total}usd</h5>`

  
}
function guardarStorage () {
  localStorage.setItem('carritoLocal', JSON.stringify(carrito));
}

function cargarStorage () {
  const carritoLocal = localStorage.getItem('carritoLocal');

  if(carritoLocal){

    carrito.push(...JSON.parse(carritoLocal));  //SPREAD

  }
}



