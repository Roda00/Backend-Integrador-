const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const {isAuth, isAdmin} = require('../middlewares/isAuth'); 

// obtener todos los usuarios
router.get("/users", userController.getUsers);

// obtener un usuario por ID
router.get("/users-id", userController.getUserById);

// crear un nuevo usuario 
router.post("/users", userController.createUser); 

// obtener un usuario por ID
router.get("/users/:id", userController.getUserById); 

// eliminar un usuario por ID
router.delete("/users/:id", userController.deleteUserById);

// actualizar un usuario por ID
router.put("/users/:id", [isAuth, isAdmin], userController.updateUserById);

// realizar login de un usuario
router.post("/login", userController.loginUser);

// modificar la contraseña de un usuario


// exportar el router
module.exports = router;