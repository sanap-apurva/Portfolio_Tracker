const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  stock: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: ['buy', 'sell'], required: true }
});

module.exports = mongoose.model('Trade', tradeSchema);
