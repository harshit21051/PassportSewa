// src/components/Details.js
import React from 'react';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Details.css'; // Create a separate CSS file if needed

function Details() {
  const { user } = useAuth(); // Use user from context
  const navigate = useNavigate(); // For navigation

  const handleBack = () => {
    navigate('/welcome'); // Navigate back to the welcome page
  };

  // Function to format date as YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (!user) {
    // Handle the case when user is not set
    return (
      <div className="details-container">
        <h1>Loading...</h1>
        <p>Please wait while we fetch your details.</p>
      </div>
    );
  }

  return (
    <div className="details-container">
      <h1>My Details</h1>
      <table>
        <tbody>
          <tr><th>Name</th><td>{user.name}</td></tr>
          <tr><th>Aadhar</th><td>{user.aadhar}</td></tr>
          <tr><th>Date of Birth</th><td>{formatDate(user.dob)}</td></tr>
          <tr><th>Mobile</th><td>{user.mobile}</td></tr>
          <tr><th>Email</th><td>{user.email}</td></tr>
          <tr><th>Passport Type</th><td>{user.passportType.toUpperCase()}</td></tr>
        </tbody>
      </table>
      <button className="back-button" onClick={handleBack}>Back</button>
    </div>
  );
}

export default Details;
