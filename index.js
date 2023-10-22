const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors");

// Creamos el servidor
const app = express();

// Conectamos a la BD
connectDB();
app.use(cors())

app.use(express.json());

app.use('/api/products', require('./routes/product'));

app.listen(4000, () => {
    console.log('El servidor esta corriendo perfectamente')
})