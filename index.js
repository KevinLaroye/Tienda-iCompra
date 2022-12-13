/* function procesoDeCompra(){
    
let compra = "";
let total = 0;
let stockIphone = 10;
let stockIpad = 8;
let stockImac = 5;
let producto = "";
const precioIphone = 1000;
const precioIpad = 2000;
const precioImac = 5000;

function calculoCompra(articuloCompra, producto, precio, stock) {
    alert(
        `Usted quiere comprar ${articuloCompra} ${producto}(s) por un total de $${articuloCompra * precio
        }`
    );
}

alert("Bienvenido a tu tienda iCompra");
let edad = parseInt(prompt("Por favor ingrese su edad:"));

if (edad < 18) {
    alert("Debes ser mayor de edad para poder comprar");
} else {
    do {
        let articulo = prompt(`¿Qué te gustaría comprar?
     1. iPhone
     2. iPad
     3. iMac`);

        switch (articulo) {
            case "1":
                alert(`El precio del iPhone es de $1000.
                        Actualmente hay ${stockIphone} en stock`);

                let iphoneCompra = parseInt(
                    prompt("Ingrese la cantidad de iPhones que desea comprar")
                );

                calculoCompra(iphoneCompra, "iPhone", precioIphone, stockIphone);

                stockIphone -= iphoneCompra;

                total += iphoneCompra * precioIphone;

                compra = prompt(
                    "Desea comprar otro artículo? En caso contrario por favor escriba no"
                );

                if (compra != "no") {
                    break;
                } else {
                    alert(`Gracias por tu compra!
                    Tu total fue ${total}`);
                }
                break;
            case "2":
                alert(`El precio del iPad es de $2000.
                Actualmente hay ${stockIpad} en stock`);

                let ipadCompra = parseInt(
                    prompt("Ingrese la cantidad de iPads que desea comprar")
                );

                calculoCompra(ipadCompra, "iPad", precioIpad, stockIpad);

                stockIpad -= ipadCompra;

                total += ipadCompra * precioIpad;

                compra = prompt(
                    "Desea comprar otro artículo? En caso contrario por favor escriba no"
                );

                if (compra != "no") {
                    break;
                } else {
                    alert(`Gracias por tu compra!
            Tu total fue ${total}`);
                }
                break;
            case "3":
                alert(`El precio del iMac es de $5000.
                Actualmente hay ${stockImac} en stock`);

                let imacCompra = parseInt(
                    prompt("Ingrese la cantidad de iMacs que desea comprar")
                );

                calculoCompra(imacCompra, "iMac", precioImac, stockImac);

                stockImac -= imacCompra;

                total += imacCompra * precioImac;

                compra = prompt(
                    "Desea comprar otro artículo? En caso contrario por favor escriba no"
                );

                if (compra != "no") {
                    break;
                } else {
                    alert(`Gracias por tu compra!
            Tu total fue ${total}`);
                }
                break;
            default:
                alert(
                    "Por favor seleccione una de las opciones anteriores o escriba (no) para salir"
                );
                compra = prompt("¿Desea continuar su compra? Si/No").toLowerCase();
                break;
        }
    } while (compra != "no");
}} */

// Pre-entrega 2

const inventario = [
    { producto: "iPhone 11", precio: 400 },
    { producto: "iPhone 12", precio: 550 },
    { producto: "iPhone 13", precio: 700 },
    { producto: "iPhone 14", precio: 800 },
    { producto: "iPad 3", precio: 400 },
    { producto: "iPad 4", precio: 500 },
    { producto: "iPad 5", precio: 600 },
    { producto: "iPad 6", precio: 700 },
    { producto: "iMac 2019", precio: 600 },
    { producto: "iMac 2020", precio: 800 },
    { producto: "iMac 2021", precio: 1000 },
    { producto: "iMac 2022", precio: 1200 }
]

let opcion;

function filtrado(prod) {
    const inventarioNew = inventario.filter(item => item.producto.includes(prod))
    inventarioNew.forEach(producto => console.log(`Producto: ${producto.producto}. Precio: $${producto.precio}`))
    alert(`El Inventario de ${prod} se ha impreso en la consola`)
    opcion = prompt(`¿Te gustaría hacer otra consulta?
                    - Escribe "si" si te gustaría hacer otra consulta
                    - Escribe "salir" para finalizar`)
}

alert("Bienvenido a tu tienda iCompra")


do {
    opcion = prompt(`¿Que te gustaría consultar?
1. Inventario Completo
2. iPhones
3. iPads
4. iMacs
5. Para salir escriba "salir"`)


switch (opcion) {
    case "1":
        inventario.forEach(producto => console.log(`Producto: ${producto.producto}. Precio: $${producto.precio}`))
        alert(`El Inventario se ha impreso en la consola`)
        opcion = prompt(`¿Te gustaría hacer otra consulta?
                    - Escribe "si" si te gustaría hacer otra consulta
                    - Escribe "salir" para finalizar`)
        break;
    case "2":
        filtrado("iPhone")
        break;
    case "3":
        filtrado("iPad")
        break;
    case "4":
        filtrado("iMac")
        break;
        case "salir":
            break;
    default:
        alert(`Por favor seleccione una de las opciones anteriores`)
        break;
}
} while (opcion != "salir");