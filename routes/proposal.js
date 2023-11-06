const express = require('express');
const router = express.Router();
const proposalController = require('../controllers/proposalsController');

router.post('/', proposalController.createProposal);
router.get('/', proposalController.getProposals);
router.delete('/:id', proposalController.deleteProposal);

module.exports = router;
