import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import './Header.css';

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate(); // For navigation

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  return (
    <header>
      <div className="header-container">
        <div className="logo">
          {/* <img src="logo.png" alt="" /> */}
          <b>Passport Seva</b>
        </div>
        <nav>
          <ul>
            {isAuthenticated ? (
              <>
                <li><Link to="/welcome">Profile</Link></li>
              </>
            ) : (
              <li><Link to="/">Home</Link></li>
            )}
            {isAuthenticated ? (
              <>
                <li><Link to="/apply">Apply</Link></li>
              </>
            ) : (
              <li><Link to="/login">Apply</Link></li>
            )}
            <li><Link to="#">How it works</Link></li>
            <li><Link to="#">Contact</Link></li>
            {isAuthenticated ? (
              <>
                <li><Link to="/login" className="top-right-btn" onClick={handleLogout}>LOG OUT</Link></li>
              </>
            ) : (
              <li><Link to="/login" className="top-right-btn">LOG IN</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
