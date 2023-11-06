const express = require('express');
const router = express.Router();
const proposalController = require('../controllers/proposalsController');

router.post('/', proposalsController.createProposal);
router.get('/', proposalsController.getProposals);
router.delete('/:id', proposalsController.deleteProposal);

module.exports = router;
