/* import { productos } from "./stock.js"; */

const traerProductos = async () => {

  try {

    const response = await fetch('/stock.json');
    const data = await response.json();

    return data;
    
  } catch (error) {

    console.log ('Hubo un error', error)
    
  };
};

document.addEventListener("DOMContentLoaded", () => {
  
  
  cargarStorage()
  pintarProductos();
  pintarCarrito();
  agregarProductos();
});

const carrito = []

async function pintarProductos() {

    const tienda = document.getElementById('tienda');
    const productos =  await traerProductos(); 
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
             <p class="infoProdu mt-5 d-flex justify-content-between font-italic">${nombre}<span>$USD ${precio}</span></p>
             <img src="${imgHover}" alt="buso nike gris" class="hoverImg card-img-top">
             <button type="button" id="${id}" class="btn mt-5 btn-light text-center">AGREGAR</button>
        `

        tienda.appendChild(producto);

        producto.querySelector('button')
        .addEventListener('click', ()=> {
            agregarProductos(id)
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              toast:true,
              title: 'PRODUCTO AGREGADO AL CARRITO!',
              showConfirmButton: false,
              timer: 1200
            })

        })

    })
        
}
pintarProductos();

async function agregarProductos(id){

const stock = await traerProductos();
    
let producto = stock.find(producto => producto.id === id);
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
             <p class="infoProdu mt-5 d-flex justify-content-center font-italic"> ${p.nombre} </p>
             <p class="infoProdu mt-5 d-flex justify-content-center font-italic"> <span>$USD ${p.precio}</span></p>
             <img src="${p.imgHover}" alt="" class="hoverImg card-img-top">
             <button class="btn btn-light">Eliminar</button>
        `
        producto.querySelector('button').addEventListener('click', () =>{
          
          Swal.fire({
            title: 'Estas seguro que queres eliminar el producto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2b2b2b',
            cancelButtonColor: '#2b2b2b',
            confirmButtonText: 'SI',
            cancelButtonText: 'NO',
          }).then((result) => {
            if (result.isConfirmed) {
              eliminarProductoCarrito(indice)
              Swal.fire({
                position: 'top-end',
                icon: 'warning',
                toast:true,
                title: `EL PRODUCTO "${p.nombre}" FUE ELIMINADO`,
                showConfirmButton: false,
                timer: 1200
              })
            }
          })

        }
        )
         carritoHTML.appendChild(producto);

         
    });
} ;
function eliminarProductoCarrito(indice) {

  carrito[indice].cantidad--; 

  /* carrito[indice].cantidad === 0 && carrito.splice(indice,1); */ //OPERADOR LOGICO AND

  if(carrito[indice].cantidad === 0) {

    carrito.splice(indice,1);

  }
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

  guardarStorage();
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



