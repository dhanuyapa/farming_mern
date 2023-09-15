import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AllCustomers() {
    const [loggedInUserID, setLoggedInUserID] = useState(""); // Assuming you have the logged-in user's ID
    const navigate = useNavigate();
  
    useEffect(() => {
      // Assuming you have a way to get the logged-in user's ID
      // const userID = "12345"; // Replace with your actual logic to get the user's ID
      const userID = localStorage.getItem("loggedInUserID"); // Assuming you store it in localStorage
      if (userID) {
        setLoggedInUserID(userID);
      }
    }, []);
    const handleViewProfile = () => {
        if (loggedInUserID) {
          console.log('Fetching user details for userID:', loggedInUserID);
          // Fetch user details based on the logged-in user's ID
          axios
            .get(`http://localhost:8070/get/${loggedInUserID}`)
            .then((response) => {
              console.log('User details response:', response.data);
              const userDetails = response.data.farmer; // Assuming the response contains user details
              // Navigate to the user's profile page and pass the userDetails
              navigate(`/userProfile/${loggedInUserID}`, { state: { userDetails } });
            })
            .catch((error) => {
              console.error("Error fetching user details:", error);
            });
        } else {
          // If no user is logged in, navigate to the login page
          navigate("/login");
        }
      };
  
    return (
      <div>
        <h1>All Customers</h1>
        <button onClick={handleViewProfile}>View My Profile</button>
      </div>
    );
  }