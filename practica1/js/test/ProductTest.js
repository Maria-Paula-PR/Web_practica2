import Product from '../models/Product.js';

// Test function
function testProduct() {
    console.log("Testing Product class...");

    // Test 1: un producto con mas propiedades de las que deberia tener
    try {
        const objWithExtra = {
            id: "1",
            name: "Sample Product",
            price: 29.99,
            image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.outsideonline.com%2Fculture%2Factive-families%2Fhow-to-read-dog-body-language-happy-aggressive%2F&psig=AOvVaw3qfERA0A6VROdp3VJYd0Yc&ust=1743008100016000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCMC536bZpYwDFQAAAAAdAAAAABAE",
            description: "This is a sample product description",
            category: "dogs",
            extraField1: "This should be ignored",
            extraField2: 123,
            randomStuff: true
        };

        const product = Product.createFromObject(objWithExtra);
        console.log("Test 1 - Product created successfully:", product);
    } catch (e) {
        console.error("Test 1 failed:", e.message);
    }

    // Test 2: uno que no funcione
    try {
        const invalidObj = {
            id: "",  //no tiene id
            name: "Product",
            price: -10,  //no tiene precio correcto
            image: "not-a-url", //no tiene url
            description: "Short", //no tiene descripcion correcta
            category: "Electronics" //no tiene categoria correcta
        };

        const product = Product.createFromObject(invalidObj);
        console.log("Test 2 - This should not print if validation works");
    } catch (e) {
        console.log("Test 2 - Validation working correctly:", e.message);
    }
}

// Run the tests
testProduct(); 