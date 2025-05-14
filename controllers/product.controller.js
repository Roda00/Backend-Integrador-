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
        const productId = await Product.findById(req.params.id)

        if (!productId) {
            return res.status(404).send({ message: "Producto no encontrado" })
        }

        res.status(200).send({
            message: "Producto encontrado",
            product: productId
        })
    } catch (error) {
        console.error("Error al obtener los productos:", error)
        res.status(500).json({ message: "Error al obtener los productos" })
    }
}
// crear un nuevo producto
async function createProduct(req, res) {
    try {

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
        const productDeleted = await Product.findByIdAndDelete(req.params.id)

        if (!productDeleted) {
            return res.status(404).send({ message: "Producto no encontrado" })
        }
        res.status(200).send({
            message: "Producto eliminado",
            product: productDeleted
        })

    } catch (error) {
        console.error("Error al obtener los productos:", error)
        res.status(500).json({ message: "Error al obtener los productos" })
    }
}
// actualizar un producto por ID
async function updateProduct(req, res) {
    try {
        
        const id = req.params.id
        
        const data = req.body

        data.updatedAt = Date.now()

        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })

        if (!updatedProduct) {
            return res.status(404).send({ message: "Producto no encontrado" })
        }

        res.status(200).send({
            message: "Producto actualizado",
            product: updatedProduct
        })


    } catch (error) {
        console.error("Error al obtener los productos:", error)
        res.status(500).send({ message: "Error al obtener los productos" })
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
}
