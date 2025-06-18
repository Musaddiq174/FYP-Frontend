import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Button from 'react-bootstrap/Button';
import '../screens/Welcomepage.css';

const WelcomeHeading = () => {
  const navigate = useNavigate(); // Hook to navigate

  const handleGetStarted = () => {
    navigate('/Signup'); // Navigate to /dashboard
  };

  const handleLogin = () => {
    navigate('/LoginPage'); // Navigate to /dashboard
  };
  return (
    <div className="container2">
      <div className="welcome-message">
        <h1>Welcome to CSS Success Path!</h1>
        <p className="stat">Your journey to mastering CSS exams starts here!</p>
      </div>
      <div className="form-container">
        <Button className="btn1" variant="outline-primary" onClick={handleGetStarted}>
          Get Started
        </Button>
        <Button className="btn1" variant="outline-light" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default WelcomeHeading;
