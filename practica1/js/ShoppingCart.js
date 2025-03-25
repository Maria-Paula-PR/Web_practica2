class ShoppingCart {
    constructor() {
        this.items = new Map();
        this.loadCart(); // cargar datos del carrito cuando se inicializa
    }

    loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            // convertir datos guardados de nuevo a Map
            const cartArray = JSON.parse(savedCart);
            this.items = new Map(cartArray);
        }
    }

    saveCart() {
        // convertir Map a array y guardar en localStorage
        const cartArray = Array.from(this.items.entries());
        localStorage.setItem('cart', JSON.stringify(cartArray));
    }

    addItem(productId, amount) {
        const currentAmount = this.getItemAmount(productId);
        const newAmount = currentAmount + parseInt(amount);
        this.items.set(productId, newAmount);
        this.saveCart(); // guardar despues de agregar item
        return true;
    }

    getItemAmount(productId) {
        return this.items.get(productId) || 0;
    }

    getTotalItems() {
        let total = 0;
        for (let amount of this.items.values()) {
            total += parseInt(amount);
        }
        return total;
    }

    removeItem(productId) {
        this.items.delete(productId);
        this.saveCart(); // guardar despues de eliminar item
    }

    clearCart() {
        this.items.clear();
        this.saveCart(); // guardar despues de limpiar
    }
}

// crear una instancia global del carrito
const cart = new ShoppingCart(); 