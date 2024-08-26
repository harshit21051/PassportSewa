import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplyOnline.css';

function ApplyOnline() {
  const navigate = useNavigate();

  const goToApplicationForm = () => {
    navigate('/application');
  };

  return (
    <div className="application-container">
      <h2>Your Application</h2>
      <div className="application-card">
        <div className="application-details">
          {/* <div className="application-icon">
            <img src="path_to_icon_image" alt="Application Icon" />
          </div> */}
          <div className="application-info">
            <h3>Fresh Passport</h3>
            <p>Submission Date: 12/12/12</p>
            <div className="application-meta">
              <p>APPLICATION NAME: XYZ</p>
              <p>FILE NUMBER: 1234567890</p>
            </div>
          </div>
          <div className="application-status">
            <h4>Status</h4>
            <ul>
              <li><span className="status-dot"></span>Application Form</li>
              <li><span className="status-dot"></span>Document Upload</li>
              <li><span className="status-dot"></span>Pay and Schedule Appointment</li>
            </ul>
            <div className="next-step">
              <p>Next Step:</p>
              <button onClick={goToApplicationForm}>Application Form</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyOnline;
