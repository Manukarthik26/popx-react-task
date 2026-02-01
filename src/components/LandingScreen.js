import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingScreen.css'; 

const LandingScreen = () => {
   const navigate = useNavigate();                         

  return (
    <div className="landing-container">
      <div className="content-wrapper">
        <h1 className="title">Welcome to PopX</h1>
        <p className="subtitle">
          Lorem ipsum dolor sit amet, <br />
          consectetur adipiscing elit,
        </p>


        <button
          className="btn primary"
          onClick={() => navigate('/signup')}               
        >
          Create Account
        </button>


      <button
          className="btn secondary"
          onClick={() => navigate('/login')}               
        >
           Already Registered? <span>Login</span>
        </button>
      </div>
    </div>
  );
};

export default LandingScreen;