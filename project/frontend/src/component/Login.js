
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './css/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('loginData'));
    if (savedData) {
      setUsername(savedData.username || '');
      setPassword(savedData.password || '');
    }
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8070/customer/loginCus', { username, password })
      .then((response) => {
        if (response.status === 200) {
          alert('Login successful');
          localStorage.setItem('loggedInUserNIC', response.data.nic);
          setUsername('');
          setPassword('');
          setLoginSuccess(true);

          // Check if the user is an admin
          if (username === '11111111' && password === '12345678@') {
            localStorage.setItem('userRole', 'admin'); // Store "admin" role for admin users
            navigate('/AdminDashboard'); // Redirect to admin dashboard
          } else {
            localStorage.setItem('userRole', 'user'); // Store "user" role for regular users
            navigate('/AllCustomer'); // Redirect to regular user dashboard
          }
        } else {
          alert('Invalid username or password');
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert('Invalid username or password');
        } else {
          console.error('An error occurred', error);
          alert('An error occurred. Please try again later.');
        }
      });
  };

  const handleAllCustomersClick = () => {
    navigate('/');
  };

  return (
    <div className="background-container">
      <div
        className={`login-container center-vertically login-pag ${
          location.pathname === './images/background.jpg' ? 'login-bg' : ''
        }`}
      >
        <h1>Login</h1>
        <br />
        {loginSuccess ? (
          <p className="success-message">Login successful!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                required
                autoComplete="off"
                style={{ textAlign: 'center' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required
                autoComplete="off"
                style={{ textAlign: 'center' }}
              />
            </div>
            <div className="form-group">
              <button type="submit">Login</button>
            </div>
            <p className="signup-message">Haven't an account? </p>
            <center>
              <Link to="/AddCustomer" className="signup-link">
                Sign up
              </Link>
            </center>
          </form>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Login;