import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // For navigation
  const { login } = useAuth(); // Use login function

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
  
      if (response.data.success) {
        const user = response.data.user; // Extract the full user object from the response
        login(user); // Set authentication status with the full user object
        navigate('/welcome', { state: { user } }); // Pass the user object to the welcome page
      } else {
        setMessage(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error occurred:', error); // Debugging line
      setMessage('Error occurred');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">EMAIL ID</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <div className="form-group options">
          {/* <label>
            <input type="checkbox" />Remember me
          </label> */}
          <a href="#" className="forgot-password">Forgot password?</a>
        </div>
        <button type="submit">LOG IN</button>
        <p>Not registered yet? <a href="/signup">Register now</a></p>
      </form>
      {message && (
        <div className="message-container">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
