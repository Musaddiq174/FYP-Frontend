import React, { useState } from 'react';
import '../screens/SelectionPage.css'; // Assuming your CSS file is named SelectionPage.css
import { useNavigate } from 'react-router-dom';
import NavbarComponent from './Navbar';

const MockTestGenerator = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('precis-writing'); // Default to 'precis-writing'

  const HandleStartTest = () => {
    if (subject === 'precis-writing') {
      navigate('/Objective-test');
    } else if (subject === 'comprehension') {
      navigate('/Subjective-test');
    } else if (subject === 'english-essay') {
    navigate('/essay-test');
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="container">
        <h1 className="title">Generate Mock Test</h1>
        <div>
        <div className="form-group">
            <label className="label">Select subject</label>
            <select
              className="select"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="precis-writing">English</option>
              {/* <option value="comprehension">Subjective</option> */}
            </select>
          </div>
          <div className="form-group">
            <label className="label">Select Test type</label>
            <select
              className="select"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="precis-writing">MCQs</option>
              <option value="comprehension">Subjective</option>
              <option value="english-essay">English Essay</option>

            </select>
          </div>

          <div className="form-group">
            <label className="label">Difficulty</label>
            <select className="select" defaultValue="easy">
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          

          <div className="button-container">
            <button className="start-button" onClick={HandleStartTest}>
              Start Test
            </button>
            <button className="back-button">Back</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MockTestGenerator;
