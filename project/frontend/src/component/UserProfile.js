import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AllCustomers from './AllCustomers';

function UserProfile() {
  const loggedInUserNIC = localStorage.getItem('loggedInUserNIC');
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUserNIC) {
      navigate('/loginCus');
    } else {
      axios
        .get(`http://localhost:8070/customer/getUser/${loggedInUserNIC}`)
        .then((response) => {
          setUserDetails(response.data.customer);
        })
        .catch((error) => {
          console.error('Error fetching user profile', error);
        });
    }
  }, [loggedInUserNIC, navigate]);

  if (!loggedInUserNIC) {
    return (
      <div className="profile-container">
        <h2>My Profile</h2>
        <AllCustomers />
        <p>Please <Link to="/loginCus">log in</Link> to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <div className="button-container">
        <Link to={`/updateCus/${userDetails.nic}`}>
          <button>Edit</button>
        </Link>
        <Link to={`/deleteCus/${userDetails.nic}`}>
          <button className="settings-button">Settings</button>
        </Link>
      </div>

      <div className="profile-details">
        <div className="profile-info">
          <table>
            <tbody>
              <tr>
                <td className="title">First Name</td>
                <td>{userDetails.fname}</td>
              </tr>
              <tr>
                <td className="title">Last Name</td>
                <td>{userDetails.lname}</td>
              </tr>
              <tr>
                <td className="title">NIC</td>
                <td>{userDetails.nic}</td>
              </tr>
              <tr>
                <td className="title">Username</td>
                <td>{userDetails.username}</td>
              </tr>
              <tr>
                <td className="title">Phone</td>
                <td>{userDetails.phone}</td>
              </tr>
              <tr>
                <td className="title">Address</td>
                <td>
                  {userDetails.no}, {userDetails.street}, {userDetails.city}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;