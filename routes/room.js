const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// api/productos
router.post('/', roomController.createRoom);
router.get('/:id', roomController.getCodeNumber);
router.delete('/:id', roomController.deleteRoom);

module.exports = router;