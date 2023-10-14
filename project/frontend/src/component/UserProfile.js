import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './css/UserProfile.css';

function UserProfile() {
  const loggedInUserNIC = localStorage.getItem('loggedInUserNIC');
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSaveButton, setShowSaveButton] = useState(false);

  useEffect(() => {
    if (!loggedInUserNIC) {
      navigate('/loginCus');
    } else {
      fetchUserProfile();
    }
  }, [loggedInUserNIC, navigate]);

  const fetchUserProfile = () => {
    axios
      .get(`http://localhost:8070/customer/getUser/${loggedInUserNIC}`)
      .then((response) => {
        setUserDetails(response.data.customer);
      })
      .catch((error) => {
        console.error('Error fetching user profile', error);
      });
  };

  const openImageSelector = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setShowSaveButton(true);
    }
  };

  const updateProfileImage = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('profileImage', fileInputRef.current.files[0]);

      try {
        // Use the user's NIC as the identifier for the image upload
        await axios.post(`http://localhost:8070/customer/register/uploadProfileImage/${userDetails.nic}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Clear the selected file and hide the Save button
        setSelectedImage(null);
        setShowSaveButton(false);

        // Fetch the user's updated profile data
        fetchUserProfile();
      } catch (error) {
        console.error('Error uploading image', error);
      }
    }
  };

  const removeProfileImage = async () => {
    try {
      await axios.delete(`http://localhost:8070/customer/removeProfilePhoto/${loggedInUserNIC}`);
      setSelectedImage(null);
      setShowSaveButton(false);

      // Fetch the user's updated profile data
      fetchUserProfile();
    } catch (error) {
      console.error('Error removing photo', error);
    }
  };

  if (!loggedInUserNIC) {
    return (
      <div className="profile-container">
        <h2>My Profile</h2>
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
        <div className="profile-image">
          <label className="image-upload-label">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Profile"
                className="profile-picture"
                onClick={openImageSelector}
                style={{ width: '150px', height: '150px' }}
              />
            ) : userDetails.profileImage ? (
              <img
                src={`http://localhost:8070/${userDetails.profileImage}`}
                alt="Profile"
                className="profile-picture"
                onClick={openImageSelector}
                style={{ width: '150px', height: '150px' }}
              />
            ) : (
              <img
                src="./images/11.jpeg"
                alt="Profile"
                className="profile-picture"
                onClick={openImageSelector}
                style={{ width: '150px', height: '150px' }}
              />
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="image-upload"
            />
            {selectedImage && (
              <button onClick={removeProfileImage} className="cancel-button">Remove photo</button>
            )}
          </label>
          {showSaveButton && (
            <button onClick={updateProfileImage}>Save Profile Image</button>
          )}
        </div>
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