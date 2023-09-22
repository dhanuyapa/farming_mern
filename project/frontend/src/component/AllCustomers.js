import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AllCustomers(props) {
  const [loggedInUserNIC, setLoggedInUserNIC] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userNIC = localStorage.getItem("loggedInUserNIC");
    console.log('AllCustomers - User NIC:', userNIC);
    if (userNIC) {
      setLoggedInUserNIC(userNIC);
    }
  }, []);

  console.log('AllCustomers - userProfileImage prop:', props.userProfileImage);

  // Function to navigate to the UserProfile component
  const handleViewProfile = () => {
    if (loggedInUserNIC) {
      navigate(`/getUser/${loggedInUserNIC}`);
    } else {
      navigate("/loginCus");
    }
  };

  // Function to navigate to the Login component
  const handleLogin = () => {
    navigate("/loginCus");
  };

  return (
    <div>
      <h1>All Customers</h1>
      <button onClick={handleViewProfile}>View Profile</button>
      <Link to="/AddCustomer">Add Customer</Link>

      {/* Button to navigate to the Login component */}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}