const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middlewares/authenticateJWT');

// api/productos
router.post('/',  roomController.createRoom);
router.get('/',  roomController.getRooms);
router.get('/:codeNumber',  roomController.getCodeNumber);
router.delete('/:id',  roomController.deleteRoom);
router.get('/questions/:codeNumber',  roomController.getQuestions);

module.exports = router;