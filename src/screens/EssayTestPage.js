import React, { useState, useEffect } from 'react';
import NavbarComponent from './Navbar';
import './EssayTestPage.css';
import axios from 'axios';

const EssayTestPage = () => {
  const [essayTopics, setEssayTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [userEssay, setUserEssay] = useState('');
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [submissionResult, setSubmissionResult] = useState(null);

  useEffect(() => {
    const fetchEssayTopics = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/generate-essay/');
        setEssayTopics(response.data.alltopics);
        console.log(response.data.alltopics);
      } catch (error) {
        console.error('Error fetching essay topics:', error);
        setErrorMessage('Failed to load essay topics. Please try again later.');
      }
    };

    fetchEssayTopics();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTopic) {
      setErrorMessage('Please select a topic.');
      return;
    }

    if (!file && !userEssay.trim()) {
      setErrorMessage('Please either upload a file or write your essay.');
      return;
    }

    setErrorMessage('');
    setSubmissionResult(null);

    const formData = new FormData();
    formData.append("topic", selectedTopic);
    formData.append("essay", userEssay);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/evaluate/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSubmissionResult(response.data);
      console.log('Essay evaluation response:', response.data);
    } catch (err) {
      console.error('Error submitting essay:', err);
      setErrorMessage('Submission failed. Please try again.');
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="essay-container">
        <h2>Essay Test</h2>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {submissionResult && (
          <div className="submission-result">
            <h3>Submission Result</h3>
            <pre>{JSON.stringify(submissionResult, null, 2)}</pre>
          </div>
        )}

        <h4>Select a Topic:</h4>
        <ul className="topic-list">
          {essayTopics.map((topic, index) => (
            <li key={index}>
              <label>
                <input
                  type="radio"
                  name="essayTopic"
                  value={topic}
                  checked={selectedTopic === topic}
                  onChange={() => setSelectedTopic(topic)}
                />
                {topic}
              </label>
            </li>
          ))}
        </ul>

        <h4>Write Your Essay:</h4>
        <textarea
          value={userEssay}
          onChange={(e) => setUserEssay(e.target.value)}
          className="user-response"
          placeholder="Write your essay here (optional if uploading a file)..."
        />

        <h4>Or Upload Essay File:</h4>
        <input
          type="file"
          accept=".txt,.doc,.docx,.pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="file-upload"
        />

        <button onClick={handleSubmit} className="submit-button">
          Submit Essay
        </button>
      </div>
    </>
  );
};

export default EssayTestPage;