const room = require('../models/room');

exports.createRoom = async (req, res) => {
    try {
        const codeNumber = new room(req.body);
        await codeNumber.save();
        res.status(201).json(codeNumber);
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

exports.getCodeNumber = async (req, res) => {

    try {
        let codeNumber = await room.findById(req.params.id);

        if (!codeNumber) {
            res.status(404).json({ msg: 'No existe el código' })
        }

        res.json(codeNumber);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.deleteRoom = async (req, res) => {

    try {
        let codeNumber = await room.findById(req.params.id);

        if (!codeNumber) {
            res.status(404).json({ msg: 'No existe el código' })
        }

        await room.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Sala de juego eliminada con exito' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}