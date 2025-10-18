import React, { useState } from "react";
import "./signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${window.location.origin}/api/v1/register`, inputs)
      .then((response) => {
        if (response.data.message === "User already exists") {
          alert(response.data.message);
        } else {
          alert(response.data.message);
          setInputs({
            email: "",
            username: "",
            password: "",
          });
          navigate("/signin");
        }
      });
  };
  return (
    <div className="signup">
      <div className="container signup-head">
        {/* Left: Form */}
        <div className="form-section">
          <h2 className="form-heading">Create Your Account</h2>
          <p className="form-desc">
            Join us today and boost your productivity!
          </p>
          <input
            className="input-signup"
            type="text"
            name="username"
            placeholder="Username"
            onChange={change}
            value={inputs.username}
          />
          <input
            className="input-signup"
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={change}
            value={inputs.email}
          />
          <input
            className="input-signup"
            type="password"
            name="password"
            placeholder="Password"
            onChange={change}
            value={inputs.password}
          />
          <button className="btn-signup" onClick={submit}>
            Sign Up
          </button>

          {/* Optional: Social Login */}
          {/* <div className="social-login">
            <button className="btn-social google">Sign up with Google</button>
            <button className="btn-social github">Sign up with GitHub</button>
          </div> */}
        </div>

        {/* Right: Heading / Info */}
        <div className="heading-section">
          <h1 className="sign-up-heading">
            Welcome to <span>Productivity Hub</span>
          </h1>
          <p className="sign-up-desc">
            Organize your tasks, increase productivity, and stay ahead. Sign up
            now and get started!
          </p>
        </div>
        {/* <div className="col-lg-4 column col-left d-flex justify-content-center align-items-center">
            <HeaderComp first="Sign" second="Up" />
        </div> */}
      </div>
    </div>
  );
};

export default Signup;
