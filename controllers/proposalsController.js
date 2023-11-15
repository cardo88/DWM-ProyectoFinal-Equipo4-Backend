const Proposal = require('../models/proposal');

exports.createProposal = async (req, res) => {
    try {
        const existingProposal = await Proposal.findOne({ name: req.body.name });

        if (existingProposal) {
            return res.status(400).json({ msg: 'Ya existe una propuesta con este nombre' });
        }
        const { name, activities } = req.body;
        const newProposal = new Proposal({ name, activities });
        await newProposal.save();
        res.status(201).json(newProposal);
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
};

exports.getProposals = async (req, res) => {
    try {
        const proposals = await Proposal.find().populate('activities');
        res.status(200).json(proposals);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

exports.deleteProposal = async (req, res) => {
    try {
        let proposal = await req.findById(req.params.id);
        if (!proposal) {
            res.status(404).json({ msg: 'No existe la propuesta' })
        }
        await req.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Propuesta eliminada con éxito' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};
