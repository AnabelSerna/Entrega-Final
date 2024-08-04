
const productos = [
    { id: 1, nombre: 'Iphone 13', precio: 500, imagen: './assets/iphone13-tienda.png' },
    { id: 2, nombre: 'Iphone 14', precio: 600, imagen: './assets/iphone14-tienda.png' },
    { id: 3, nombre: 'Iphone 15', precio: 700, imagen: './assets/iphone15-tienda.png' },
    { id: 4, nombre: 'Iphone 15 Pro', precio: 800, imagen: './assets/iphone15pro-tienda.png' },
    { id: 5, nombre: 'MacBook M2', precio: 900, imagen: './assets/macbookairm2-tienda.png' },
    { id: 6, nombre: 'Watch Hermes', precio: 300, imagen: './assets/watchhermes-tienda.jpeg' },
    { id: 7, nombre: 'Watch S9', precio: 400, imagen: './assets/watchs9-tienda.jpeg' },
    { id: 8, nombre: 'Watch SE', precio: 500, imagen: './assets/watchse-tienda.jpeg' },
    { id: 9, nombre: 'Watch Ultra', precio: 600, imagen: './assets/watchultra-tienda.jpeg' },
    { id: 10, nombre: 'MacBook M3', precio: 700, imagen: './assets/macbookm3-tienda.jpeg' },
];


function mostrarProductos() {
    const container = document.getElementById('productos-container');
    container.innerHTML = '';

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div>
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <button data-id="${producto.id}" class="agregar-al-carrito">Agregar al carrito</button>
            </div>
        `;
        container.appendChild(productoDiv);
    });


    document.querySelectorAll('.agregar-al-carrito').forEach(button => {
        button.addEventListener('click', agregarAlCarrito);
    });
}


function agregarAlCarrito(event) {
    const idProducto = parseInt(event.target.getAttribute('data-id'));
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const productoEnCarrito = carrito.find(p => p.id === idProducto);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        const producto = productos.find(p => p.id === idProducto);
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}


function mostrarCarrito() {
    const carritoList = document.getElementById('carrito-list');
    carritoList.innerHTML = '';

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('carrito-item');
        itemDiv.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}">
            <div>
                <p>${item.nombre} - $${item.precio} x ${item.cantidad}</p>
                <button data-id="${item.id}" class="eliminar-del-carrito">Eliminar</button>
            </div>
        `;
        carritoList.appendChild(itemDiv);
    });


    document.querySelectorAll('.eliminar-del-carrito').forEach(button => {
        button.addEventListener('click', eliminarDelCarrito);
    });
}


function eliminarDelCarrito(event) {
    const idProducto = parseInt(event.target.getAttribute('data-id'));
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const carritoFiltrado = carrito.filter(p => p.id !== idProducto);
    localStorage.setItem('carrito', JSON.stringify(carritoFiltrado));

    mostrarCarrito();
}


function vaciarCarrito() {
    localStorage.removeItem('carrito');
    mostrarCarrito();
}


document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);

mostrarProductos();
mostrarCarrito();