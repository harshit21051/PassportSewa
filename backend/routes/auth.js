const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Application = require('../models/Application');
const Payment = require('../models/Payment');

// Create account
router.post('/signup', async (req, res) => {
  const { name, aadhar, dob, mobile, email, password, passportType } = req.body;

  try {
    // Check if mobile number already exists
    const existingMobile = await User.findOne({ mobile });
    if (existingMobile) {
      return res.status(400).json({ message: 'Mobile number already exists' });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Check if Aadhaar number already exists
    const existingAadhar = await User.findOne({ aadhar });
    if (existingAadhar) {
      return res.status(400).json({ message: 'Aadhaar number already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, aadhar, dob, mobile, email, password: hashedPassword, passportType });
    await newUser.save();
    res.status(201).json({ message: 'Account created successfully! Please wait...' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      // Exclude sensitive information like password before sending the user object
      const userData = {
        name: user.name,
        aadhar: user.aadhar,
        dob: user.dob,
        mobile: user.mobile,
        email: user.email,
        passportType: user.passportType
      };
      
      res.json({ success: true, user: userData });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error occurred:', error); // Debugging line
    res.status(500).json({ error: 'Server error' });
  }
});

// Application Submission Route
router.post('/apply', async (req, res) => {
  const {
    aadhar, passportType, bookletType, firstName, middleName, lastName, gender, dob,
    maritalStatus, nameChanged, placeOfBirthIndia, distinguishingMark,
    citizenshipBy, employmentType, education, govtServant, noECRCateg,
    addressLine1, addressLine2, city, state, postalCode, country, sameAsPermanent,
    permanentAddress, holdIC, prevPassportDetails, appliedBefore
  } = req.body;

  try {
    // Check if an application with the same aadhar already exists
    const existingApplication = await Application.findOne({ aadhar });
    if (existingApplication) {
      return res.status(400).json({ message: 'Your application is already under consideration' });
    }

    // Create a new application if no existing application is found
    const newApplication = new Application({
      aadhar, passportType, bookletType, firstName, middleName, lastName, gender, dob,
      maritalStatus, nameChanged, placeOfBirthIndia, distinguishingMark,
      citizenshipBy, employmentType, education, govtServant, noECRCateg,
      addressLine1, addressLine2, city, state, postalCode, country, sameAsPermanent,
      permanentAddress, holdIC, prevPassportDetails, appliedBefore
    });

    await newApplication.save();
    res.status(201).json({ message: 'Application submitted successfully! Please wait...' });
  } catch (error) {
    console.error('Error occurred:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to Check for Existing Application
router.get('/check-application', async (req, res) => {
  const { aadhar } = req.query;

  try {
    const application = await Application.findOne({ aadhar });
    if (application) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking application:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to fetch passportType and bookletType
router.get('/fetch-passpoort-booklet-type', async (req, res) => {
  const { aadhar } = req.query;

  try {
    // Find user by email
    const application = await Application.findOne({ aadhar });

    if (application) {
      const aadharData = {
        passportType: application.passportType,
        bookletType: application.bookletType
      };
      
      res.json({ success: true, aadhar: aadharData });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error occurred:', error); // Debugging line
    res.status(500).json({ error: 'Server error' });
  }
});

// Payment Record Route
router.post('/payment', async (req, res) => {
  const { aadhar, totalAmt, selectedPayment } = req.body;

  try {
    const existingPayment = await Payment.findOne({ aadhar });
    if (existingPayment) {
      return res.status(400).json({ message: 'Your application is already under consideration' });
    }

    const newPayment = new Payment({ aadhar, totalAmt, selectedPayment });

    await newPayment.save();
    res.status(201).json({ message: 'Please wait...' });
  } catch (error) {
    console.error('Error occurred:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Route to Check for Existing Payment
router.get('/check-payment', async (req, res) => {
  const { aadhar } = req.query;

  try {
    const payment = await Payment.findOne({ aadhar });
    if (payment) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking payment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
