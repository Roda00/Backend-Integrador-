const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        precio: {
            type: Number,
            required: true
        }
    }],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'canceled'],
        default: 'pending'
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
    


})

module.exports = mongoose.model('Order', orderSchema);