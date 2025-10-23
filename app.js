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
    constructor(producto, precio, foto) {
        this.producto = producto;
        this.precio = precio;
        this.foto = foto
    }
    nombre() {
        return this.producto.nombre()
    }
    foto() {
        return this.producto.foto;
    }
}
const productos = [
    new Producto(new Arma("FN", "FAL IV"), 415000),
    new Producto(new Arma("19", "Glock"), 280000),
    new Producto(new Arma("Thunder 9", "Bersa"), 210000),
    new Producto(new Accesorio("Cilindro CO2 x Unidad"), 1500),
    new Producto(new Accesorio("Balines de PVC Blancos x 2000U"), 12000),
    new Producto(new Accesorio("Balines de PVC Fluorescentes x 2000U"), 12000),
    new Producto(new Accesorio("Cilindro CO2 x Unidad"), 1500),
    new Producto(new Accesorio("Balines de PVC Blancos x 2000U"), 12000, "BB2000.png"),
    new Producto(new Accesorio("Balines de PVC Fluorescentes x 2000U"), 12000, "BL2000.webp")
]
function filtrarProductos(productos, tipo) {
    let filtro;
    switch (tipo) {
        case "Armas":
            filtro = (p) => p.producto instanceof Arma;
            break;
        case "Accesorios":
            filtro = (p) => p.producto instanceof Accesorio;
            break;
        default:
            filtro = (p) => true
    }
    return productos.filter(filtro);
}
function listarProductos(listaProductos, elementId) {
    let retorno = "";
    let panel = document.getElementById(elementId);
    for (const item of listaProductos) {
        retorno = `${retorno}
        <div class="cardProducto">
            <div>
                <img src="./img/productos/${item.foto}" alt="Foto de ${item.nombre()}">
            </div>
            <h4>${item.nombre()}<h4>
            <h4>$ ${item.precio}</h4>
            <hr>
            <div class="bloqueAgregar" data-item=${JSON.stringify(item)}>
                <button class="minus" type="button">-</button>
                <span class="counter">0</span>
                <button class="plus" type="button">+</button>
            </div>
        </div>`;
    }
    panel.innerHTML = retorno;
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
let filtrados = filtrarProductos(productos, "Armas");
console.log(filtrados);
listarProductos(filtrados, "listaProductos");
// listarProductos(productos, "listaProductos");
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
});
logo.addEventListener("mouseout", function () {
    logo.setAttribute("src", "./img/logo.png")
});
let menu = document.getElementById("menuImg");
menu.addEventListener("mouseover", function () {
    menu.setAttribute("src", "./img/menu_hover.png")
});
menu.addEventListener("mouseout", function () {
    menu.setAttribute("src", "./img/menu.png")
});
let linkInicio = document.getElementById("linkInicio");
linkInicio.addEventListener("click", function () {

});
let linkArmas = document.getElementById("linkArmas");
let linkAccesorios = document.getElementById("linkAccesorios");
