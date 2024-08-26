import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios for making API calls
import './Welcome.css';

function Welcome() {
  const { user, logout } = useAuth(); // Use user from context
  const navigate = useNavigate(); // For navigation
  const [message, setMessage] = useState('');

  const [hasApplication, setHasApplication] = useState(false); // State to track if application exists
  const [hasPaid, setHasPaid] = useState(false); // State to track if payment done

  // Function to check if the user has done payment
  const checkForExistingPayment = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/check-payment', { params: { aadhar: user.aadhar } });
      if (response.data.exists) {
        setHasPaid(true);
      }
    } catch (error) {
      console.error('Error checking for existing payment:', error);
    }
  };

  useEffect(() => {
    if (user) {
      checkForExistingPayment(); // Check for existing application when component mounts
    }
  }, [user]);

  // Function to check if the user has an existing application
  const checkForExistingApplication = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/check-application', { params: { aadhar: user.aadhar } });
      if (response.data.exists) {
        setHasApplication(true);
      }
    } catch (error) {
      console.error('Error checking for existing application:', error);
    }
  };

  useEffect(() => {
    if (user) {
      checkForExistingApplication(); // Check for existing application when component mounts
    }
  }, [user]);

  const handleDetails = () => {
    navigate('/details');
  };

  const handleApply = () => {
    if (hasPaid) {
      setMessage(
        <>
            Your application is already under consideration.
            <br />
            Please contact us for any help.
        </>
      );
    } else if (hasApplication) {
      navigate('/upload'); // Navigate to /upload if application exists
    } else {
      navigate('/apply'); // Otherwise, navigate to /apply
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    // Handle the case when user is not set
    return (
      <div className="top-container">
        <h1>Loading...</h1>
        <p>Please wait while we fetch your details.</p>
      </div>
    );
  }

  return (
    <div className="top-container">
      <div className="sub-container">
        <h1>Welcome, {user.name}!</h1>
        <p>
          Track your applications and apply for various services provided by the Passport Seva Kendra.
        </p>
      </div>
      <div className="sub-container apply-container">
        <h1>Apply for a new passport</h1>
        <br />
        <br />
        <button className="apply online" onClick={handleApply}>APPLY ONLINE</button>
        <button className="apply">APPLY OFFLINE</button>
      </div>
      {message && (
        <div className="message-container">
          <p>{message}</p>
        </div>
      )}
      <div className="sub-container other-container">
        <h1>Other services</h1>
        <div className="services-container">
          <div className="services">
            Re-issue of Passport
            <br />
            <br />
            <button>Apply</button>
          </div>
          <div className="services">
            Police Clearance Certificate
            <br />
            <br />
            <button>Apply</button>
          </div>
          <div className="services">
            Identity Certificate
            <br />
            <br />
            <button>Apply</button>
          </div>
          <div className="services">
            Surrender Certificate
            <br />
            <br />
            <button>Apply</button>
          </div>
        </div>
      </div>
      <div className="sub-container">
        <button className="details" onClick={handleDetails}>MY DETAILS</button>
        <button className="logout" onClick={handleLogout}>LOGOUT</button>
      </div>
    </div>
  );
}

export default Welcome;
