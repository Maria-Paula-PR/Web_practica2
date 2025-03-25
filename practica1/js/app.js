// inicializar la aplicacion
const userController = new UserController();

// verificar si el usuario ya esta logueado
const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
if (currentUser) {
    userController.updateUIForLoggedInUser(currentUser);
} 