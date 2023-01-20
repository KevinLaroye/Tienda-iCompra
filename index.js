const barraDeBusqueda = document.querySelector("#barraDeBusqueda")
const productos = document.querySelector("#productos")
const cantidadCarrito = document.querySelector(".badge")
const shoppingCart = document.querySelector("#shoppingCart")
const itemsCarrito = document.querySelector("#itemsCarrito")
const totalCarrito = document.querySelector("#totalCarrito")
const subtotalCarrito = document.querySelector("#subtotalCarrito")
const totalConTaxes = document.querySelector("#totalConTaxes")
const confirmarCompra = document.querySelector("#confirmarCompra")
const tarjetas = document.querySelectorAll(".tarjetas")
let carritoDeCompras = JSON.parse(localStorage.getItem("data")) || []


// Código que debe ejecutarse al iniciar la página

function actualizarData(){

    localStorage.setItem("data", JSON.stringify(carritoDeCompras))

    cantidadCarrito.innerHTML = carritoDeCompras.length

    itemsCarrito.innerHTML = `Tienes un total de ${carritoDeCompras.length} productos en tu carrito`

    shoppingCart.innerHTML = ""

    // Código que actualiza la información en la tarjeta de finalización de compra

    let total = carritoDeCompras.reduce(function(acc, currentValue){
        return acc + parseInt(currentValue.precio.slice(1)) 
    }, 0)
    subtotalCarrito.innerHTML = `$${total}`
    totalConTaxes.innerHTML = `$${total + 20}`
    totalCarrito.innerHTML = `$${total + 20}`

}



// Función para tomar la data del archivo json y crear unas tarjetas en nuestro HTML

function crearTarjeta(inventario) {
    inventario.forEach((producto) => {

        const nuevoDiv = document.createElement('div')

        nuevoDiv.className = "col mb-5"

        nuevoDiv.innerHTML = `<div class="card h-100">
        <img class="itemImagen card-img-top" src="${producto.imagen}" alt="...">
        <div class="card-body p-4">
            <div class="text-center">
                <h5 class="itemNombre fw-bolder">${producto.producto}</h5>
                <p class="itemPrecio">$${producto.precio}</p>
            </div>
        </div>
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center"><btn class="addToCart btn btn-outline-dark mt-auto" href="#">Add to cart</btn></div>
        </div>
        </div>
        `

        productos.appendChild(nuevoDiv)
    })
}

// Funcion que toma la información dentro del array carritoDeCompras y la muestra en el carrito de compras en el HTML

function pintarCarrito() {
    carritoDeCompras.forEach(producto => {

        const nuevoDiv = document.createElement('div')

        nuevoDiv.className = "card mb-3"

        /* 
        Código para agregar una imágen a cada card dentro del carrito. No funciona ya que arroja el error GET http://127.0.0.1:5500/[object%20Object] 404 (Not Found)

                            <div>
                                <img
                                  src="${producto.producto}"
                                  class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
                              </div>
        */


        nuevoDiv.innerHTML = `
                        <div class="card-body">
                          <div class="d-flex justify-content-between">
                            <div class="d-flex flex-row align-items-center">
                              <div class="ms-3">
                                <h5>${producto.producto}</h5>
                              </div>
                            </div>
                            <div class="d-flex flex-row align-items-center">
                                <div style="width: 80px;">
                                    <h5 class="mb-0">${producto.precio}</h5>
                                </div>
                                <btn class="btnRemover btn btn-outline-dark" id="${producto.id}" href="#" ><i class="fas fa-trash-alt"></i></btn>
                            </div>
                          </div>
                        </div>
                            `

        shoppingCart.appendChild(nuevoDiv)
    })
}


// Funcion para agregar items al carrito
// Código que agrega un EventListener a los botones "addToCart" que trae información acerca de la tarjeta a la que
// pertenece el botón y agrega la información al carrito de compras

function addToCart() {
    const addToCart = document.querySelectorAll(".addToCart")



    addToCart.forEach(btn => {
        btn.addEventListener('click', e => {


            let botonPresionado = e.target
            let itemComprado = botonPresionado.parentElement.parentElement.parentElement
            let itemCompradoNombre = itemComprado.getElementsByClassName("itemNombre")[0].innerText
            let itemCompradoPrecio = itemComprado.getElementsByClassName("itemPrecio")[0].innerText
            // let itemCompradoImagen = itemComprado.getElementsByClassName("itemImagen")[0].src
            
            let itemCompradoId = Math.floor(Math.random() * 101)

            const productoComprado = {
                id: itemCompradoId,
                producto: itemCompradoNombre,
                precio: itemCompradoPrecio
                //imagen: itemCompradoImagen
            }

            carritoDeCompras.push(productoComprado)

            actualizarData();

            pintarCarrito()

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Producto agregado al carrito'
              })
        })
    })
}


// Función que elimina el elemento seleccionado del carrito y actualiza toda la información

function eliminarCarrito() {
    

    shoppingCart.addEventListener("click", e => {

        if (e.target.parentElement.classList.contains("btnRemover")) {

            let btnRemoverId = e.target.parentElement.getAttribute("id")

            carritoDeCompras = carritoDeCompras.filter(producto => producto.id != btnRemoverId)
            
            actualizarData()
            pintarCarrito()

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Producto eliminado del carrito'
              })
        }
    })
}


// Función para culminar compra en el carrito de compras


function terminarCompra(){
    confirmarCompra.addEventListener('click', e => {

        e.preventDefault()

        let inputs = document.querySelectorAll("#formularioCompra input")
        let completo = true

        inputs.forEach(input => {
            if(!input.value){
                completo = false
            }
        })

        if(completo){
            swal.fire({
                title: "Sólo un paso más antes de finalizar",
                html: '<input id="swal-input1" class="swal2-input" placeholder="Dirección">' +
                      '<input id="swal-input2" class="swal2-input" placeholder="Email">',
                focusConfirm: false,
                showCancelButton: true,
                preConfirm: () => {

                    let direccion = document.getElementById('swal-input1').value
                    let email = document.getElementById('swal-input2').value

                    if(!direccion || !email){
                        Swal.showValidationMessage("Por favor completa ambos campos");
                    }else{
                        return {
                            direccion: document.getElementById('swal-input1').value,
                            email: document.getElementById('swal-input2').value
                          }
                    }
                }
              }).then(result => {
                if (result.value) {

                  swal.fire({
                    title: "Compra realizada con éxito",
                    html: `Se ha enviado la información de tu compra al Email: ${result.value.email}`,
                    icon: "success"
                  });

                  carritoDeCompras = []
                  actualizarData();

                  inputs.forEach(input => {
                    input.value = ""
                })

                } else if (result.dismiss === swal.DismissReason.cancel) {
                  swal.fire({
                    title: "Operación cancelada",
                    icon: "error"
                  });
                }
              });
        }else {
            swal.fire({
                title: "Por favor completa todos los datos del Formulario",
                icon: "error"
              });
        }


    })
}


//Función que agrega una clase a la tarjeta seleccionada en el carrito de compras para que sea visible la tarjeta seleccionada

function seleccionarTarjeta(){
    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener('click', function(){
            tarjetas.forEach(tarjeta => tarjeta.classList.remove("seleccionado"))
            this.classList.add("seleccionado")
        })
    })
}


// Función asíncrona que da inicio a mi tienda

const iniciarTienda = async () => {
    const res = await fetch("./data.json");
    const data = await res.json();
    
    crearTarjeta(data);

    actualizarData();

    pintarCarrito()

    // Código que agrega un EventListener a la barra de Input y filtra el archivo json en base a lo tipeado

    barraDeBusqueda.addEventListener('input', (e) => {
        const searchInput = e.target.value.toLowerCase()

        productos.innerHTML = ""

        const inventarioNew = data.filter(producto => producto.producto.toLowerCase().includes(searchInput))

        crearTarjeta(inventarioNew)

    })

    addToCart();

    eliminarCarrito();

    terminarCompra();
    
    seleccionarTarjeta();

}


iniciarTienda();
