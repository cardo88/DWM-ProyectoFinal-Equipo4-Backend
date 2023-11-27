const express = require('express');
const router = express.Router();
const proposalController = require('../controllers/proposalsController');
const authMiddleware = require('../middlewares/authenticateJWT');

router.get('/:id', authMiddleware, proposalController.getProposalId);
router.post('/', authMiddleware, proposalController.createProposal);
router.get('/', authMiddleware, proposalController.getProposals);
router.delete('/:id', authMiddleware, proposalController.deleteProposal);

module.exports = router;
