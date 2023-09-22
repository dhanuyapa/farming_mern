import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddCustomer from "./component/AddCustomer";
import AllCustomers from "./component/AllCustomers";
import Login from "./component/Login";
import UserProfile from "./component/UserProfile"; // Import the UserProfile component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AllCustomers />} />
          <Route path="/addCustomer" element={<AddCustomer />} />
          <Route path="/loginCus" element={<Login />} />
          {/* Add a route for the UserProfile component */}
          <Route path="/getUser/:nic" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;