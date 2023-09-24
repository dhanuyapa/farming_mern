import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


function EditUserProfile() {
  const navigate = useNavigate();
  const { nic } = useParams();
  const [editedUserDetails, setEditedUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8070/customer/getUser/${nic}`)
      .then((response) => {
        setEditedUserDetails(response.data.customer);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user profile', error);
      });
  }, [nic]);


  const validateField = (fieldName, value) => {
    const errors = { ...validationErrors };
  
    switch (fieldName) {
      case 'fname':
      case 'lname':
        if (!/^[A-Za-z]*$/.test(value)) {
          errors[fieldName] = 'Enter only letters';
        } else {
          delete errors[fieldName];
        }
        break;
  
      case 'username':
        if (!/^[A-Za-z0-9]*$/.test(value)) {
          errors[fieldName] = 'Enter only letters and numbers';
        } else {
          delete errors[fieldName];
        }
        break;
  
      case 'phone':
        if (!/^[0-9]*$/.test(value) || value.length !== 10) {
          errors[fieldName] = 'Enter a valid 10-digit phone number';
        } else {
          delete errors[fieldName];
        }
        break;
  
        case 'no':
          if (!/^\d{1,8}(\/\d{1,8})?$/.test(value)) {
            errors[fieldName] = 'Enter numbers only, optionally followed by a single "/" character';
          } else {
            delete errors[fieldName];
          }
          break;
          
        
  
      case 'street':
        if (!/^[A-Za-z0-9\s]*$/.test(value) || value.length > 50) {
          errors[fieldName] = 'Enter only letters, numbers, and spaces, up to 50 characters';
        } else {
          delete errors[fieldName];
        }
        break;
          
  
      case 'city':
        if (!/^[A-Za-z0-9\s]*$/.test(value)) {
          errors[fieldName] = 'Enter only letters, numbers, and spaces';
        } else {
          delete errors[fieldName];
        }
        break;
  
      // Add validation cases for other fields as needed
  
      default:
        break;
    }
  
    setValidationErrors(errors);
  };
  

  const allFieldsValid = () => {
    for (const fieldName in validationErrors) {
      if (validationErrors.hasOwnProperty(fieldName)) {
        if (validationErrors[fieldName]) {
          return false;
        }
      }
    }
    return true;
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserDetails({ ...editedUserDetails, [name]: value });
    validateField(name, value);
  };

  /*const handleSave = () => {
    axios
      .put(`http://localhost:8070/customer/updateCus/${nic}`, editedUserDetails)
      .then((response) => {
        console.log('User details updated successfully');
        navigate(`/getUser/${nic}`); 
      })
      .catch((error) => {
        console.error('Error updating user profile', error);
      });
  };

  */

  const handleSave = () => {
    if (allFieldsValid()) {
      axios
        .put(`http://localhost:8070/customer/updateCus/${nic}`, editedUserDetails)
        .then((response) => {
          console.log('User details updated successfully');
          navigate(`/getUser/${nic}`);
        })
        .catch((error) => {
          console.error('Error updating user profile', error);
        });
    } else {
      console.error('Validation errors exist. Cannot save.');
    }
  };



  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Edit Profile</h2>
      <div className="profile-info">
      <table>
        <tbody>
          <tr>
            <td>First Name</td>
            <td>
              <input
                type="text"
                name="fname"
                value={editedUserDetails.fname}
                onChange={handleInputChange}
              />
              {validationErrors.fname && (
                <div className="error-message">{validationErrors.fname}</div>
              )}
            </td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>
              <input
                type="text"
                name="lname"
                value={editedUserDetails.lname}
                onChange={handleInputChange}
              />
              {validationErrors.lname && (
                <div className="error-message">{validationErrors.lname}</div>
              )}
            </td>
            </tr>
            <tr>
              <td>NIC</td>
              <td>
                <input
                  type="text"
                  name="nic"
                  disabled
                  value={editedUserDetails.nic}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
        
            <tr>
            <td>Username</td>
            <td>
              <input
                type="text"
                name="username"
                value={editedUserDetails.username}
                onChange={handleInputChange}
              />
              {validationErrors.username && (
                <div className="error-message">{validationErrors.username}</div>
              )}
            </td>
            </tr>

            <tr>
            <td>Phone</td>
            <td>
              <input
                type="text"
                name="phone"
                value={editedUserDetails.phone}
                onChange={handleInputChange}
              />
              {validationErrors.phone && (
                <div className="error-message">{validationErrors.phone}</div>
              )}
            </td>
            </tr>
           <tr>
            <td>No</td>
            <td>
              <input
                type="text"
                name="no"
                value={editedUserDetails.no}
                onChange={handleInputChange}
              />
              {validationErrors.no && (
                <div className="error-message">{validationErrors.no}</div>
              )}
            </td>
          </tr>
          <tr>
            <td>Street</td>
            <td>
              <input
                type="text"
                name="street"
                value={editedUserDetails.street}
                onChange={handleInputChange}
              />
              {validationErrors.street && (
                <div className="error-message">{validationErrors.street}</div>
              )}
            </td>
          </tr>
          <tr>
            <td>City/Locality</td>
            <td>
              <input
                type="text"
                name="city"
                value={editedUserDetails.city}
                onChange={handleInputChange}
              />
              {validationErrors.city && (
                <div className="error-message">{validationErrors.city}</div>
              )}
            </td>
          </tr>
          {/* Add more rows for other fields */}
        </tbody>
      </table>
        
      <button
        type="button"
        onClick={handleSave}
        className="centered-button"
        disabled={!allFieldsValid()} // Disable the button if not all fields are valid
      >
        Save Changes
      </button>

      </div>
    </div>
  );
}

export default EditUserProfile;