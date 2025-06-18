import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import ResetPasswordModal from "./ResetPassword";
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setError] = useState('');

  const handleSignup = () => {
    navigate('/Signup');
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username: email,
        password: password,
      },
     {
    headers: {
      'Content-Type': 'application/json',
    },
  });
      // Handle successful login (e.g., save token, navigate to dashboard)
      console.log(response.data);
      navigate('/Dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Open the reset password modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };
  return (
    <div className="LoginBody">
      <div className="headingloggin">
        <h2 className="form-title">Welcome Back!</h2>
        <p className="platform-description">
          Welcome to <strong>CSS Success Path</strong>, your ultimate companion for CSS exam preparation.
          We provide expertly crafted study materials, practice exams, and guidance from seasoned mentors to ensure your success.
          Join us today and turn your dreams into achievements.
        </p>
      </div>
      <div className="LoginForm">
                        {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"  value={email}
            onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>

          <Button variant="primary" type="submit" className="btn btn-primary btn-lg" onClick={handleLogin}>
            Login
          </Button>
          <p>
            Forgot Password?{' '}
            <button
               type="button"
               onClick={handleForgotPassword}
                style={{ background: "none", border: "none", color: "#007bff", textDecoration: "underline", padding: 0, fontSize: "inherit", cursor: "pointer" }}
>
                Reset it here
                </button>

          </p>
          <p>
            Create Account?{' '}
            <button
              type="button"
              onClick={handleSignup}
               style={{ background: "none", border: "none", color: "#007bff", textDecoration: "underline", padding: 0, fontSize: "inherit", cursor: "pointer" }}
>
               Signup
            </button>

          </p>
        </Form>
      </div>
      {/* Include the ResetPasswordModal */}
      <ResetPasswordModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default LoginPage;
