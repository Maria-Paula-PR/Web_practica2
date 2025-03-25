class ProductService {
    constructor() {
        this.storageKey = 'products';
        this.initializeProducts();
    }

    // Initialize with default products if none exist
    initializeProducts() {
        if (!localStorage.getItem(this.storageKey)) {
            const defaultProducts = [
                {
                    id: "1",
                    name: "Pastor Alemán",
                    price: 100,
                    image: "IMG/pastor.jpg",
                    description: "The German Shepherd is a German breed of working dog of medium to large size.",
                    category: "Dogs"
                },
                {
                    id: "2",
                    name: "Golden Retriever",
                    price: 100,
                    image: "IMG/golden.jpeg",
                    description: "The Golden Retriever is a Scottish breed of retriever dog of medium size.",
                    category: "Dogs"
                },
                // ... add other default products
            ];
            localStorage.setItem(this.storageKey, JSON.stringify(defaultProducts));
        }
    }

    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Get all products
    getProducts() {
        try {
            const products = localStorage.getItem(this.storageKey);
            return products ? JSON.parse(products) : [];
        } catch (error) {
            console.error('Error getting products:', error);
            return [];
        }
    }

    // Get product by ID
    getProductById(uuid) {
        try {
            const products = this.getProducts();
            return products.find(product => product.id === uuid) || null;
        } catch (error) {
            console.error('Error getting product by ID:', error);
            return null;
        }
    }

    // Create new product
    createProduct(product) {
        try {
            // Validate product data
            if (!this.validateProduct(product)) {
                throw new Error('Invalid product data');
            }

            // Add UUID if not provided
            const newProduct = {
                ...product,
                id: product.id || this.generateUUID()
            };

            // Get current products and add new one
            const products = this.getProducts();
            products.push(newProduct);
            
            // Save updated products
            localStorage.setItem(this.storageKey, JSON.stringify(products));
            return newProduct;
        } catch (error) {
            console.error('Error creating product:', error);
            return null;
        }
    }

    // Update existing product
    updateProduct(uuid, updatedProduct) {
        try {
            // Validate updated product data
            if (!this.validateProduct(updatedProduct)) {
                throw new Error('Invalid product data');
            }

            const products = this.getProducts();
            const index = products.findIndex(product => product.id === uuid);

            if (index === -1) {
                throw new Error('Product not found');
            }

            // Maintain the original ID
            products[index] = {
                ...updatedProduct,
                id: uuid
            };

            localStorage.setItem(this.storageKey, JSON.stringify(products));
            return products[index];
        } catch (error) {
            console.error('Error updating product:', error);
            return null;
        }
    }

    // Delete product
    deleteProduct(uuid) {
        try {
            const products = this.getProducts();
            const filteredProducts = products.filter(product => product.id !== uuid);

            if (products.length === filteredProducts.length) {
                throw new Error('Product not found');
            }

            localStorage.setItem(this.storageKey, JSON.stringify(filteredProducts));
            return true;
        } catch (error) {
            console.error('Error deleting product:', error);
            return false;
        }
    }

    // Validate product data
    validateProduct(product) {
        const requiredFields = ['name', 'price', 'image', 'description', 'category'];
        
        // verificar que todos los campos requeridos existan
        for (const field of requiredFields) {
            if (!product[field]) {
                console.error(`Missing required field: ${field}`);
                return false;
            }
        }

        // verificar que el precio sea un numero positivo
        if (typeof product.price !== 'number' || product.price <= 0) {
            console.error('Price must be a positive number');
            return false;
        }

        return true;
    }
}

// crear una instancia global
const productService = new ProductService();