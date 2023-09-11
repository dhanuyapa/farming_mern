import './App.css';
import Header from './components/Header';
import AddFarmer from './components/AddFarmer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/add" element={<AddFarmer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;