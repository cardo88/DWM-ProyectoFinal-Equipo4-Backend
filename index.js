const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors");

// Creamos el servidor
const app = express();

const server = require('http').createServer(app);

// Conectamos a la BD
conectarDB();

app.use(cors())
app.use(express.json());

app.use('/api/questions', require('./routes/trivia'));
app.use('/api/hangman', require('./routes/hangman'));
app.use('/api/rooms', require('./routes/room'));
app.use('/api/proposals', require('./routes/proposal'));

const PORTnode = process.env.PORT || 4000;

app.listen(PORTnode, () => {
    console.log(`Info msg: index.js >> El servidor está corriendo correctamente en el puerto ${PORTnode}`)
})






// configuración para websocket

const options = {
    cors: {
        origin: 'http://localhost:4200',
    },
};

const io = require('socket.io')(server, options);

app.get('/', function (req, res) {
    res.send('Hello World!');
});

io.on('connection', (socket) => {

    socket.on('joinRoom', ({ room }) => {
        console.log(room);
        socket.join(room);
        console.log('Usuario ' + socket.id + 'se unió a la sala ' + room);
        // io.to(nameRoom).emit('joinRoom', room);
        io.to(room).emit('evento', { mensaje: 'Mensaje para la sala '+room+': se ha unido el dispositivo: '+socket.id }); //puedo usar esto para enviar mensajes a la sala
        //recordar que si el usuario cambia de sala, debo usar el leave de Socket.IO.
    })

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

const PORTwebsocket = process.env.PORT || 5000;

server.listen(PORTwebsocket, function () {
    console.log(`Info msg: index.js >> WebSocket listo y escuchando por el puerto: ` + PORTwebsocket)
})

