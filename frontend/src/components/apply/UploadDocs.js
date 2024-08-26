import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadDocs.css';

function UploadDocs() {
  const navigate = useNavigate();

  const goToUploadDocs = () => {
    navigate('/upload/docs');
  };

  return (
    <div className="upload-container">
      <h2>Your application</h2>
      <div className="upload-card">
        <div className="upload-details">
          {/* <div className="upload-icon">
            <img src="path_to_icon_image" alt="upload Icon" />
          </div> */}
          <div className="upload-info">
            <h3>Fresh Passport</h3>
            <p>Submission Date: 12/12/12</p>
            <div className="upload-meta">
              <p>APPLICATION NAME: XYZ</p>
              <p>FILE NUMBER: 1234567890</p>
            </div>
          </div>
          <div className="upload-status">
            <h4>Status</h4>
            <ul>
              <li><span className="status-dot green-dot"></span>Application Form</li>
              <li><span className="status-dot"></span>Document Upload</li>
              <li><span className="status-dot"></span>Pay and Schedule Appointment</li>
            </ul>
            <div className="next-step">
              <p>Next Step:</p>
              <button onClick={goToUploadDocs}>Upload Documents</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadDocs;
