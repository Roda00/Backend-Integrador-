const express = require('express');

const dotenv = require('dotenv').config();

const app = require('./app.js');

const mongoose = require('mongoose');

const PORT = process.env.PORT

const mongo_uri= process.env.MONGO_URI



mongoose.connect(mongo_uri)
.then(() => {
    console.log('Connectado a la DB');

    app.listen(PORT)
})
.catch((err) => {
    console.error('Error conectando a la DB:', err);
});

app.use(express.json());


