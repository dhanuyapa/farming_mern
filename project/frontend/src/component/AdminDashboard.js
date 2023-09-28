import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    // Fetch user details from the backend when the component mounts
    axios
      .get("http://localhost:8070/Customer/fetch") // Replace with your backend API endpoint
      .then((response) => {
        // Update the state with fetched data
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user details', error);
      });
  }, []);

  return (
    <div>
      <h1>User Details</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>NIC</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Address</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {userDetails.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.nic}</td>
              <td>{user.fname}</td>
              <td>{user.lname}</td>
              <td>{user.phone}</td>
              <td>{`${user.no}, ${user.street}, ${user.city}`}</td>
              {/* Add more table cells with other user details */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;