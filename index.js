const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors");

// Creamos el servidor
const app = express();

// Conectamos a la BD
connectDB();
app.use(cors())

app.use(express.json());

//rutas
app.use('/api/products', require('./routes/product'));
app.use('/api/question', require('./routes/trivia'));

const port = 4000;
app.listen(port, () => {
    console.log(`Servidor Express en ejecución en el puerto ${port}`);
});
