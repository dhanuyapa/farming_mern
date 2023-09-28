import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './component/Header';
import AddCustomer from './component/AddCustomer';
import AllCustomers from './component/AllCustomers';
import Login from './component/Login';
import UserProfile from './component/UserProfile';
import DeleteAccount from './component/DeleteAccount';
import EditUserProfile from './component/EditUserProfile';
import AdminDashboard from './component/AdminDashboard'; // Corrected import

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<AllCustomers />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} /> {/* Admin Dashboard route */}
          <Route path="/addCustomer" element={<AddCustomer />} />
          <Route path="/loginCus" element={<Login />} />
          <Route path="/getUser/:nic" element={<UserProfile />} />
          <Route path="/deleteCus/:nic" element={<DeleteAccount />} />
          <Route path="/updateCus/:nic" element={<EditUserProfile />} />
         
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;