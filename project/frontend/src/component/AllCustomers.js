import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AllCustomer.css';

import homeBG from './images/homeBG.jpg'; // Import the homeBG image

export default function AllCustomers() {
  const navigate = useNavigate();

  // Function to navigate to the UserProfile component, AdminDashboard, or Login component based on login status
  

  return (
    <div className="homepage">
      <h1>JOIN WITH US TO GET PROSPEROUS PADDY<br />
                 FARMING EXPERIENCE</h1>
      {/* Add the homeBG image to the upper part */}
      <img src={homeBG} alt="Home Background" className="home-background" />

      {/* Replace the "View Profile" button with the account image */}
      
    </div>
  );
}