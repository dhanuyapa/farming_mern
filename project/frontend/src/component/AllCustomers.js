import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AllCustomers() {
  const navigate = useNavigate();

  // Function to navigate to the UserProfile component or Login component based on login status
  const handleViewProfile = () => {
    const userNIC = localStorage.getItem("loggedInUserNIC");
    if (userNIC) {
      navigate(`/getUser/${userNIC}`);
    } else {
      navigate("/loginCus");
    }
  };

  return (
    <div>
      <h1>All Customers</h1>
      <button onClick={handleViewProfile}>View Profile</button>
      <Link to="/AddCustomer">Add Customer</Link>
    </div>
  );
}