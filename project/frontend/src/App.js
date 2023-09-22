import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AddCustomer from './component/AddCustomer';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AddCustomer />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;