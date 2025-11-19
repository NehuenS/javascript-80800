class Arma {
    constructor(arma, fabricante) {
        this.arma = arma;
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
    constructor(id, producto, precio, foto) {
        this.id = id;
        this.producto = producto;
        this.precio = precio;
    }
    nombre() {
        return this.producto.nombre()
    }
}
const productos = [
    new Producto("00000001", new Arma("FN", "FAL IV"), 415000, "FN_FAL.jpeg"),
    new Producto("00000002", new Arma("19", "Glock"), 280000, "Glock19.jpeg"),
    new Producto("00000003", new Arma("Thunder 9", "Bersa"), 210000, "BersaThun9.jpeg"),
    new Producto("00000004", new Accesorio("Cilindro CO2 x Unidad"), 1500, "Cil_CO2.webp"),
    new Producto("00000005", new Accesorio("Balines de PVC Blancos x 2000U"), 12000, "BB2000.png"),
    new Producto("00000006", new Accesorio("Balines de PVC Fluorescentes x 2000U"), 12000, "BL2000.webp")
]
function buildProductos(json) {

}
console.log(JSON.stringify(productos));
function filtrarProductos(productos, tipo) {
    let filtro;
    switch (tipo) {
        case "Armas":
            filtro = (p) => p.producto.tipo === "Arma";
            break;
        case "Accesorios":
            filtro = (p) => p.producto.tipo === "Accesorio";
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
            <div class="bloqueFoto">
                <img src="./img/productos/${item.foto}" alt="Foto de ${item.nombre()}">
            </div>
            <h4>${item.nombre()}<h4>
            <h4>$ ${item.precio}</h4>
            <hr>
            <div class="bloqueAgregar" data-item=${JSON.stringify(item)}>
                <button class="minus enCero" type="button">-</button>
                <span class="counter">0</span>
                <button class="plus" type="button">+</button>
            </div>
        </div>`;
    }
    panel.innerHTML = retorno;
}
function cargarVista(tipo) {
    listarProductos(filtrarProductos(productos, tipo), "listaProductos");
}
let carrito = [];
let precio = 0;
cargarVista();

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
for (const a of document.getElementsByClassName("menuLink")) {
    a.addEventListener("click", function () {
        cargarVista(a.dataset.link);
    });
}
