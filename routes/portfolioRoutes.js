const express = require('express');
const {
  getPortfolio, getHoldings, getReturns, addTrade, updateTrade, removeTrade
} = require('../controllers/portfolioController');

const router = express.Router();

router.get('/portfolio', getPortfolio);
router.get('/holdings', getHoldings);
router.get('/returns', getReturns);
router.post('/addTrade', addTrade);
router.post('/updateTrade', updateTrade);
router.post('/removeTrade', removeTrade);

module.exports = router;
