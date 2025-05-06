

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
    ventanaProductoSeleccionado()
  });


function cargarProductos(productosElegidos) {

  contenedorProductos.innerHTML = '';

  productosElegidos.forEach(producto => {

    const div = document.createElement('div');
    div.classList.add("producto-card");
    div.innerHTML = `
      <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
      <div>
        <h2>${producto.titulo}</h2>
        <p><span>$${producto.precio},00</span></p>
      </div>
      <button class="ver-mas-button" id="${producto.id}">Ver más</button>
    `;
    contenedorProductos.append(div);
  })

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


const contenedorProductoInfo = document.querySelector('.producto-seleccionado-info');

function ventanaProductoSeleccionado() {

  const btnVerMas = document.querySelectorAll('.ver-mas-button');

  btnVerMas.forEach(boton => {
    boton.addEventListener('click', () => {
      contenedorProductoInfo.classList.toggle('hidden-producto-info')
      cargarProducto(boton.id)
    });
  })
}

function cargarProducto(productoElegidoiId) {

  contenedorProductoInfo.innerHTML = '';

  producto = Productos.find(p => p.id === productoElegidoiId);

  if (producto) {

    if (producto.categoria.nombre === 'Shampoo') {
      const div = document.createElement('div');
    div.classList.add("producto-seleccionado--container");
    div.innerHTML = `
      <div class="producto-seleccionado-izquierdo">
        <img src="${producto.imagen}" alt="${producto.titulo}">
        <div>
          <p>${producto.especificacion}</p>
        </div>
      </div>
      <div class="producto-seleccionado-derecho">
        <div class="producto-seleccionado-nombre-precio">
          <h1>${producto.categoria.nombre} ${producto.titulo}</h1>
          <span>$${producto.precio},00</span>
        </div>
        <div class="producto-seleccionado-cantidad">
          <span>Cantidad</span>
          <input value="1" type="number" min="1" max="15">
        </div>
        <div class="producto-seleccionado-button">
          <a href="/assets/productos.html">
            <button id="${producto.id}" class="boton-agregar">Agregar al carrito</button>
          </a>
        </div>
      </div>
    `

    contenedorProductoInfo.append(div);

    } else {
      const div = document.createElement('div');
    div.classList.add("producto-seleccionado--container");
    div.innerHTML = `
      <div class="producto-seleccionado-izquierdo">
        <img src="${producto.imagen}" alt="${producto.titulo}">
        <div>
          <p>${producto.especificacion}</p>
        </div>
      </div>
      <div class="producto-seleccionado-derecho">
        <div class="producto-seleccionado-nombre-precio">
          <h1>${producto.titulo}</h1>
          <span>$${producto.precio},00</span>
        </div>
        <div class="producto-seleccionado-cantidad">
          <span>Cantidad</span>
          <input value="1" type="number" min="1" max="15">
        </div>
        <div class="producto-seleccionado-button">
          <a href="/assets/productos.html">
            <button id="${producto.id}" class="boton-agregar">Agregar al carrito</button>
          </a>
        </div>
      </div>
    `

    contenedorProductoInfo.append(div);

    }
  }
  }