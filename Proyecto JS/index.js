function procesoDeCompra(){
    
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
}}
