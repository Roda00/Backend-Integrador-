const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const {isAuth, isAdmin} = require('../middlewares/isAuth'); 
const upload = require('../middlewares/uploadFile');


// Obtener todos los productos
router.get("/products", productController.getProducts);

// Obtener un producto por ID

router.get('/products/:id', productController.getProductById);

// Crear un nuevo producto
router.post('/products', [upload, isAuth, isAdmin] ,productController.createProduct);

// Eliminar un producto por ID
router.delete('/products/:id',[isAdmin, isAuth] ,productController.deleteProduct);

// Actualizar un producto por ID
router.put('/products/:id', [upload, isAuth, isAdmin] ,productController.updateProduct);

// Exportar el router
module.exports = router;