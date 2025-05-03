
const contenedorProductos = document.querySelector('.productos-container');
const botonesCategorias = document.querySelectorAll('.boton-categoria');
const tituloPrincipal = document.querySelector('#titulo-principal');
const parrafoPrincipal = document.querySelector('#parrafo-principal');
const contenedorImagenPrincipal = document.querySelector('.productos-imagen--container');


const dataUrl = "data/array.json";
let Productos = [];
fetch(dataUrl)
  .then((response) => {

    if (!response.ok) {
      throw new Error(`HTTP error! status : ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    Productos = data;
  })
  .catch((error) => {
    console.error('Error al cargar los datos', error);
  })
  .finally(() => {
    cargarProductos(Productos);
  });


function cargarProductos(productosElegidos) {

  contenedorProductos.innerHTML = '';

  productosElegidos.forEach(producto => {

    const div = document.createElement('div');
    div.classList.add("producto-card");
    div.innerHTML = `
      <a id="${producto.id}" class="Link-producto-seleccionado" href="/assets/productoSeleccionado.html">
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div>
          <h2>${producto.titulo}</h2>
          <p><span>$${producto.precio},00</span></p>
        </div>
      </a>
    `;
    contenedorProductos.append(div);
  })

  actualizarProductosPantalla()

}

botonesCategorias.forEach(boton => {
  boton.addEventListener('click', (e) => {

    botonesCategorias.forEach(boton => boton.classList.remove('active'));

    e.currentTarget.classList.add('active');

    if (e.currentTarget.id != 'todos') {

      const productoCategoria = Productos.find(producto => producto.categoria.id === e.currentTarget.id);
      tituloPrincipal.innerText = productoCategoria.categoria.nombre;
      parrafoPrincipal.innerText = productoCategoria.categoria.especificacion;

      contenedorImagenPrincipal.innerHTML = '';
      contenedorImagenPrincipal.innerHTML = `<img src="${productoCategoria.categoria.imagen}" alt="${productoCategoria.categoria.nombre}">`;


      const productosBoton = Productos.filter(producto => producto.categoria.id === e.currentTarget.id);
      cargarProductos(productosBoton);
    } else {
      contenedorImagenPrincipal.innerHTML = `<img src="/img/banners/img-productos.webp" alt="">`
      tituloPrincipal.innerText = ('Todos los productos');
      parrafoPrincipal.innerText = ('Los mejores productos de lavado y estetica automotriz')
      cargarProductos(Productos);
    }

  })
});

function actualizarProductosPantalla() {

  productosPantalla = document.querySelectorAll('.Link-producto-seleccionado')

  productosPantalla.forEach(boton => {
    boton.addEventListener('click', mostrarProductoSeleccionado)
  })
}

function mostrarProductoSeleccionado (e) {
  window.location.href = `/assets/productoSeleccionado.html?id=${e.currentTarget.id}`;
}
