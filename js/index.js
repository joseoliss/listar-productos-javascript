
document.getElementById('formAgregar').addEventListener('submit', agregarProductos);
document.getElementById('div-row').addEventListener('submit', filtrarProducto);

function agregarProductos(e) {

    let nombre = document.getElementById('nombre').value;
    let precio = document.getElementById('precio').value;
    let cantidad = document.getElementById('cantidad').value;

    //constructor
    let producto = {
        nombre,
        precio,
        cantidad
    }

    if (validarFormulario(nombre, precio, cantidad)) {
        if (localStorage.getItem('productos') === null) {
            let productos = [];
            productos.push(producto);
            localStorage.setItem('productos', JSON.stringify(productos));
        }
        else {
            let productos = JSON.parse(localStorage.getItem('productos'));
            productos.push(producto);
            localStorage.setItem('productos', JSON.stringify(productos))
        }
    }

    document.getElementById('formAgregar').reset();
    obtenerProductos(e);
    e.preventDefault();
}

function obtenerProductos() {
    let productos = JSON.parse(localStorage.getItem('productos'));
    //verProductos = mostrar en pantalla
    let verProductos = document.getElementById('lista-productos');
    let total = 0;
    let cantidadTotal = 0;
    verProductos.innerHTML = "";

    for (let i = 0; i < productos.length; i++) {
        let nombre = productos[i].nombre;
        let precio = productos[i].precio;
        let cantidad = productos[i].cantidad;

        cantidadTotal = cantidadTotal + parseFloat(productos[i].cantidad);
        total = total + parseFloat(productos[i].precio) * parseFloat(cantidad);

        verProductos.innerHTML += `
            <div class="productos-agregados">
                <p>Nombre: ${nombre}</br>Precio: ${precio}</br>Cantidad: ${cantidad}</p>
                <button onclick="eliminarProducto('${nombre}')">Eliminar</button>
            </div>
        `;
    }
    document.getElementById('total').innerHTML = "";
    if (cantidadTotal != 0) {
        document.getElementById('total').innerHTML = `<p>Cantidad de elementos: ${cantidadTotal}<br><br>TOTAL: ${total}</p>`;
    }
    cantidadTotal = 0;
}

function filtrarProducto(e) {
    let productos = JSON.parse(localStorage.getItem('productos'));
    let ProductosFiltrados = [];
    //verProductos = mostrar en pantalla
    let verProductos = document.getElementById('lista-productos');
    let txt = document.getElementById('txt_buscar').value;

    if (txt != "") {
        verProductos.innerHTML = "";
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].nombre == txt) {
                ProductosFiltrados.push(productos[i]);
            }
        }
        for (let i = 0; i < ProductosFiltrados.length; i++) {
            let nombre = ProductosFiltrados[i].nombre;
            let precio = ProductosFiltrados[i].precio;
            let cantidad = ProductosFiltrados[i].cantidad;
            verProductos.innerHTML += `
            <div class="productos-agregados">
                <p>Nombre: ${nombre}  -  Precio:${precio}  -  Cantidad:${cantidad}</p>
                <button onclick="eliminarProducto('${nombre}')">Eliminar</button>
            </div>
        `;
        }
    }
    else {
        verProductos.innerHTML = "";

        for (let i = 0; i < productos.length; i++) {
            let nombre = productos[i].nombre;
            let precio = productos[i].precio;
            let cantidad = productos[i].cantidad;

            verProductos.innerHTML += `
            <div class="productos-agregados">
                <p>Nombre: ${nombre}  -  Precio:${precio}  -  Cantidad:${cantidad}</p>
                <button onclick="eliminarProducto('${nombre}')">Eliminar</button>
            </div>
        `;
        }
    }
    e.preventDefault();
}

function eliminarProducto(nombre) {
    let productos = JSON.parse(localStorage.getItem('productos'));
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].nombre == nombre) {
            productos.splice(i, 1);
        }
    }
    localStorage.setItem('productos', JSON.stringify(productos));
    obtenerProductos();
}

function validarFormulario(nombre, precio, cantidad) {
    if (nombre != "") {
        if (precio != "") {
            if (cantidad != "") {
                if (!esNumero(precio)) {
                    if (!esNumero(cantidad)) {
                        return true;
                    }
                    else {
                        genMesaje("Digite una cantidad válida.", "alerta");
                    }
                }
                else {
                    genMesaje("Digite un precio valido.", "alerta");
                }
            }
            else {
                genMesaje("Digite una cantidad por favor.", "alerta");
            }
        }
        else {
            genMesaje("Digite un precio por favor.", "alerta");
        }
    }
    else {
        genMesaje("Digite un nombre por favor.", "alerta");
    }
}

function esNumero(x) {
    if (isNaN(x)) {
        return true;
    }
    else {
        return false;
    }
}

function genMesaje(message, cssClass) {
    const div = document.createElement('div');
    div.className = `${cssClass}`;
    div.appendChild(document.createTextNode(message));
    // Show in The DOM
    const container = document.querySelector('.formAgregar');
    const app = document.querySelector('.contenido');
    // Insert Message in the UI
    container.insertBefore(div, app);
    // Remove the Message after 3 seconds
    setTimeout(function () {
        document.querySelector('.alerta').remove();
    }, 3000);
}

obtenerProductos();


/*
    falta validar si es numero
    falta sacar el total y la cantidad de articulos
*/