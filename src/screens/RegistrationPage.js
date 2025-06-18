import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../screens/RegistrationPage.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const RegistrationForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/LoginPage');
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        const data = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            username: email,
            password: password,
            password2: confirmPassword,
        };

          try {
const response = await axios.post(
  "http://127.0.0.1:8000/api/register/",
  data, // your payload
  {
    headers: {
      "Content-Type": "application/json"
    }
  }
);
            console.log("✅ Registration success:", response.data.message);

        // ✅ Success
        setShowAlert(true);
        setErrorMessage("");
        setTimeout(() => {
            setShowAlert(false);
            navigate("/LoginPage");
        }, 2000);
    } catch (error) {
        // ✅ Axios always puts server errors in `error.response.data`
        console.log(error)
        const res = error.response?.data;

        const errorText =
            res?.password ||
            res?.email ||
            res?.username ||
            res?.error || // general error
            "Registration failed.";

        console.error("❌ Registration error:", res);
        console.log(res)
        setErrorMessage(errorText.toString());
    }
};

    return (
        <div className="container1">
            <div className="heading-section text-center">
                <h2 className="site-title">CSS Success Path</h2>
                <p className="site-tagline">
                    Your ultimate companion for CSS exam preparation. Join us and turn your dreams into achievements!
                </p>
            </div>
            <div className="Rform">
                {showAlert && (
                    <div className="alert alert-success" role="alert">
                        Signup successful! Redirecting to login...
                    </div>
                )}
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}
                <Form onSubmit={handleSignup}>
                    <Form.Group className="mb-3" controlId="formGroupFirstname">
                        <Form.Control
                            type="text"
                            placeholder="Enter First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupLastname">
                        <Form.Control
                            type="text"
                            placeholder="Enter Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center">
                        <Button variant="outline-primary" size="sm" type="submit">Sign-UP</Button>
                        <Button variant="secondary" size="sm" active onClick={handleBack}>Back</Button>
                    </div>
                    <div className="mt-3 text-center">
                        <p>
                            Already have an account?{' '}
                            <Button variant="link" size="sm" onClick={handleLogin}>
                                Login
                            </Button>
                        </p>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default RegistrationForm;
