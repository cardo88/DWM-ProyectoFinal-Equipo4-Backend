const mongoose = require('mongoose');

const propousalSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    activities:{
        type: [mongoose.Schema.Types.ObjectId], //no sé si está bien esto
        ref: 'Trivia'
    },
});

const Propousal = mongoose.model('Propousal', propousalSchema);

module.exports = Propousal;
