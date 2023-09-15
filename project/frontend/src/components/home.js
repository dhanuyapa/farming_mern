import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [loggedInUserPhone, setLoggedInUserPhone] = useState('');
  const [loggedInUserPassword, setLoggedInUserPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in based on the presence of phone and password in localStorage
    const storedPhone = localStorage.getItem('loggedInUserPhone');
    const storedPassword = localStorage.getItem('loggedInUserPassword');

    if (storedPhone && storedPassword) {
      setLoggedInUserPhone(storedPhone);
      setLoggedInUserPassword(storedPassword);
    }
  }, []);

  const handleViewProfile = () => {
    if (loggedInUserPhone && loggedInUserPassword) {
      // You can use the loggedInUserPhone and loggedInUserPassword to perform authentication
      // If authenticated, navigate to the profile page with phone and password as parameters
      navigate(`/getUser/${loggedInUserPhone}/${loggedInUserPassword}`);
    } else {
      // If no user is logged in, navigate to the login page
      navigate('/login');
    }
  };

  return (
    <div>
      <h1>All Customers</h1>
      <button onClick={handleViewProfile}>View My Profile</button>
      {/* Add more content here */}
    </div>
  );
}