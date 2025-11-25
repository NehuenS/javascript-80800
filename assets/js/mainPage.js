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
    constructor(id, producto, precio, foto) {
        this.id = id;
        this.producto = producto;
        this.precio = precio;
    }
    nombre() {
        return this.producto.nombre()
    }
}
class ItemEnCarrito {
    constructor(id, cantidad) {
        this.id = id;
        this.cantidad = cantidad;
    }
}

let logo = document.getElementById("logoImg");
logo.addEventListener("mouseover", function () {
    this.setAttribute("src", "./img/logo_hover.png")
});
logo.addEventListener("mouseout", function () {
    this.setAttribute("src", "./img/logo.png")
});
let menu = document.getElementById("menuImg");
menu.addEventListener("mouseover", function () {
    this.setAttribute("src", "./img/menu_hover.png")
});
menu.addEventListener("mouseout", function () {
    this.setAttribute("src", "./img/menu.png")
});

//Cargar carrito de LocalStorage a Variable
let lsCarrito = localStorage.getItem("carrito");
let varCarrito = [];
if (lsCarrito) { //Si el carrito de LocalStorage tiene contenido, lo cargamos a su variable 
    varCarrito = JSON.parse(lsCarrito);
}

let productosVar = [];

await fetch(
    "./assets/json/productos.json"
).then(
    response => response.json()
).then(
    function (data) {
        let retorno = [];
        let producto;
        for (const item of data) {
            switch (item.producto.tipo) {
                case "Arma":
                    producto = new Arma(item.producto.detalle.modelo, item.producto.detalle.fabricante);
                    break;
                case "Accesorio":
                    producto = new Accesorio(item.producto.detalle.accesorio);
                    break;
            }
            retorno.push(new Producto(item.id, producto, item.precio));
        }
        productosVar = retorno;
    }
);

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
            <div class="bloqueFoto">
                <img class="imgProducto" src="./img/productos/${item.id}" alt="Foto de ${item.nombre()}">
            </div>
            <h4>${item.nombre()}<h4>
            <h4>$ ${item.precio}</h4>
            <hr>
            <div class="bloqueContador">
                <button class="minus enCero" id="minus${item.id}" value="${item.id}" type="button">-</button>
                <span class="counter" id="counter${item.id}" value="${item.id}"></span>
                <button class="plus" id="plus${item.id}" value="${item.id}" type="button">+</button>
            </div>
        </div>`;
    }
    panel.innerHTML = retorno;
    aplicarCarrito();
    for (const i of document.getElementsByClassName("imgProducto")) {
        i.addEventListener("error", function () {
            i.setAttribute("src", "./img/productos/err404.jpg");
        });
    }
    for (const m of document.getElementsByClassName("minus")) {
        m.addEventListener("click", function () {
            let indice;
            if (
                varCarrito.some((item, index) => {
                    if (m.value === item.id) {
                        indice = index;
                        return true;
                    }
                })
            ) {
                varCarrito[indice].cantidad = Math.max(0, varCarrito[indice].cantidad - 1);
                if (varCarrito[indice].cantidad == 0) {
                    varCarrito.splice(indice, 1);
                }
                aplicarCarrito();
            }
        });
    }
    for (const p of document.getElementsByClassName("plus")) {
        p.addEventListener("click", function () {
            let existe = false;
            existe = varCarrito.some((item, index) => {
                if (p.value === item.id) {
                    varCarrito[index].cantidad = varCarrito[index].cantidad + 1;
                    return true;
                }
            });
            if (!existe) {
                varCarrito.push(new ItemEnCarrito(p.value, 1));
            }
            aplicarCarrito();
        });
    }
}

function cargarVista(tipo) {
    listarProductos(filtrarProductos(productosVar, tipo), "listaProductos");
}

function aplicarCarrito() {
    document.querySelectorAll(".counter").forEach(el => el.innerHTML = 0);
    document.querySelectorAll(".minus").forEach(el => el.classList.add("enCero"));
    for (const item of varCarrito) {
        if (item.cantidad > 0 && document.querySelector(`.counter[value="${item.id}"]`) != undefined) {
            document.querySelector(`.counter[value="${item.id}"]`).innerHTML = item.cantidad;
            document.querySelector(`.minus[value="${item.id}"]`).classList.remove("enCero");
        }
    }
    localStorage.setItem("carrito", JSON.stringify(varCarrito));
}

for (const a of document.getElementsByClassName("menuLink")) {
    a.addEventListener("click", function () {
        document.getElementById("title").innerHTML = a.dataset.title;
        cargarVista(a.dataset.link);
    });
}
cargarVista();
document.getElementById("botonCarrito").addEventListener("click", function () {
    window.location = "./checkout.html"
});