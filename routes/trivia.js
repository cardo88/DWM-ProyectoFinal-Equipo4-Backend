// Rutas para producto
const express = require('express');
const router = express.Router();
const triviaController = require('../controllers/triviaController');

// api/productos
router.post('/', triviaController.createQuestion);
router.get('/', triviaController.getQuestions);
router.put('/:id', triviaController.updateQuestion);
router.get('/:id', triviaController.getQuestion);
router.delete('/:id', triviaController.deleteQuestion);

module.exports = router;