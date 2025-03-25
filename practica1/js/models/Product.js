// Custom exception class for Product-related errors
class ProductException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ProductException';
    }
}

export default class Product {
    #id;         // private field
    #name;       // private field
    #price;      // private field
    #image;      // private field
    #description;// private field
    #category;   // private field

    constructor(id, name, price, image, description, category) {
        this.id = id;                   // Using setter for validation
        this.name = name;               // Using setter for validation
        this.price = price;             // Using setter for validation
        this.image = image;             // Using setter for validation
        this.description = description;  // Using setter for validation
        this.category = category;       // Using setter for validation
    }

    // Getters
    get id() { return this.#id; }
    get name() { return this.#name; }
    get price() { return this.#price; }
    get image() { return this.#image; }
    get description() { return this.#description; }
    get category() { return this.#category; }

    // Setters with validation
    set id(value) {
        if (!value || value.trim() === '') {
            throw new ProductException('ID cannot be empty');
        }
        this.#id = value;
    }

    set name(value) {
        if (!value || value.trim() === '') {
            throw new ProductException('Name cannot be empty');
        }
        if (value.length < 3) {
            throw new ProductException('Name must be at least 3 characters long');
        }
        this.#name = value.trim();
    }

    set price(value) {
        const numPrice = Number(value);
        if (isNaN(numPrice)) {
            throw new ProductException('Price must be a number');
        }
        if (numPrice < 0) {
            throw new ProductException('Price cannot be negative');
        }
        this.#price = numPrice;
    }

    set image(value) {
        if (!value || value.trim() === '') {
            throw new ProductException('Image URL cannot be empty');
        }
        try {
            new URL(value); // Validate URL format
            this.#image = value.trim();
        } catch {
            throw new ProductException('Invalid image URL format');
        }
    }

    set description(value) {
        if (!value || value.trim() === '') {
            throw new ProductException('Description cannot be empty');
        }
        if (value.length < 10) {
            throw new ProductException('Description must be at least 10 characters long');
        }
        this.#description = value.trim();
    }

    set category(value) {
        if (!value || value.trim() === '') {
            throw new ProductException('Category cannot be empty');
        }
        this.#category = value.trim();
    }

    // crear un producto desde un json
    static createFromJson(jsonValue) {
        try {
            const obj = JSON.parse(jsonValue);
            return Product.createFromObject(obj);
        } catch (error) {
            throw new ProductException('Invalid JSON format: ' + error.message);
        }
    }

    static createFromObject(obj) {
        // Define the valid properties for a Product
        const validProperties = ['id', 'name', 'price', 'image', 'description', 'category'];
        
        // Create a new object with only valid properties
        const cleanObj = {};
        
        // Only copy properties that belong to Product class
        validProperties.forEach(prop => {
            if (obj.hasOwnProperty(prop)) {
                cleanObj[prop] = obj[prop];
            }
        });

        try {
            return new Product(
                cleanObj.id,
                cleanObj.name,
                cleanObj.price,
                cleanObj.image,
                cleanObj.description,
                cleanObj.category
            );
        } catch (error) {
            throw new ProductException('Invalid object format: ' + error.message);
        }
    }

    // convertir un producto a un objeto plano
    toObject() {
        return {
            id: this.#id,
            name: this.#name,
            price: this.#price,
            image: this.#image,
            description: this.#description,
            category: this.#category
        };
    }
} 