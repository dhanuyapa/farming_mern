import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DeleteAccount() {
  const loggedInUserNIC = localStorage.getItem('loggedInUserNIC');
  const navigate = useNavigate();

  const handleRemoveAccount = () => {
    axios
      .delete(`http://localhost:8070/customer/deleteCus/${loggedInUserNIC}`)
      .then((response) => {
        if (response.status === 200) {
          // Account deleted successfully
          alert('Account removed successfully');
          localStorage.removeItem('loggedInUserNIC');
          navigate('/addCustomer'); // Redirect to the registration page
        } else {
          // Handle other status codes or error messages from the server
          alert('Error removing account');
        }
      })
      .catch((error) => {
        // Handle Axios or network error
        console.error('Error removing account', error);
        alert('Error removing account');
      });
  };

  const handleCancel = () => {
    navigate(`/getUser/${loggedInUserNIC}`); // Navigate back to the profile page
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUserNIC'); // Clear user authentication state (log out)
    navigate('/loginCus'); // Navigate to the login page
  };

  return (
    <div className="delete-account-container">
      <h2>Delete Account</h2>
      <p>Are you sure you want to remove your account?</p>
      <button onClick={handleRemoveAccount}>Remove Account</button>
      <button onClick={handleCancel} className="cancel-button">
        Cancel
      </button>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
}

export default DeleteAccount;