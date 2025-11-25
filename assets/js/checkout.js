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

function productoPorId(id) {
    for (const item of productosVar) {
        if (item.id === id) {
            return item;
        }
    }
}
// function calcularPrecio()
function calcularPrecio(item) {
    return item.cantidad * producto.id;
}


function listarProductos(listaCarrito) {
    let retornoIzq = "";
    let retornoDer = "";
    let panelIzq = document.getElementById("listaCarrito");
    let panelDer = document.getElementById("resumenCarrito");
    let elTotal = document.getElementById("total");
    let total = 0;
    let subtotal = 0;
    let prod;
    for (const item of listaCarrito) {
        prod = productoPorId(item.id);
        retornoIzq = `${retornoIzq}
        <div class="cardProducto">
            <div class="bloqueFoto">
                <img class="imgProducto" src="./img/productos/${item.id}" alt="Foto de ${prod.nombre()}">
            </div>
            <h4>${prod.nombre()}<h4>
            <h4>$ ${prod.precio}</h4>
            <hr>
            <div class="bloqueContador">
                <button class="minus enCero" id="minus${item.id}" value="${item.id}" type="button">-</button>
                <span class="counter" id="counter${item.id}" value="${item.id}">${item.cantidad}</span>
                <button class="plus" id="plus${item.id}" value="${item.id}" type="button">+</button>
            </div>
        </div>`;
        subtotal = prod.precio * item.cantidad;
        total += subtotal;
        retornoDer = `${retornoDer}
        <li>${prod.nombre()} x ${item.cantidad}: $${subtotal}</li>`;
    }
    panelIzq.innerHTML = retornoIzq;
    panelDer.innerHTML = retornoDer;
    elTotal.innerHTML = `Total: $${total}`;
    elTotal.value = total;
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
            }
            listarProductos(varCarrito);
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
            listarProductos(varCarrito);
        });
    }
}

listarProductos(varCarrito);
document.getElementById("comprar").addEventListener("click", function () {
    Swal.fire({
        title: "¿Ir a Pagar?",
        icon: "info",
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: "Si",
        cancelButtonText: "No",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                html: "No hay pasarela de pago. Por favor, imagine el proceso de pago",
                icon: "success",
            }).then(
                window.location = "./index.html"
            );
            localStorage.removeItem("carrito");
        }
    });
})