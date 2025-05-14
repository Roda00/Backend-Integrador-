const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({

    nombre: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 4,
        trim: true,
    },
    descripcion: {
        type: String,
        required: true,
        minlength: 10,
        trim: true,
    },
    precio: {
        type: Number,
        required: true,
        min: 0,
    },
    image: {
        type: [String],
        required: true,
        trim: true,
    },
    categoria: {
        type: String,
        required: true,
        trim: true,
    },
    color: {
        type: [String],
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },



})

module.exports = mongoose.model('Product', productSchema);