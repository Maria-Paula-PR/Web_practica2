class UserController {
    constructor() {
        this.userService = new UserService();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Formulario de registro
        const registerForm = document.getElementById('registerForm');
        registerForm.addEventListener('submit', (e) => this.handleRegister(e));

        // Formulario de login
        const loginForm = document.querySelector('#loginModal form');
        loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    }

    handleRegister(e) {
        e.preventDefault();

        const userData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('registerEmail').value,
            password: document.getElementById('registerPassword').value
        };

        // Verificar si el usuario ya existe
        if (this.userService.findByEmail(userData.email)) {
            alert('Este correo ya está registrado');
            return;
        }

        // Crear nuevo usuario
        const user = this.userService.create(userData);
        
        // Cerrar modal y limpiar formulario
        const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        modal.hide();
        e.target.reset();
        
        alert('Usuario registrado exitosamente');
    }

    handleLogin(e) {
        e.preventDefault();

        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const user = this.userService.authenticate(email, password);
        
        if (user) {
            // almacenar usuario logueado
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            
            // cerrar modal y limpiar formulario
            const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            modal.hide();
            e.target.reset();
            
            // actualizar UI para usuario logueado
            this.updateUIForLoggedInUser(user);
        } else {
            alert('No cuentas con una cuenta registrada');
        }
    }

    updateUIForLoggedInUser(user) {
        const dropdownButton = document.querySelector('#triggerId');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        
        dropdownButton.textContent = `${user.firstName} ${user.lastName}`;
        
        // Update dropdown menu items
        dropdownMenu.innerHTML = `
            <a class="dropdown-item" href="orders.html">Mis pedidos</a>
            <a class="dropdown-item" href="#" onclick="userController.logout()">Cerrar sesión</a>
        `;
    }

    logout() {
        sessionStorage.removeItem('currentUser');
        location.reload();
    }
} 