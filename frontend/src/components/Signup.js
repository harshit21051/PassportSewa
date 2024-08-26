import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const navigate = useNavigate(); // For navigation
  const [passportType, setPassportType] = useState('');
  const [name, setName] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleClear = () => {
    setPassportType('');
    setName('');
    setAadhar('');
    setDob('');
    setMobile('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const validateForm = () => {
    const mobilePattern = /^[0-9]{10}$/;
    const aadharPattern = /^[0-9]{12}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const namePattern = /^[A-Za-z\s]+$/;
    
    if (!mobilePattern.test(mobile)) {
      setMessage('Mobile number must be 10 digits long and contain only numbers.');
      return false;
    }
    
    if (!aadharPattern.test(aadhar)) {
      setMessage('Aadhar number must be 12 digits long and contain only numbers.');
      return false;
    }
    
    if (!emailPattern.test(email)) {
      setMessage('Email must contain at least one "@" and one dot.');
      return false;
    }
    
    if (password.length < 8) {
      setMessage('Password must be at least 8 characters long.');
      return false;
    }
    
    if (!namePattern.test(name)) {
      setMessage('Name must contain only alphabetical letters and spaces.');
      return false;
    }
    
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          aadhar,
          dob,
          mobile,
          email,
          password,
          passportType,
        }),
      });

      const data = await response.json();
      setMessage(data.message);

      // Navigate to the login route only if the account was successfully created
      if (data.message === 'Account created successfully! Please wait...') {
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
      
    } catch (error) {
      setMessage('An error occurred');
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <fieldset className="passport-type">
            <legend>Type of Passport</legend>
            <div className="radio-group">
              <input
                type="radio"
                name="passport-type"
                value="ordinary"
                checked={passportType === 'ordinary'}
                onChange={(e) => setPassportType(e.target.value)}
              />
              <label>
                Ordinary Passport
              </label>
              <span className="tooltip">
                Also called a Type-P Passport, wherein P means Personal.
                Issued to ordinary citizens, this is the most common type of passport issued in India.
              </span>
            </div>
            <div className="radio-group">
              <input
                type="radio"
                name="passport-type"
                value="diplomatic"
                checked={passportType === 'diplomatic'}
                onChange={(e) => setPassportType(e.target.value)}
              />
              <label>
                Diplomatic Passport
              </label>
              <span className="tooltip">
                Also called a Type-D Passport, where D means Diplomat.
                Issued to Indian diplomats, high-ranking government officials, etc.
                The maroon passport holders don’t require a visa before travelling.
              </span>
            </div>
            <div className="radio-group">
              <input
                type="radio"
                name="passport-type"
                value="official"
                checked={passportType === 'official'}
                onChange={(e) => setPassportType(e.target.value)}
              />
              <label>
                Official Passport
              </label>
              <span className="tooltip">
                The most powerful Indian Passport.
                Also called a Type-S Passport, where S means Service.
                Issued to members of Armed Forces stationed abroad and representatives of the Indian Government.
              </span>
            </div>
          </fieldset>
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="aadhar">Aadhar No.</label>
          <input
            type="text"
            id="aadhar"
            value={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="text"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email ID</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="button" onClick={handleClear} className="clear-btn">
            Clear
          </button>
          <span>&nbsp;&nbsp;</span>
          <button type="submit" className="signup-btn">
            Create Account
          </button>
        </div>
      </form>
      {message && (
        <div className="message-container">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default Signup;
