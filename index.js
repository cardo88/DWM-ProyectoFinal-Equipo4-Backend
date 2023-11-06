const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors");
const io = require('./config/websocket');

// Creamos el servidor
const app = express();

const server = require('http').createServer(app);
const socketIo = io(server);

// Conectamos a la BD
conectarDB();

app.use(cors())
app.use(express.json());

app.use('/api/questions', require('./routes/trivia'));
app.use('/api/hangman', require('./routes/hangman'));
app.use('/api/rooms', require('./routes/room'));
app.use('/api/proposals', require('./routes/proposals'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Info msg: index.js >> El servidor está corriendo correctamente en el puerto ${PORT}`)
})
