const Order = require("../models/order.model")

async function createOrder(req, res) {
    try {
        const data = req.body
        const order = new Order(data)

        const newOrder = await order.save()
        res.status(200).send({
            message: "Orden creada correctamente",
            order: newOrder
        })

    } catch (error) {
        console.error("Error al crear la orden:", error)
        res.status(500).send({ message: "Error al crear la orden" })
    }
}

async function getOrders(req, res) {
    try {

        const id = req.user._id
        const user = req.user.role === 'admin' ? {} : { user: id }

        const orders = await Order.find(user).sort({createdAt: -1})
        .populate('user', 'nombrecompleto email')
        .populate('products.product', 'nombre precio image color')
        res.status(200).send({
            message: "Lista de ordenes",
            orders
        })
    } catch (error) {
        console.error("Error al obtener las ordenes:", error)
        res.status(500).send({ message: "Error al obtener las ordenes" })
    }
}

module.exports = {
    createOrder,
    getOrders
}