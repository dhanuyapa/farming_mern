import React from 'react';
import Header from './components/Header';
import AddFarmer from './components/AddFarmer';
import Login from './components/Login';
import home from './components/home'; // Import your Home component
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/add" element={<AddFarmer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<home />} /> {/* Add a new route for Home */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;