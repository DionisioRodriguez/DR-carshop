
const params = new URLSearchParams(window.location.search);
const idProducto = params.get('id');
const producto = Productos.find(p => p.id === idProducto);


if (producto) {

  document.getElementById('')
}