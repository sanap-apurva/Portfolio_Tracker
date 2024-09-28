const Trade = require('../models/Trade');

// Retrieve the entire portfolio
exports.getPortfolio = async (req, res) => {
  try {
    const trades = await Trade.find();
    res.json({ success: true, data: trades });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get holdings (average buy price, total quantity)
exports.getHoldings = async (req, res) => {
  try {
    const trades = await Trade.find();
    const holdings = {};

    trades.forEach(trade => {
      const { stock, quantity, price, type } = trade;

      if (!holdings[stock]) {
        holdings[stock] = { totalQuantity: 0, totalSpent: 0 };
      }

      if (type === 'buy') {
        holdings[stock].totalQuantity += quantity;
        holdings[stock].totalSpent += quantity * price;
      } else if (type === 'sell') {
        holdings[stock].totalQuantity -= quantity;
      }
    });

    const response = Object.keys(holdings).map(stock => ({
      stock,
      quantity: holdings[stock].totalQuantity,
      avgBuyPrice: holdings[stock].totalQuantity
        ? (holdings[stock].totalSpent / holdings[stock].totalQuantity).toFixed(2)
        : 0
    }));

    res.json({ success: true, data: response });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Calculate cumulative return
exports.getReturns = async (req, res) => {
  try {
    const trades = await Trade.find();
    const holdings = {};
    let initialValue = 0;
    let currentValue = 0;
    const finalPrice = 100;

    trades.forEach(trade => {
      const { stock, quantity, price, type } = trade;

      if (!holdings[stock]) {
        holdings[stock] = { totalQuantity: 0, totalSpent: 0 };
      }

      if (type === 'buy') {
        holdings[stock].totalQuantity += quantity;
        holdings[stock].totalSpent += quantity * price;
      } else if (type === 'sell') {
        holdings[stock].totalQuantity -= quantity;
      }
    });

    Object.keys(holdings).forEach(stock => {
      initialValue += holdings[stock].totalSpent;
      currentValue += holdings[stock].totalQuantity * finalPrice;
    });

    const returnValue = ((currentValue - initialValue) / initialValue) * 100;

    res.json({ success: true, data: { initialValue, currentValue, returnValue } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Add a new trade
exports.addTrade = async (req, res) => {
  const { stock, quantity, price, date, type } = req.body;

  try {
    const trade = new Trade({ stock, quantity, price, date, type });
    await trade.save();
    res.json({ success: true, data: trade });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update an existing trade by tradeId
exports.updateTrade = async (req, res) => {
    console.log("req body------", req.body);
    
    const { tradeId, quantity, price, date, type } = req.body;
  
    try {
      if (tradeId == undefined) {
        res.status(400).json({ success: false, error: "Please provide the trade ID to update" });
        return;
      }
  
      const trade = await Trade.findOneAndUpdate(
        { tradeId: tradeId },
        { quantity, price, date, type },
        { new: true }
      );
  
      if (!trade) {
        return res.status(404).json({ success: false, error: "Trade not found" });
      }
  
      res.json({ success: true, data: trade });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };
  
// Remove an existing trade by tradeId
exports.removeTrade = async (req, res) => {
    const { tradeId } = req.body;
  
    try {
      const trade = await Trade.findOneAndDelete({ tradeId: tradeId });
  
      if (!trade) {
        return res.status(404).json({ success: false, error: "Trade not found" });
      }
  
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };
  