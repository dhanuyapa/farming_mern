import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userDetails, setUserDetails] = useState([]);
  const [filteredUserDetails, setFilteredUserDetails] = useState([]);

  useEffect(() => {
    // Fetch user details from the backend when the component mounts
    axios
      .get('http://localhost:8070/Customer/fetch')
      .then((response) => {
        setUserDetails(response.data);
        setFilteredUserDetails(response.data); // Initialize filtered data with all users
      })
      .catch((error) => {
        console.error('Error fetching user details', error);
      });
  }, []);

  const handleSearch = () => {
    // Filter users based on the search query
    const filteredUsers = userDetails.filter((user) =>
      user.nic.includes(searchQuery)
    );
    setFilteredUserDetails(filteredUsers);
  };

  return (
    <div>
      <h1>User Details</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by NIC"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
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
          {filteredUserDetails.map((user) => (
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