import React, { useState } from "react";
import axios from "axios";
import "./signin.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useDispatch} from "react-redux";
import { authActions } from "../../store";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

 const submit = async (e) => {
    e.preventDefault();

    try {
      // Try to log in
      const response = await axios.post(
        `${window.location.origin}/api/v1/login`,
        inputs
      );

      // --- This code only runs if login is SUCCESSFUL ---
      sessionStorage.setItem("id", response.data.user._id);
      dispatch(authActions.login());
      
      //Show a success toast
      toast.success("Login successful! Redirecting...");

      // Navigate *after* successful login
      navigate("/task");

    } catch (error) {
      // --- This code runs if login FAILS ---
      // Get the error message from the server, or show a default one
      const errorMessage = error.response?.data?.message || "Invalid Email or Password";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="signin">
      <ToastContainer position="bottom-right" theme="dark" />
      <div className="container signin-head">
        {/* Left: Login Form */}
        <div className="form-section">
          <h2 className="form-heading">Sign In to Your Account</h2>
          <p className="form-desc">
            Welcome back! Enter your details to continue.
          </p>

          <input
            className="input-signin"
            type="email"
            name="email"
            placeholder="Email Address"
            value={inputs.email}
            onChange={change}
          />
          <input
            className="input-signin"
            type="password"
            name="password"
            placeholder="Password"
            value={inputs.password}
            onChange={change}
          />

          <button className="btn-signin" onClick={submit}>
            Sign In
          </button>

          <p className="signup-link">
            Don’t have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>

        {/* Right: Info Text */}
        <div className="heading-section">
          <h1 className="signin-heading">
            Welcome Back, <span>Productivity Hub</span>
          </h1>
          <p className="signin-desc">
            Reconnect with your organized world. Manage tasks, stay on track,
            and achieve your daily goals effortlessly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
