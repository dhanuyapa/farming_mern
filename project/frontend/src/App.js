import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './component/Header';
import AddCustomer from "./component/AddCustomer";
import AllCustomers from "./component/AllCustomers";
import Login from "./component/Login";
import UserProfile from "./component/UserProfile";
import DeleteAccount from "./component/DeleteAccount";
import EditUserProfile from "./component/EditUserProfile"; // Updated import

function App() {
  return (
    <Router>
      <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<AllCustomers />} />
          <Route path="/addCustomer" element={<AddCustomer />} />
          <Route path="/loginCus" element={<Login />} />
          <Route path="/getUser/:nic" element={<UserProfile />} />
          <Route path="/deleteCus/:nic" element={<DeleteAccount />} />
          {/* Updated route for the EditUserProfile component */}
          <Route path="/updateCus/:nic" element={<EditUserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;