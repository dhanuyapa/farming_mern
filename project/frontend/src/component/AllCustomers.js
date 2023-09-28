import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AllCustomer.css";

export default function AllCustomers() {
  const navigate = useNavigate();

  // Function to navigate to the UserProfile component, AdminDashboard, or Login component based on login status
  const handleViewProfile = () => {
    const userNIC = localStorage.getItem("loggedInUserNIC");
    const isAdmin = localStorage.getItem("userRole") === "admin";

    if (isAdmin) {
      navigate("/AdminDashboard");
    } else if (userNIC) {
      navigate(`/getUser/${userNIC}`);
    } else {
      navigate("/loginCus");
    }
  };

  return (
    <div className="homepage">
      <div className="button">
        <button onClick={handleViewProfile}>View Profile</button>
      </div>
    </div>
  );
}