const router = require('express').Router();
const {isAuth, isAdmin} = require('../middlewares/isAuth');
const orderController = require('../controllers/order.controller');

// Obtener todas las ordenes
router.get('/orders',[isAuth, isAdmin] ,orderController.getOrders);


// Crear una orden
router.post('/orders',[isAuth], orderController.createOrder);

module.exports = router;