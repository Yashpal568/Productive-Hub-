import React from "react";
import { Link } from "react-router-dom"; // ✅ import Link
import { FaSwatchbook } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const logout = () => {
    sessionStorage.clear("id");
    dispatch(authActions.logout());
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand fw-bold glow-text" to="/">
          <FaSwatchbook /> &nbsp; PRODUCTIVE HUB
          <span className="brand-dot">.</span>
        </Link>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav text-lg-end text-start">
            <li className="nav-item mx-2">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link" to="/task">
                Task
              </Link>
            </li>
            {!isLoggedIn && (
              <>
               
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <li className="nav-item mx-2" onClick={logout}>
                <Link className="nav-link" to="/#">
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
