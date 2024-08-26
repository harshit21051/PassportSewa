import React from 'react';
import { useLocation } from 'react-router-dom';
import './Successful.css';

function Successful() {
  const location = useLocation();
  const { selectedDate, totalAmt } = location.state || {};

  return (
    <div className="successful-container">
      <div className="success-icon">
        <i className="fas fa-check-circle green-tick"></i>
      </div>
      <h2>PAYMENT SUCCESSFUL!</h2>
      <p>You have successfully booked your appointment.</p>
      <br />
      <p>
        <b>You are now requested to visit your nearby Passport Seva Kendra (PSK) with original documents.</b>
      </p>
      <br />
      <p>Location: <b>Delhi</b></p>
      <p>Date of Appointment: <b>{new Date(selectedDate).toLocaleDateString('en-GB')}</b></p>
      <p>Total Amount Paid: <b>₹ {totalAmt.toLocaleString('en-IN')}</b></p>

      <div className="download-buttons">
        <button className="download-button">
          DOWNLOAD RECEIPT <i className="fas fa-download"></i>
        </button>
        <button className="download-button">
          DOWNLOAD APPLICATION <i className="fas fa-download"></i>
        </button>
      </div>
    </div>
  );
}

export default Successful;
