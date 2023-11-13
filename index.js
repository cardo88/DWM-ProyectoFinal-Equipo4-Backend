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

    // let playersRoom = 0;
    let room;

    socket.on('joinRoom', ({ room, nickname }) => {
        let socketid = socket.id;
        console.log('Socket.id ' + socketid + ' | Nickname: ' + nickname + ' | Sala: ' + room);
        socket.join(room);
        io.to(room).emit('joinRoom', { socketid, room, nickname }); //puedo usar esto para enviar mensajes a la sala
        //recordar que si el usuario cambia de sala, debo usar el leave de Socket.IO.
    })

    socket.on('mensaje', ({ mensaje }) => {
        console.log(mensaje);
        socket.join(room);
        io.to(room).emit('mensaje', { mensaje }); //puedo usar esto para enviar mensajes a la sala
        //recordar que si el usuario cambia de sala, debo usar el leave de Socket.IO.
    })


    // socket.on('room', ({ room }) => {
    //     console.log(room);
    //     socket.join(room);
    //     io.to(room).emit('room', { room }); //puedo usar esto para enviar mensajes a la sala
    //     //recordar que si el usuario cambia de sala, debo usar el leave de Socket.IO.
    // })

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

const PORTwebsocket = process.env.PORT || 5000;

server.listen(PORTwebsocket, function () {
    console.log(`Info msg: index.js >> WebSocket listo y escuchando por el puerto: ` + PORTwebsocket)
})

