import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import NavbarComponent from './Navbar';
import ChatbotWidget from './Chatbot'
import VideoDashboard from './VideoDashbaord'
const Dashboard = () => {
    const navigate = useNavigate();

    const handleTestGeneration = () => {
        navigate('/test-generation');
    };

    const handleDownloadPapers = () => {
        alert('Download option is currently unavailable.');
    };
    const handleDownloadSyllabus = () => {
        alert('Download option is currently unavailable.');
    };
    // Chatbot state
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() === '') return;

        // Add user message
        setMessages([...messages, { text: input, sender: 'user' }]);
        setInput('');

        // Simulate a bot response (you can replace this with actual AI logic)
        const botResponse = `You said: ${input}`;
        setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: 'bot' }]);
    };

    return (
        <>
            <NavbarComponent />
            <div className="dashboard-container">
                <div className="heading-section text-center">
                    <h2 className="site-title">Start Your Test Preparation Online!</h2>
                    <p className="exam-description">
                        Prepare for your CSS exam with confidence! Our platform CSS Success Path is designed to help candidates excel in CSS exams through mock tests, personalized feedback,study guides, interactive tutorials and progress tracking to help you master CSS concepts. Our platform ensures candidates are prepared for all challenges in CSS examinations.
                    </p>
                </div>
                <div className="button-section text-center">
                    <Button variant="primary" size="lg" onClick={handleTestGeneration}>
                        Generate Mock Test
                    </Button>
                </div>
            </div>
            <div className="info-section">
                <h3>Why MCQs Matter</h3>
                <p>
                    Multiple-choice questions (MCQs) are crucial for several reasons:
                    <ul>
                        <li><strong>Assessment of Knowledge:</strong> MCQs effectively gauge your understanding of CSS concepts and principles.</li>
                        <li><strong>Time Management:</strong> They allow for quicker assessment, helping you manage your time during exams.</li>
                        <li><strong>Immediate Feedback:</strong> With practice MCQs, you can receive instant feedback on your performance, identifying areas for improvement.</li>
                        <li><strong>Preparation for Real Exams:</strong> Many standardized tests use MCQs, making practice essential for exam readiness.</li>
                        <li><strong>Encourages Critical Thinking:</strong> MCQs often require you to analyze and apply knowledge, enhancing critical thinking skills.</li>
                    </ul>
                    Embracing MCQs in your study routine can significantly boost your exam performance and overall understanding of CSS.
                </p>
            </div>
            <div className="download-section">
  <h3>CSS All Subjects Past Papers & Syllabus Download:</h3>
  <div className="download-buttons">
    <Button variant="success" onClick={handleDownloadPapers}>
      Download Past Papers
    </Button>
    <Button variant="info" onClick={handleDownloadSyllabus}>
      Download Syllabus
    </Button>
  </div>
 
</div>
<VideoDashboard/>
            <ChatbotWidget/>
        </>
    );
};

export default Dashboard;