const express = require('express');

const cors = require("cors");

const routes = require("./routes/index.js");

const app = express();

// Middlleware
app.use(cors());

app.use(express.json());

app.use(express.static("uploads"));

app.use("/api", routes);


module.exports = app;