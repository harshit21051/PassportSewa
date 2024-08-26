import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

function Hero() {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/signup');
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to Passport Seva</h1>
        <p>
          To deliver Passport services to citizens in a timely,<br />more accessible, reliable manner and in a comfortable<br />environment through streamlined processes.
        </p>
        <br />
        <br />
        <button className="create-account-btn" onClick={handleCreateAccount}>
          CREATE ACCOUNT
        </button>
        <p>
          Already User? <a href="/login">Log In</a>
        </p>
      </div>
      <div className="helpline">
        <p>HELPLINE<br/>1234567890</p>
      </div>
    </section>
  );
}

export default Hero;
