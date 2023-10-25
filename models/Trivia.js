const mongoose = require('mongoose');

// Conéctate a la base de datos MongoDB
// mongoose.connect('mongodb://localhost/tu_base_de_datos', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// Define el modelo para las preguntas
const TriviaSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Trivia', TriviaSchema);


