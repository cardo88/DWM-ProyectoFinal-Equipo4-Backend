// Rutas para producto
const express = require('express');
const router = express.Router();
const triviaController = require('../controllers/triviaController');
const authMiddleware = require('../middlewares/authenticateJWT');

// api/productos
router.post('/', triviaController.createQuestion);
router.get('/', triviaController.getQuestions);
router.put('/:id', triviaController.updateQuestion);
router.get('/:id', triviaController.getQuestion);
router.delete('/:id', triviaController.deleteQuestion);

router.put('/:id/vote/positive', triviaController.addVotePositive);
router.put('/:id/vote/neutral', triviaController.addVoteNeutral);
router.put('/:id/vote/negative', triviaController.addVoteNegative);

module.exports = router;