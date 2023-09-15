import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in (e.g., with a stored token)
    const token = localStorage.getItem('token');
   
    
  }, [navigate]);

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with phone and password to send to the backend
    const credentials = { phone, password };

    try {
      // Send a POST request to your backend login endpoint with the credentials
      const response = await axios.post('http://localhost:8070/farmer/login', { phone, password });

      // Log the response data to the console
      console.log('Response data:', response.data);

      if (response.status === 200) {
        // Successful login
        const data = response.data;
        const token = data.token;

        // Store the token in localStorage
        localStorage.setItem('token', token);

        // Navigate to the nested route components/home.js
        navigate('/get/:id');

        // Clear form fields and reset state
        setPhone('');
        setPassword('');
        setLoginSuccess(true);
      } else {
        // Handle login errors
        setErrorMessage('Invalid phone number or password');
      }
    } catch (error) {
      console.error('Error with login:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-container center-vertically">
      <h1>Login</h1>
      <br />
      {loginSuccess ? (
        <p className="success-message">Login successful!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={handlePhoneChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <button type="submit">Login</button>
          </div>
        </form>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Login;