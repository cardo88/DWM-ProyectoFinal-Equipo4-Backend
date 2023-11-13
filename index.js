const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors");
const io = require('./config/websocket');
////////////////////////////////
const mongoose = require("mongoose");
const fs = require('fs');

// Creamos el servidor
const app = express();

const server = require('http').createServer(app);
const socketIo = io(server);

// Conectamos a la BD
conectarDB();

//
app.use(cors());
//middleware
app.use(express.json());

app.use('/api/questions', require('./routes/trivia'));
app.use('/api/hangman', require('./routes/hangman'));
app.use('/api/rooms', require('./routes/room'));
app.use('/api/proposals', require('./routes/proposal'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Info msg: index.js >> El servidor está corriendo correctamente en el puerto ${PORT}`)
})

////////////////////////////////

//conexión a la BD con mongoose
const BD = process.env.DB_MONGO;

mongoose.connect(BD, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(()=>{ console.log("Conexión exitosa a la BD")});

/**
app.get('/', (req, res) => {
    res.status(200).json({message:":) hola", app: 'DW&M-ProyectoFinal Eq4'})
})
*/

const users = JSON.parse(
    fs.readFileSync(`${__dirname}/src/data/users.json`)
);

app.get('/api/users', (req, res) => {
    res.status(200).json({
        status: 'éxitoso',
        results: users.length,
        data:{
            users
        }
    });
});

app.post('/api/users', (req, res) => {
    console.log(req.body);
    res.send('Hecho!');
})
