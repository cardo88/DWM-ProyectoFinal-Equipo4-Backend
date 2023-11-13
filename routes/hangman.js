// Rutas para producto
const express = require('express');
const router = express.Router();
const hangmanController = require('../controllers/hangmanController');

// api/productos
router.post('/', hangmanController.createWord);
router.get('/', hangmanController.getWords);
router.put('/:id', hangmanController.updateWord);
router.get('/:id', hangmanController.getWord);
router.delete('/:id', hangmanController.deleteWord);

module.exports = router;