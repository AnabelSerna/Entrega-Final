
async function cargarProductos() {
    try {
        const response = await fetch('productos.json');
        if (!response.ok) throw new Error('No se pudo cargar el archivo de productos.');
        return await response.json();
    } catch (error) {
        console.error('Error al cargar productos:', error);
        return [];
    }
}


async function mostrarProductos() {
    const productos = await cargarProductos();
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


async function agregarAlCarrito(event) {
    const idProducto = parseInt(event.target.getAttribute('data-id'));
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const productoEnCarrito = carrito.find(p => p.id === idProducto);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        try {
            const productos = await cargarProductos();
            const producto = productos.find(p => p.id === idProducto);
            carrito.push({ ...producto, cantidad: 1 });
        } catch (error) {
            console.error('Error al cargar productos:', error);
        }
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
