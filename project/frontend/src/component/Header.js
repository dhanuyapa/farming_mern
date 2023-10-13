import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

// Import your account image
import accountImage from "./images/account.png";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    alert(`Searching for: ${searchQuery}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Function to navigate to the UserProfile component, AdminDashboard, or Login component based on login status
  const handleAccountImageClick = () => {
    const userNIC = localStorage.getItem("loggedInUserNIC");
    const isAdmin = localStorage.getItem("userRole") === "admin";

    if (isAdmin) {
      navigate("/AdminDashboard");
    } else if (userNIC) {
      navigate(`/getUser/${userNIC}`);
    } else {
      navigate("/loginCus");
    }
  };

  return (
    <header>
      <div className="header-top">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="header-container">
            <center>
              <div className="header-brand">
                <Link
                  className="navbar-brand"
                  to="/"
                  style={{
                    color: "black",
                    fontFamily: "Bowlby One",
                    fontSize: "60px",
                    fontWeight: "bold",
                  }}
                >
                  Green Field Pro
                </Link>
              </div>
            </center>
            <div className="header-buttons">
              <Link className="btn btn-success" to="/AddCustomer">
                Register
              </Link>
              <Link className="btn btn-success" to="/loginCus">
                Login
              </Link>
            
            <img
              src={accountImage}
              alt="Account"
              className="account-image"
              onClick={handleAccountImageClick}
            />
          </div></div>
        </nav>
      </div>
      <div className="header-bottom">
        <div className="nav-header-bottom">
          <ul>
            <li className="nav-item active">
              <Link
                className="nav-link"
                to="/"
                style={{ color: "black", fontSize: "20px" }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/about"
                style={{ color: "black", fontSize: "15px" }}
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/downloads"
                style={{ color: "black", fontSize: "20px" }}
              >
                Downloads
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/news"
                style={{ color: "black", fontSize: "20px" }}
              >
                News
              </Link>
            </li>
            <li>
              <div className="rounded-search-bar">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button className="search-button" onClick={handleSearch}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;