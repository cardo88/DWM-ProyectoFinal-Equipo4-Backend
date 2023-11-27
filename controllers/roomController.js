const Room = require('../models/Room');
const Proposal = require('../models/proposal');
const Trivia = require('../models/Trivia');


exports.createRoom = async (req, res) => {
    try {
        const existingRoom = await Room.findOne({ codeNumber: req.body.codeNumber });

        if (existingRoom) {
            return res.status(400).json({ msg: 'Ya existe una sala con este código' });
        }

        const codeNumber = new Room(req.body);
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
        let codeNumber = await Room.find({ codeNumber: req.params.codeNumber });
        if (!codeNumber ) {
            res.status(404).json({ msg: 'Error 404 en getCodeNumber.' })            
        }

        res.json(codeNumber);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.deleteRoom = async (req, res) => {

    try {
        let codeNumber = await Room.findById(req.params.id);

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

exports.getRooms = async (req, res) => {

    try {

        const rooms = await Room.find();
        res.json(rooms)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}



exports.getQuestions = async (req, res) => {
    try {
        const room = await Room.findOne({ codeNumber: req.params.codeNumber });

        if (!room) {
            return res.status(404).json({ msg: 'No se encontró la sala' });
        }

        const proposal = await Proposal.findById(room.propousalId);

        if (!proposal) {
            return res.status(404).json({ msg: 'No se encontró la propuesta asociada a la sala' });
        }

        // Obtener las preguntas asociadas a la propuesta (activities)
        const questions = await Trivia.find({ _id: { $in: proposal.activities } });

        res.status(200).json(questions);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};