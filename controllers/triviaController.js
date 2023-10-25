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
        let updateQuestion = await Trivia.findById(req.params.id);

        if (!updateQuestion) {
            res.status(404).json({ msg: 'No existe el producto' })
        }

        updateQuestion.nombre = nombre;
        updateQuestion.categoria = categoria;
        updateQuestion.ubicacion = ubicacion;

        updateQuestion = await Trivia.findOneAndUpdate({ _id: req.params.id }, updateQuestion, { new: true })
        res.json(updateQuestion);

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