const router = require('express').Router();
const {isAuth} = require('../middlewares/isAuth');
const orderController = require('../controllers/order.controller');

// Obtener todas las ordenes
router.get('/orders',[isAuth] ,orderController.getOrders);


// Crear una orden
router.post('/orders',[isAuth], orderController.createOrder);

module.exports = router;