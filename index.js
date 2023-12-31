const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors");
require('dotenv').config();

////////////////////////////////

const mongoose = require("mongoose");
const fs = require('fs');
//const userRouter = require('./routes/userRoutes');

// Creamos el servidor
const app = express();

const server = require('http').createServer(app);

// Conectamos a la BD
conectarDB();

app.use(cors());
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/questions', require('./routes/trivia'));
app.use('/api/hangman', require('./routes/hangman'));
app.use('/api/rooms', require('./routes/room'));
app.use('/api/proposals', require('./routes/proposal'));
app.use('/api/user', require('./routes/userRoutes'));


const PORTnode = process.env.PORT || 4000;
app.listen(PORTnode, () => {
    console.log(`Info msg: index.js >> El servidor está corriendo correctamente en el puerto ${PORTnode}`)
});

////////////////////////////////

// const users = JSON.parse(
//     fs.readFileSync(`${__dirname}/src/data/users.json`)
// );

// app.get('/api/users', (req, res) => {
//     res.status(200).json({
//         status: 'éxito',
//         results: users.length,
//         data:{
//             users
//         }
//     });
// });

// app.post('/api/users/signup', (req, res) => {
//     console.log(req.body);
//     res.send('Hecho!');
// });

module.exports = app;


// -------------------------------CONFIGURACION PARA WEBSOCKET---------------------------------------
// ________  ________  ________  ________  ________  ________  ________  ________  ________  ________  
//         \/        \/        \/        \/        \/        \/        \/        \/        \/        


const options = {
    cors: {
        origin: 'http://localhost:4200',
    }
};

const io = require('socket.io')(server, options);

app.get('/', function (req, res) {
    res.send('Hello World!');
});

io.on('connection', (socket) => {

    //Socket Target: mensaje generico para pruebas
    socket.on('mensaje', ({ room, mensaje }) => {
        console.log(room + ' | ' + mensaje);
        socket.join(room);
        io.to(room).emit('mensaje', { mensaje });
    })

    //Socket Target: para cuando se une un PLAYER a una ROOM
    socket.on('joinRoom', ({ room, nickname }) => {
        let socketid = socket.id;
        console.log('joinRoom >> Socket.id ' + socketid + ' | Nickname: ' + nickname + ' | Sala: ' + room);
        socket.join(room);
        io.to(room).emit('joinRoom', { socketid, room, nickname });
    })

    //Socket Target: comienzo de PARTIDA en una ROOM
    socket.on('roomStartPlay', ({ room, play }) => {
        console.log('roomStartPlay >> ' + room + ' | ' + play);
        socket.join(room);
        io.to(room).emit('roomStartPlay', { play });
    })

    //Socket Target: avisar que un PLAYER termino de jugar
    socket.on('playerFinished', ({ room, nickname }) => {
        let socketid = socket.id;
        console.log('playerFinished >> Socket.id ' + socketid + ' | Nickname: ' + nickname + ' | Sala: ' + room);
        socket.join(room);
        io.to(room).emit('playerFinished', { socketid, room, nickname });
    })

    socket.on('disconnect', () => {
        console.log('Usuario desconectado. Socket ID:' + socket.id);
    });
});



const PORTwebsocket = process.env.WEBSOCKET_PORT || 5050;
//const websocketServer = http.createServer();
server.listen(PORTwebsocket, function () {
    console.log(`Info msg: index.js >> WebSocket listo y escuchando por el puerto:` + PORTwebsocket)
});

// ________/\________/\________/\________/\________/\________/\________/\________/\________/\________
// -------------------------------CONFIGURACION PARA WEBSOCKET---------------------------------------
