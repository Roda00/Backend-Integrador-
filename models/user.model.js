const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userschema = new Schema({

    nombrecompleto: {
        type: String,
        required: true,
        maxlength: 35,
        minlength: 4,
        trim: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        maxlength: 100,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `${props.value} no es un correo electrónico válido!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 100,
        trim: true
    },
    date: {
        type: Date,
        required: true,
    },
    pais: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'moderator', 'editor'],
        default: 'user'
    },
    image: {
        type: [String],
        required: true,
        trim: true,
    }

})

module.exports = mongoose.model('User', userschema);