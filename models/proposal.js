const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    activities: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Trivia',
          required: true
        },
    ],
    fechaCreacion: { 
        type: Date, 
        default: Date.now() 
    },
});

module.exports = mongoose.model('Proposal', proposalSchema);
