const mongoose = require('mongoose')

const groceryEntrySchema = new mongoose.Schema({
  date: { type: String, required: true },
  stockItem: { type: String, required: true },
  unit: { type: String, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
  ratePerUnit: { type: Number, required: true },
}, { timestamps: true });

const Grocery = mongoose.model('Grocery',groceryEntrySchema)
module.exports = Grocery