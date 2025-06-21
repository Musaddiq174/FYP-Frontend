import React, { useState, useEffect } from 'react';
import NavbarComponent from './Navbar';
import './Dashboard.css';
import './SubjectiveTest.css';
import './TestInterface.css';
import { useNavigate } from 'react-router-dom';
import ChatbotWidget from './Chatbot';
import axios from 'axios';

const SubjectiveTest = () => {
  const [answers, setAnswers] = useState({}); // Store text answers
  const [uploads, setUploads] = useState({}); // Store file uploads
  const [subjectiveQuestions, setSubjectiveQuestions] = useState([]); // Store API questions
  const [loading, setLoading] = useState(true); // Track API loading state
  const [error, setError] = useState(null); // Track API errors
  const navigate = useNavigate();

  // Fetch questions from backend API
  const fetchPartAQuestions = async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const response = await axios.post('http://127.0.0.1:8000/api/generate-subjective/');
      console.log('API Response:', response.data); // Debug: Log response
      // Normalize API response to match frontend structure
      const questions = Array.isArray(response.data.subjective_test)
        ? response.data.subjective_test.map(q => ({
            id: q.id,
            marks: q.marks,
            question: q.section, // Use section as question title (e.g., "Precis Writing")
            description: q.Question, // Use Question as description text
            subQuestions: q.sub_section
              ? q.sub_section.map(sub => ({
                  id: sub.sub_id,
                  text: sub.Question,
                  marks: sub.marks,
                }))
              : undefined,
          }))
        : [];
      setSubjectiveQuestions(questions);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError(`Failed to load questions: ${err.message}`);
      setLoading(false);
    }
  };

  // Fetch questions on component mount
  useEffect(() => {
    fetchPartAQuestions();
  }, []);

  // Update answer state for text inputs
  const handleInputChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  // Update upload state for files
  const handleFileUpload = (id, file) => {
    setUploads(prev => ({ ...prev, [id]: file }));
  };

  // Validate and submit test
  const handleSubmit = () => {
    const unanswered = subjectiveQuestions.flatMap(q => {
      if (q.subQuestions) {
        return q.subQuestions.filter(
          subQ => (!answers[subQ.id] || answers[subQ.id].trim() === '') && !uploads[subQ.id]
        ).map(subQ => subQ.id);
      }
      return (!answers[q.id] || answers[q.id].trim() === '') && !uploads[q.id] ? [q.id] : [];
    });

    if (unanswered.length > 0) {
      alert(`Please answer all questions or upload files. Missing: ${unanswered.join(', ')}`);
      return;
    }

    alert('Test submitted successfully!');
    console.log('Submitted Answers:', answers);
    console.log('Uploaded Files:', uploads);
    navigate('/FeedBack');
  };

  // Render loading or error states
  if (loading) return <div>Loading questions...</div>;
  if (error) return (
    <div>
      <p>{error}</p>
      <button onClick={fetchPartAQuestions}>Retry</button>
    </div>
  );

  return (
    <>
      <NavbarComponent />
      <div className="subjective-test-container">
        <header className="subjective-header">
          <h1>CSS Examination - English Subjective Test</h1>
          <h2>Competitive Exam for Federal Services</h2>
        </header>

        <section className="instructions">
          <h3>Instructions:</h3>
          <ul>
            <li>Attempt ALL questions.</li>
            <li>Write your answers in the provided answer boxes or upload files.</li>
          </ul>
        </section>

        <section className="questions">
          {subjectiveQuestions.map(q => (
            <div key={q.id} className="question">
              <h4>
                {q.id}. {q.question} ({q.marks} Marks)
              </h4>
              <p dangerouslySetInnerHTML={{ __html: q.description }} />
              {q.subQuestions ? (
                <ol>
                  {q.subQuestions.map(subQ => (
                    <li key={subQ.id}>
                      <label>{subQ.text}</label>
                      <textarea
                        rows="4"
                        placeholder="Write your answer here..."
                        value={answers[subQ.id] || ''}
                        onChange={e => handleInputChange(subQ.id, e.target.value)}
                      />
                      <label className="upload-label">Upload your answer:</label>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="custom-file-input"
                        onChange={e => handleFileUpload(subQ.id, e.target.files[0])}
                      />
                    </li>
                  ))}
                </ol>
              ) : (
                <>
                  <textarea
                    rows="6"
                    placeholder="Write your answer here..."
                    value={answers[q.id] || ''}
                    onChange={e => handleInputChange(q.id, e.target.value)}
                  />
                  <label className="upload-label">Upload your answer:</label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="custom-file-input"
                    onChange={e => handleFileUpload(q.id, e.target.files[0])}
                  />
                </>
              )}
            </div>
          ))}
        </section>

        <footer className="subjective-footer">
          <button className="submit-button" onClick={handleSubmit}>
            Submit Test
          </button>
        </footer>
        <button
          className="btn-back"
          onClick={() => navigate('/Dashboard')}
        >
          Back
        </button>
      </div>
      <ChatbotWidget />
    </>
  );
};

export default SubjectiveTest;