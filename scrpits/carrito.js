
const btnCart = document.querySelector('.carrito-container-link')
const cartContainerProducts = document.querySelector('.carrito-productos--container')
const btnCloseCart = document.querySelector('.carrito-cerrar')


/* JS para abrir el carrito */


btnCart.addEventListener('click', () => {
  cartContainerProducts.classList.toggle('hidden-cart')
})
btnCloseCart.addEventListener('click', () => {
  cartContainerProducts.classList.toggle('hidden-cart')
})
