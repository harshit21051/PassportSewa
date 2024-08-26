import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <p>&copy; 2024 Passport Seva<br />All rights reserved</p>
        <div className="footer-links">
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Help</a>
          <a href="#">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
