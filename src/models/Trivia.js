const mongoose = require('mongoose');

const triviaSchema = new mongoose.Schema({
    question:{
        type: String,
        required: true
    },
    options:{
        type: [String],
        required: true
    },
    correctAnswer:{
        type: String,
        required: true
    },
    fechaCreacion: { 
        type: Date, 
        default: Date.now() 
    },
});

module.exports = mongoose.model('Trivia', triviaSchema);


