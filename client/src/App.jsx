import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Footer from "./components/footer/Footer";
import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import Task from "./components/tasks/Task"

import {useDispatch} from "react-redux";
import { authActions } from "./store";
// import Login from "./components/login/Login";
// import Signup from "./components/signup/Signup";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const id = (sessionStorage.getItem("id"))
    if(id) {
     dispatch(authActions.login())
    }

  }, [])
  return (
    <Router>
      {/* Navbar stays on top for all pages */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/task" element={<Task />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
       
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
