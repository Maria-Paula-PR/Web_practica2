// Global function to add items to cart
function addToCart(productId) {
    try {
        // obtener la cantidad del input
        const amountInput = document.getElementById(`amount-${productId}`);
        const amount = parseInt(amountInput.value);

        if (isNaN(amount) || amount < 1) {
            alert('Por favor, ingrese una cantidad valida');
            return;
        }

        // agregar al carrito
        if (cart.addItem(productId, amount)) {
            // actualizar display
            updateCartDisplay(productId);
            alert('Producto agregado al carrito!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al agregar al carrito');
    }
}

function updateCartDisplay(productId) {
    // actualizar display de cantidad de producto
    const cartAmount = document.getElementById(`cart-amount-${productId}`);
    if (cartAmount) {
        cartAmount.textContent = `En el carrito: ${cart.getItemAmount(productId)}`;
    }

    // actualizar contador de carrito
    const cartCounter = document.getElementById('cart-counter');
    if (cartCounter) {
        cartCounter.textContent = cart.getTotalItems();
    }
} 