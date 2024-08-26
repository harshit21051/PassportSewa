import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Documents.css';

function Documents() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState({
    addressProof: null,
    appealDocument: null,
    dobProof: null,
    nonEcrProof: null,
    standardDocument: null,
  });

  const handleFileChange = (event, docType) => {
    setFiles({
      ...files,
      [docType]: event.target.files[0],
    });
  };

  const triggerFileInput = (id) => {
    document.getElementById(id).click();
  };

  const handleBack = () => {
    navigate('/upload');
  };

  const handleSubmit = () => {
    // Validate that all files are uploaded
    if (!files.addressProof) {
      setMessage('Please upload your Address Proof.');
      return;
    }
    if (!files.appealDocument) {
      setMessage('Please upload your Appeal Document.');
      return;
    }
    if (!files.dobProof) {
      setMessage('Please upload your Date of Birth Proof.');
      return;
    }
    if (!files.nonEcrProof) {
      setMessage('Please upload your Non-ECR Proof.');
      return;
    }
    if (!files.standardDocument) {
      setMessage('Please upload one of the 16 standard documents.');
      return;
    }

    // If all files are present, proceed with submission
    navigate('/payment');
  };

  return (
    <div className="upload-container">
      <h2>Upload documents</h2>

      <div className="upload-card">
        <div className="upload-details">
          <div className="upload-info">
            <h3>Address Proof</h3>
            <div className="docs-meta">
              <input
                type="file"
                onChange={(e) => handleFileChange(e, 'addressProof')}
                style={{ display: 'none' }}
                id="addressProof"
              />
              <button onClick={() => triggerFileInput('addressProof')}>
                Upload
              </button>
              {files.addressProof && <span>&nbsp;&nbsp;&nbsp;{files.addressProof.name}</span>}
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="upload-card">
        <div className="upload-details">
          <div className="upload-info">
            <h3>Appeal Document</h3>
            <div className="docs-meta">
              <input
                type="file"
                onChange={(e) => handleFileChange(e, 'appealDocument')}
                style={{ display: 'none' }}
                id="appealDocument"
              />
              <button onClick={() => triggerFileInput('appealDocument')}>
                Upload
              </button>
              {files.appealDocument && <span>&nbsp;&nbsp;&nbsp;{files.appealDocument.name}</span>}
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="upload-card">
        <div className="upload-details">
          <div className="upload-info">
            <h3>DOB Proof</h3>
            <div className="docs-meta">
              <input
                type="file"
                onChange={(e) => handleFileChange(e, 'dobProof')}
                style={{ display: 'none' }}
                id="dobProof"
              />
              <button onClick={() => triggerFileInput('dobProof')}>
                Upload
              </button>
              {files.dobProof && <span>&nbsp;&nbsp;&nbsp;{files.dobProof.name}</span>}
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="upload-card">
        <div className="upload-details">
          <div className="upload-info">
            <h3>Non-ECR Proof</h3>
            <div className="docs-meta">
              <input
                type="file"
                onChange={(e) => handleFileChange(e, 'nonEcrProof')}
                style={{ display: 'none' }}
                id="nonEcrProof"
              />
              <button onClick={() => triggerFileInput('nonEcrProof')}>
                Upload
              </button>
              {files.nonEcrProof && <span>&nbsp;&nbsp;&nbsp;{files.nonEcrProof.name}</span>}
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="upload-card">
        <div className="upload-details">
          <div className="upload-info">
            <h3>One of 16 standard documents</h3>
            <div className="docs-meta">
              <input
                type="file"
                onChange={(e) => handleFileChange(e, 'standardDocument')}
                style={{ display: 'none' }}
                id="standardDocument"
              />
              <button onClick={() => triggerFileInput('standardDocument')}>
                Upload
              </button>
              {files.standardDocument && <span>&nbsp;&nbsp;&nbsp;{files.standardDocument.name}</span>}
            </div>
          </div>
        </div>
      </div>
      <br />

      <div className="docs next-step">
        <button onClick={handleBack}>BACK</button>
        <button onClick={handleSubmit}>SUBMIT</button>
      </div>

      
      {message && (
        <div className="message-container">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default Documents;
