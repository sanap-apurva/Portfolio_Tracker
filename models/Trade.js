// models/Trade.js
const mongoose = require('mongoose');
const Counter = require('./Counter');

const tradeSchema = new mongoose.Schema({
  tradeId: { type: Number, unique: true }, // Add the incremental trade ID
  stock: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: ['buy', 'sell'], required: true }
});

// Pre-save middleware to auto-increment tradeId
tradeSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { id: 'tradeId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true } // Create a new counter if it doesn't exist
    );
    this.tradeId = counter.seq;
  }
  next();
});

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;
