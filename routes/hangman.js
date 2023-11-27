// Rutas para producto
const express = require('express');
const router = express.Router();
const hangmanController = require('../controllers/hangmanController');
const authMiddleware = require('../middlewares/authenticateJWT');

// api/productos
router.post('/', authMiddleware, hangmanController.createWord);
router.get('/', authMiddleware, hangmanController.getWords);
router.put('/:id', authMiddleware, hangmanController.updateWord);
router.get('/:id', authMiddleware, hangmanController.getWord);
router.delete('/:id', authMiddleware, hangmanController.deleteWord);

module.exports = router;