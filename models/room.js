const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    codeNumber:{
        type: String,
        required: true
    },
    propousalId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Propousal',
        required: true
    },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
