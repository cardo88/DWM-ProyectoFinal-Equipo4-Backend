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
    isChecked: { 
        type: Boolean, 
        default: false 
    },
    fechaCreacion: { 
        type: Date, 
        default: Date.now() 
    },
    votes: [{
        room: String,
        voteCounts: {
            '+1': { type: Number, default: 0 },
            '0': { type: Number, default: 0 },
            '-1': { type: Number, default: 0 },
        },
    }],
});

module.exports = mongoose.model('Trivia', triviaSchema);


