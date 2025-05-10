const Product = require("../models/product.model")

// obtener todos los productos

async function getProducts(req, res) {
    try {
        

        const products = await Product.find()


        res.status(200).send({
            message: "Lista de productos",
            products: products
        })


    } catch (error) {
        console.error("Error al obtener los productos:", error)
        res.status(500).json({ message: "Error al obtener los productos" })
    }
}

// obtener un producto por ID
async function getProductById(req, res) {
    try {
        res.status(200).json({
            message: "Lista de productos",
            data: [
                {
                    id: 1,
                    name: "Producto 1",
                    price: 100
                },
                {
                    id: 2,
                    name: "Producto 2",
                    price: 200
                }
            ]
        })
    } catch (error) {
        console.error("Error al obtener los productos:", error)
        res.status(500).json({ message: "Error al obtener los productos" })
    }
}
// crear un nuevo producto
async function createProduct(req, res) {
    try {

        console.log("req.file", req.files)
        console.log("req.body", req.body)

        const product = new Product(req.body)
        if(req.files) {product.image = req.files[`image`].map(file => file.filename)}
        if(req.files) {product.color = req.files[`color`].map(file => file.filename)}

        const newProduct = await product.save()


        return res.status(200).send({
            message: "Producto creado correctamente",
            product: newProduct
        })
    } catch (error) {
        console.error("Error al crear el producto:", error)
        res.status(500).send({ message: "Error al crear el producto" })
    }
}
// eliminar un producto por ID
async function deleteProduct(req, res) {
    try {
        res.status(200).json({
            message: "Lista de productos",
            data: [
                {
                    id: 1,
                    name: "Producto 1",
                    price: 100
                },
                {
                    id: 2,
                    name: "Producto 2",
                    price: 200
                }
            ]
        })
    } catch (error) {
        console.error("Error al obtener los productos:", error)
        res.status(500).json({ message: "Error al obtener los productos" })
    }
}
// actualizar un producto por ID
async function updateProduct(req, res) {
    try {
        res.status(200).json({
            message: "Lista de productos",
            data: [
                {
                    id: 1,
                    name: "Producto 1",
                    price: 100
                },
                {
                    id: 2,
                    name: "Producto 2",
                    price: 200
                }
            ]
        })
    } catch (error) {
        console.error("Error al obtener los productos:", error)
        res.status(500).json({ message: "Error al obtener los productos" })
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
}
