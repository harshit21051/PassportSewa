import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API calls
import './PayMethod.css';

function PayMethod() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  
  const [selectedPayment, setSelectedPayment] = useState('');
  const currentDate = new Date();
  const minDate = new Date(currentDate);
  minDate.setDate(currentDate.getDate() + 10);
  const formattedMinDate = minDate.toISOString().split('T')[0]; // YYYY-MM-DD format
  const [selectedDate, setSelectedDate] = useState(formattedMinDate);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const [passportType, setPassportType] = useState('');
  const [bookletType, setBookletType] = useState('');

  // Function to fetch and log passportType and bookletType for the current user
  const getPassportBookletType = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/fetch-passpoort-booklet-type', {
        params: { aadhar: user.aadhar },
      });
      if (response.data.success) {
        const { passportType, bookletType } = response.data.aadhar;
        setPassportType(passportType);
        setBookletType(bookletType);
      }
      else console.log('Error:', response.data.message);
    } catch (error) {
      console.error('Error fetching passport and booklet type:', error);
    }
  };

  useEffect(() => {
    if (user) {
      getPassportBookletType();
    }
  }, [user]);

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    setIsDatePickerVisible(false);
  };

  const handleDateButtonClick = () => {
    setIsDatePickerVisible(true);
  };

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  const validatePayment = () => {
    if (!selectedPayment) {
      setMessage("Please select a payment method.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validatePayment()) return;

    let totalAmt = 0;
    if (passportType === 'Normal') {
      totalAmt = bookletType === '36 Pages' ? 1500 : 2000;
    } else {
      totalAmt = bookletType === '36 Pages' ? 3500 : 4000;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          aadhar: user.aadhar,
          totalAmt,
          selectedPayment
        }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (data.message === 'Please wait...') {
        setTimeout(() => {
          navigate('/payment/success', { state: { selectedDate, totalAmt } });
        }, 3000);
      }

    } catch (error) {
      setMessage('An error occurred');
    }
  };

  return (
    <div className="pay-method-container">
      <h2>Appointment and Payment</h2>

      <div className="appointment-section">

        <div className="appointment-details">
          <h3>Appointment</h3>
          <hr />
          <div className="appointment-info">
            <p>Earliest Appointment Available</p>
            <p>{new Date(selectedDate).toLocaleDateString('en-GB')}</p>
            {isDatePickerVisible ? (
                <input
                type="date"
                min={formattedMinDate}
                value={selectedDate}
                onChange={handleDateChange}
                className="date-picker"
                />
            ) : (
                <button className="change-date-button" onClick={handleDateButtonClick}>
                Change Date
              </button>
            )}
          </div>
          <hr />
          <div className="passport-office">
            <label htmlFor="office">Your Passport Office</label>
            <br />
            <br />
            <select id="office">
              <option value="">As per your Address</option>
            </select>
          </div>
        </div>

        <div className="summary-section">
          <h3>Summary</h3>
          <hr />
          <div className="summary-details">
            <div className="summary-item">
              <p>Fresh Passport</p>
              <p>Application Type: {passportType}</p>
              <p>₹ {passportType === 'Normal' ? '1,500' : '3,500'}</p>
            </div>
            <hr />
            <div className="summary-fees">
              <p>Booklet Fee: ₹ {bookletType === '36 Pages' ? '0' : '500'}</p>
              <p>Tatkaal Fee: ₹ {passportType === 'Normal' ? '0' : '2,000'}</p>
            </div>
            <hr />
            <div className="total-amount">
              <p>Total Amount</p>
              <p className="amt">₹ {passportType === 'Normal' ? (bookletType === '36 Pages' ? '1,500' : '2,000') : (bookletType === '36 Pages' ? '3,500' : '4,000')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="payment-method-section">
        <h3>Choose Payment Method</h3>
        <div className="payment-options">
          <div 
            className={`payment-option ${selectedPayment === 'card' ? 'selected' : ''}`} 
            onClick={() => handlePaymentSelect('card')}
          >
            <input type="radio" id="card" name="payment" />
            <label htmlFor="card">Debit/Credit Card</label>
          </div>
          <div 
            className={`payment-option ${selectedPayment === 'netbanking' ? 'selected' : ''}`} 
            onClick={() => handlePaymentSelect('netbanking')}
          >
            <input type="radio" id="netbanking" name="payment" />
            <label htmlFor="netbanking">Netbanking</label>
          </div>
          <div 
            className={`payment-option ${selectedPayment === 'upi' ? 'selected' : ''}`} 
            onClick={() => handlePaymentSelect('upi')}
          >
            <input type="radio" id="upi" name="payment" />
            <label htmlFor="upi">UPI Payment</label>
          </div>
          <div 
            className={`payment-option ${selectedPayment === 'offline' ? 'selected' : ''}`} 
            onClick={() => handlePaymentSelect('offline')}
          >
            <input type="radio" id="offline" name="payment" />
            <label htmlFor="offline">Pay Offline</label>
          </div>
        </div>
      </div>
      <br />

      <div className="pay-now-section">
        <button className="pay-now-button" onClick={handleSubmit}>Pay Now</button>
      </div>
      {message && (
        <div className="message-container">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default PayMethod;
