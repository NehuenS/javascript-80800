class Arma {
    constructor(modelo, fabricante) {
        this.modelo = modelo;
        this.fabricante = fabricante;
    }
    nombre() {
        return `Replica de ${this.fabricante} ${this.modelo}`
    }
}
class Accesorio {
    constructor(accesorio) {
        this.accesorio = accesorio;
    }
    nombre() {
        return `${this.accesorio}`
    }
}
class Producto {
    constructor(producto, precio) {
        this.producto = producto;
        this.precio = precio;
    }
    nombre() {
        return this.producto.nombre()
    }
}
const productos = [
    new Producto(new Arma("FN", "FAL IV"), 415000),
    new Producto(new Arma("19", "Glock"), 280000),
    new Producto(new Arma("Thunder 9", "Bersa"), 210000),
    new Producto(new Accesorio("Cilindro CO2 x Unidad"), 1500),
    new Producto(new Accesorio("Balines de PVC x 200g"), 9000)
]
function listarProductos(productos) {
    let retorno = "Escriba el número del producto para agregarlo al carrito:";
    let index = 1;
    for (const item of productos) {
        retorno = `${retorno}\n${index} - ${item.nombre()}.`;
        index++;
    }
    return `${retorno}\n0 - Terminar compra.`;
}
function listarCarrito(carrito) {
    let retorno = "Productos en el carrito:";
    let subtotal = 0;
    for (const item of carrito) {
        retorno = `${retorno}\n${item.nombre()}.`;
        subtotal += item.precio;
    }
    return `${retorno}\nSubtotal: $${subtotal}`;
}
function total(carrito) {
    let total = 0;
    for (const item of carrito) {
        total += item.precio;
    }
    return total;
}
let carrito = [];
// alert("Bienvenido a La Reglamentaria Airsoft");
let precio = 0;
// while (true) {
//     index = prompt(listarProductos(productos)) - 1;
//     if (index == -1) {
//         break;
//     }
//     if (typeof productos[index] === 'undefined') {
//         alert("Número inválido.");
//         continue;
//     }
//     carrito.push(productos[index]);
//     alert(listarCarrito(carrito));
// }
// alert(`Su total es: $${total(carrito)}\nGracias por su compra.`);
let logo = document.getElementById("logoImg");
logo.addEventListener("mouseover", function () {
    logo.setAttribute("src", "./img/logo_hover.png")
})
logo.addEventListener("mouseout", function () {
    logo.setAttribute("src", "./img/logo.png")
})