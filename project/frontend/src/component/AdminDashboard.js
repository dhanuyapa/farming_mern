import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Admin.css'; // Import the external CSS file

function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userDetails, setUserDetails] = useState([]);
  const [filteredUserDetails, setFilteredUserDetails] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // Add state for error message

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

    if (filteredUsers.length === 0) {
      setErrorMessage('No matching users found. Please enter a valid NIC.');
      setFilteredUserDetails([]); // Clear the filtered users if there are no matches
    } else {
      setErrorMessage(''); // Reset error message if there are matching users
      setFilteredUserDetails(filteredUsers);
    }
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
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
      {filteredUserDetails.length > 0 && (
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
      )}
    </div>
  );
}

export default AdminDashboard;