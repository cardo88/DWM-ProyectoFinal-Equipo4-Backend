const Trivia = require('../models/Trivia');

exports.createQuestion = async (req, res) => {
    try {
        const question = new Trivia(req.body);
        await question.save();
        res.status(201).json(question);
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Manejar errores de validación
            const validationErrors = {};
            for (const field in error.errors) {
                validationErrors[field] = error.errors[field].message;
            }
            res.status(400).json({ errors: validationErrors });
        } else {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
    }
}

exports.getQuestions = async (req, res) => {

    try {

        const questions = await Trivia.find();
        res.json(questions)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.updateQuestion = async (req, res) => {

    try {
        const { question, options, correctAnswer } = req.body;
        let question1 = await Trivia.findById(req.params.id);

        if (!question1) {
            res.status(404).json({ msg: 'No existe el producto' })
        }

        question1.question = question;
        question1.options = options;
        question1.correctAnswer = correctAnswer;

        question1 = await Trivia.findOneAndUpdate({ _id: req.params.id }, question1, { new: true })
        res.json(question1);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.getQuestion = async (req, res) => {

    try {
        let question = await Trivia.findById(req.params.id);

        if (!question) {
            res.status(404).json({ msg: 'No existe el producto' })
        }

        res.json(question);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.deleteQuestion = async (req, res) => {

    try {
        let question = await Trivia.findById(req.params.id);

        if (!question) {
            res.status(404).json({ msg: 'No existe el producto' })
        }

        await Trivia.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Producto eliminado con exito' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.updateQuestion = async (req, res) => {
    try {
        const { isChecked } = req.body;
        let question = await Trivia.findById(req.params.id);

        if (!question) {
            res.status(404).json({ msg: 'No existe la pregunta' });
        }

        // Actualizar el estado del checkbox
        question.isChecked = isChecked;

        // Guardar los cambios
        question = await question.save();

        res.json(question);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

exports.addVotePositive = async (req, res) => {
    try {
        const { room } = req.body;
        const question = await Trivia.findById(req.params.id);

        if (!question) {
            res.status(404).json({ msg: 'No existe la pregunta' });
            return;
        }

        // Buscar el voto correspondiente al room
        let roomVote = question.votes.find(vote => vote.room === room);

        // Si el room no existe, agregarlo con valores por defecto
        if (!roomVote) {
            roomVote = { room, voteCounts: { '+1': 1, '0': 0, '-1': 0 } };
            question.votes.push(roomVote);
            // Marcar la instancia de question como modificada
            question.markModified('votes');
        } else {
            // Aumentar el valor de "+1"
            roomVote.voteCounts['+1']++;
        }

        // Guardar los cambios
        const updatedQuestion = await question.save();

        res.json(updatedQuestion);
    } catch (error) {
        console.log('Error al guardar los cambios:', error);
        res.status(500).send('Hubo un error');
    }
}

exports.addVoteNeutral = async (req, res) => {
    try {
        const { room } = req.body;
        const question = await Trivia.findById(req.params.id);

        if (!question) {
            res.status(404).json({ msg: 'No existe la pregunta' });
            return;
        }

        // Buscar el voto correspondiente al room
        let roomVote = question.votes.find(vote => vote.room === room);

        // Si el room no existe, agregarlo con valores por defecto
        if (!roomVote) {
            roomVote = { room, voteCounts: { '+1': 0, '0': 1, '-1': 0 } };
            question.votes.push(roomVote);
            // Marcar la instancia de question como modificada
            question.markModified('votes');
        } else {
            // Aumentar el valor de "0"
            roomVote.voteCounts['0']++;
        }

        // Guardar los cambios
        const updatedQuestion = await question.save();

        res.json(updatedQuestion);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.addVoteNegative = async (req, res) => {
    try {
        const { room } = req.body;
        const question = await Trivia.findById(req.params.id);

        if (!question) {
            res.status(404).json({ msg: 'No existe la pregunta' });
            return;
        }

        // Buscar el voto correspondiente al room
        let roomVote = question.votes.find(vote => vote.room === room);

        // Si el room no existe, agregarlo con valores por defecto
        if (!roomVote) {
            roomVote = { room, voteCounts: { '+1': 0, '0': 0, '-1': 1 } };
            question.votes.push(roomVote);
            // Marcar la instancia de question como modificada
            question.markModified('votes');
        } else {
            // Aumentar el valor de "-1"
            roomVote.voteCounts['-1']++;
        }

        // Guardar los cambios
        const updatedQuestion = await question.save();

        res.json(updatedQuestion);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
