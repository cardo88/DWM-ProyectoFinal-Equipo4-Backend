const Hangman = require('../models/Hangman');

exports.createWord = async (req, res) => {
    try {
        const word = new Hangman(req.body);
        await word.save();
        res.status(201).json(word);
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

exports.getWords = async (req, res) => {

    try {

        const words = await Hangman.find();
        res.json(words)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.updateWord = async (req, res) => {

    try {
        const { word, correctWord} = req.body;
        let word1 = await Hangman.findById(req.params.id);

        if (!word1) {
            res.status(404).json({ msg: 'No existe el producto' })
        }

        word1.word = word;
        word1.correctWord = correctWord;

        word1 = await Hangman.findOneAndUpdate({ _id: req.params.id }, word1, { new: true })
        res.json(word1);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.getWord = async (req, res) => {

    try {
        let word = await Hangman.findById(req.params.id);

        if (!word) {
            res.status(404).json({ msg: 'No existe el producto' })
        }

        res.json(word);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.deleteWord = async (req, res) => {

    try {
        let word = await Hangman.findById(req.params.id);

        if (!word) {
            res.status(404).json({ msg: 'No existe el producto' })
        }

        await Hangman.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Producto eliminado con exito' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}