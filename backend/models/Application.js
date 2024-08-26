const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  aadhar: { type: String, unique: true, required: true },
  passportType: { type: String, required: true },
  bookletType: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  maritalStatus: { type: String, required: true },
  nameChanged: { type: String },
  placeOfBirthIndia: { type: String, required: true },
  distinguishingMark: { type: String },
  citizenshipBy: { type: String, required: true },
  employmentType: { type: String, required: true },
  education: { type: String, required: true },
  govtServant: { type: String },
  noECRCateg: { type: String },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  sameAsPermanent: { type: String, required: true },
  permanentAddress: {
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String }
  },
  holdIC: { type: String },
  prevPassportDetails: { type: String },
  appliedBefore: { type: String }
});

module.exports = mongoose.model('Application', ApplicationSchema);
