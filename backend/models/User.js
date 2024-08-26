const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  aadhar: { type: String, unique: true, required: true },
  dob: { type: Date, required: true },
  mobile: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  passportType: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);
