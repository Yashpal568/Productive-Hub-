import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
   const navigate = useNavigate();

    const handleStart = () => {
    navigate('/task'); 
  };
  return (
    <div className="home d-flex flex-column justify-content-center align-items-center text-center">
      <div className="content">
        <h1 className="fw-bold title">
          Welcome to <span className="highlight">Productivity Hub</span>
        </h1>
        <p className="subtitle">
          Plan your day, keep track of tasks, and never miss a deadline again.  
          Whether it's work, studies, or personal projects, stay organized and achieve more every day.
        </p>
        <button className="btn-glow mt-3" onClick={handleStart}>Start Managing Tasks</button>
      </div>
    </div>
  );
};

export default Home;
