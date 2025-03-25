class User {
    constructor(firstName, lastName, email, password) {
        this.id = Date.now().toString();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
} 