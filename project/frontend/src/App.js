import React from 'react';
import Header from './components/Header';
import AddFarmer from './components/AddFarmer';
import Login from './components/Login';
import AllFarmers from './components/AllFarmers';
import userProfile from './components/userProfile';// Change the uppercase 'UserProfile' to lowercase 'userProfile'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/add" element={<AddFarmer />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/get/:id" element={<AllFarmers />} />
                    <Route path="/userProfile" element={<userProfile />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;