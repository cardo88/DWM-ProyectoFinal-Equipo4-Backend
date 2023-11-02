const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// api/productos
router.post('/', roomController.createCodeNumber);
router.get('/', roomController.getCodeNumbers);
router.get('/:id', roomController.getCodeNumber);
router.delete('/:id', roomController.deleteRoom);

module.exports = router;