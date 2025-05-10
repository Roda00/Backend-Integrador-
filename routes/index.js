const products_router = require('./product.routes');
const users_router = require('./user.routes');
// const category_router = require('./category.routes');
const order_router = require('./order.routes');

module.exports = [ products_router, users_router, order_router ];