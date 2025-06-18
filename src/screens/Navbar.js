import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import NotificationPopup from './Notification'; // Import NotificationPopup

const NavbarComponent = () => {
    const navigate = useNavigate();

    const handleProfile = () => {
        navigate('/profile'); // Adjust this path to your profile route
    };

    const handleLogout = () => {
        alert('Logged out successfully'); // Placeholder for logout functionality
        navigate('/'); // Redirect to home or login page
    };

    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="navbar px-3">
            {/* Left Section */}
            <div className="navbar-left d-flex align-items-center">
                <Nav>
                    <Nav.Item>
                        <Button variant="secondary" onClick={handleProfile} className="nav-button me-2">
                            Profile
                        </Button>
                    </Nav.Item>
                </Nav>
                {/* Add Notification Popup */}
                <NotificationPopup />
            </div>

            {/* Center Section */}
            <Navbar.Brand className="navbar-brand mx-auto text-white">
                CSS Success Path
            </Navbar.Brand>

            {/* Right Section */}
            <div className="navbar-right">
                <Nav>
                    <Nav.Item>
                        <Button variant="danger" onClick={handleLogout} className="Logout-btn nav-button">
                            Logout
                        </Button>
                    </Nav.Item>
                </Nav>
            </div>
        </Navbar>
    );
};

export default NavbarComponent;
