import React from 'react';
import './Steps.css';

function Steps() { 
  return (
    <section className="steps">
      <h2>Get your Passport in 5 easy steps</h2>
      <div className="step">
        {/* <img src="step1.png" alt="Step 1" /> */}
        <h3>REGISTER</h3>
        <p>Register online on the Passport Seva Portal to access all the services </p>
      </div>
      <div className="step">
        {/* <img src="step2.png" alt="Step 2" /> */}
        <h3>APPLICATION FORM</h3>
        <p>Fill up and submit the online application form (offline form also available)</p>
      </div>
      <div className="step">
        {/* <img src="step3.png" alt="Step 3" /> */}
        <h3>APPOINTMENT</h3>
        <p>Schedule an appointment online at a Passport Seva Kendra near you</p>
      </div>
      <div className="step">
        {/* <img src="step4.png" alt="Step 4" /> */}
        <h3>VISIT</h3>
        <p>Visit Passport Seva Kendra for document verification and biometric</p>
      </div>
      <div className="step">
        {/* <img src="step5.png" alt="Step 5" /> */}
        <h3>GET PASSPORT</h3>
        <p>Get your passport by postal service after police verification</p>
      </div>
    </section>
  );
}

export default Steps;
