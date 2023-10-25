const express = require('express');
const router = express.Router();
const triviaController = require('../controllers/triviaController');

//router.get('/', triviaController.getQuestions);
//router.post('/', triviaController.createQuestion);
//router.post('/question', triviaController.createQuestion);

router.post('/', triviaController.createQuestion);
router.get('/', triviaController.getQuestion);
router.put('/:id', triviaController.updateQuestion);
router.get('/:id', triviaController.getQuestion);
router.delete('/:id', triviaController.deleteQuestion);

module.exports = router;
