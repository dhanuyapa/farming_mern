import React from 'react';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/settings">Settings</NavLink>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
      {/* Your Home page content goes here */}
    </div>
  );
}

export default Home;