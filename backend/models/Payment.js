const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  aadhar: { type: String, unique: true, required: true },
  totalAmt: { type: Number },
  selectedPayment: { type: String },
});

module.exports = mongoose.model('Payment', PaymentSchema);
