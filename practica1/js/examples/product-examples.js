// ejemplo de uso de ProductService
function testProductService() {
    // obtener todos los productos
    console.log('All products:', productService.getProducts());

    // obtener producto por ID
    const product = productService.getProductById('1');
    console.log('Product with ID 1:', product);

    // crear nuevo producto
    const newProduct = {
        name: "nuevo doggie",
        price: 100,
        image: "IMG/golden.jpeg",
        description: "OTRO GOLDEN POR QUE ME GUSTA",
        category: "Dogs"
    };
    const created = productService.createProduct(newProduct);
    console.log('Producto creado:', created);

    // actualizar producto
    const updated = productService.updateProduct(created.id, {
        ...created,
        name: "Updated Dog Name"
    });
    console.log('Producto actualizado:', updated);

    // eliminar producto
    const deleted = productService.deleteProduct(created.id);
    console.log('Producto eliminado:', deleted);
} 