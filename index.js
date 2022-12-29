import inventario from './data.json' assert {type: 'json'}
const barraDeBusqueda = document.querySelector("#barraDeBusqueda")
const productos = document.querySelector("#productos")
const cantidadCarrito = document.querySelector(".badge")
let carritoDeCompras = JSON.parse(localStorage.getItem("data")) || []
cantidadCarrito.innerHTML = carritoDeCompras.length

function crearTarjeta(inventario){
    inventario.forEach((producto) => {
        
        const nuevoDiv = document.createElement('div')
        
        nuevoDiv.className = "col mb-5"
    
        nuevoDiv.innerHTML = `<div class="card h-100>
        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
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

crearTarjeta(inventario)

barraDeBusqueda.addEventListener('input', (e) => {
    const searchInput = e.target.value.toLowerCase()
    
    productos.innerHTML = ""

    const inventarioNew = inventario.filter(producto => producto.producto.toLowerCase().includes(searchInput))

    crearTarjeta(inventarioNew)

})


const addToCart = document.querySelectorAll(".addToCart")
console.log(addToCart)

addToCart.forEach( btn => {
    btn.addEventListener('click', e => {


        let botonPresionado = e.target
        let itemComprado = botonPresionado.parentElement.parentElement.parentElement
        let itemCompradoNombre = itemComprado.getElementsByClassName("itemNombre")[0].innerText
        let itemCompradoPrecio = itemComprado.getElementsByClassName("itemPrecio")[0].innerText
        console.log(itemCompradoNombre)
        console.log(itemCompradoPrecio)

        const productoComprado = {
            producto: itemCompradoNombre,
            precio: itemCompradoPrecio
        }

        carritoDeCompras.push(productoComprado)
        console.log(carritoDeCompras)

        cantidadCarrito.innerHTML = carritoDeCompras.length

        localStorage.setItem("data", JSON.stringify(carritoDeCompras))
    })
})