import './App.css';
import Header from './components/Header';
import AddFarmer from './components/AddFarmer';
import Login from './components/Login'; // Corrected import path
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/add" element={<AddFarmer />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;