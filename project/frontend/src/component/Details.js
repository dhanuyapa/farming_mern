import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Details() {
  const { nic } = useParams();
  const [customerDetails, setCustomerDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8070/Customer/searchByNIC/${nic}`)
      .then((response) => {
        setCustomerDetails(response.data.customer);
      })
      .catch((error) => {
        console.error('Error fetching customer details', error);
      });
  }, [nic]);

  return (
    <div>
      {customerDetails ? (
        <div>
          <h1>Customer Details</h1>
          <p>NIC: {customerDetails.nic}</p>
          <p>Name: {customerDetails.fname} {customerDetails.lname}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Details;