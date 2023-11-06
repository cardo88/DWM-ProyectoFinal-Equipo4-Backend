const socketIo = require('socket.io');

const io = (server) => {
    const io = socketIo(server);
    console.log('Info msg: ./config/websocket.js >> socketIo habilitado.');

    io.on('connection', (socket) => {

        const handshake = socket.id;
        let { nameRoom } = socket.handshake.query;
        console.log("Nuevo dispositivo: ${handshake} conentado a la ${nameRoom}");
        socket.join(nameRoom)

        socket.on('evento', (res) => {
            // Emite el mensaje a todos lo miembros de las sala menos a la persona que envia el mensaje   
            socket.to(nameRoom).emit('evento', res);
        })

        socket.on('disconnect', () => {
            console.log('Usuario desconectado');
        });
    });

    return io;

};

module.exports = io;