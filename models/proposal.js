const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    activities: [
    ],
    fechaCreacion: { 
        type: Date, 
        default: Date.now() 
    },
});

module.exports = mongoose.model('Proposal', proposalSchema);
