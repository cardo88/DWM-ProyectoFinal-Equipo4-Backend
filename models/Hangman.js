const mongoose = require('mongoose');

const triviaSchema = new mongoose.Schema({
    word:{
        type: String,
        required: true
    },
    correctWord:{
        type: String,
        required: true
    },
    fechaCreacion: { 
        type: Date, 
        default: Date.now() 
    },
});

module.exports = mongoose.model('Hangman', triviaSchema);

