const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors");
////////////////////////////////
const mongoose = require("mongoose");
const fs = require('fs');

// Creamos el servidor
const app = express();

const server = require('http').createServer(app);

// Conectamos a la BD
conectarDB();

//
app.use(cors());
//middleware
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/questions', require('./routes/trivia'));
app.use('/api/hangman', require('./routes/hangman'));
app.use('/api/rooms', require('./routes/room'));
app.use('/api/proposals', require('./routes/proposal'));

const PORTnode = process.env.PORT || 4000;

app.listen(PORTnode, () => {
    console.log(`Info msg: index.js >> El servidor está corriendo correctamente en el puerto ${PORTnode}`)
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


// -------------------------------CONFIGURACION PARA WEBSOCKET---------------------------------------
// ________  ________  ________  ________  ________  ________  ________  ________  ________  ________  
//         \/        \/        \/        \/        \/        \/        \/        \/        \/        


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

    //Socket Target: mensaje generico para pruebas
    socket.on('mensaje', ({ room, mensaje }) => {
        console.log(room + ' | ' + mensaje);
        socket.join(room);
        io.to(room).emit('mensaje', { mensaje }); //puedo usar esto para enviar mensajes a la sala
        //recordar que si el usuario cambia de sala, debo usar el leave de Socket.IO.
    })

    //Socket Target: para cuando se une un PLAYER a una ROOM
    socket.on('joinRoom', ({ room, nickname }) => {
        let socketid = socket.id;
        console.log('Socket.id ' + socketid + ' | Nickname: ' + nickname + ' | Sala: ' + room);
        socket.join(room);
        io.to(room).emit('joinRoom', { socketid, room, nickname }); //puedo usar esto para enviar mensajes a la sala
        //recordar que si el usuario cambia de sala, debo usar el leave de Socket.IO.
    })

    //Socket Target: comienzo de PARTIDA en una ROOM
    socket.on('roomStartPlay', ({ room, play }) => {
        console.log(room + ' | ' + play);
        socket.join(room);
        io.to(room).emit('roomStartPlay', { play }); //puedo usar esto para enviar mensajes a la sala
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


// ________/\________/\________/\________/\________/\________/\________/\________/\________/\________
// -------------------------------CONFIGURACION PARA WEBSOCKET---------------------------------------
