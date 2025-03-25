class UserService {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
    }

    saveToLocalStorage() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }
// crear usuario
    create(userData) {
        const user = new User(
            userData.firstName,
            userData.lastName,
            userData.email,
            userData.password
        );
        this.users.push(user);
        this.saveToLocalStorage();
        return user;
    }
// buscar usuario por email
    findByEmail(email) {
        return this.users.find(user => user.email === email);
    }
// autenticar usuario
    authenticate(email, password) {
        const user = this.findByEmail(email);
        if (user && user.password === password) {
            return user;
        }
        return null;
    }
// actualizar usuario
    update(id, userData) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users[index] = { ...this.users[index], ...userData };
            this.saveToLocalStorage();
            return this.users[index];
        }
        return null;
    }
// eliminar usuario por id      
    delete(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users.splice(index, 1);
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }
} 