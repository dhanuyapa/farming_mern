// UserProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function UserProfile() {
    const loggedInUserID = localStorage.getItem('loggedInUserID');
    const [userDetails, setUserDetails] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedInUserID) {
            // If not logged in, navigate to the login page
            navigate('/add');
        } else {
            // Fetch user profile details from the server using the logged-in user's ID
            axios
                .get(`http://localhost:8070/farmer/get/${loggedInUserID}`)
                .then((response) => {
                    setUserDetails(response.data.farmer);
                })
                .catch((error) => {
                    console.error('Error fetching user profile', error);
                });
        }
    }, [loggedInUserID, navigate]);

    if (!loggedInUserID) {
        return (
            <div className="profile-container">
                <h2>My Profile</h2>
                <p>Please <Link to="/add">log in</Link> to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <h2>My Profile</h2>
            {/* Render user profile details here */}
        </div>
    );
}

export default UserProfile;