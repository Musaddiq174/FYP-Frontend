import React, { useState, useEffect } from 'react';
import '../screens/SelectionPage.css';
import NavbarComponent from './Navbar';
import './TestInterface.css';
import ChatbotWidget from './Chatbot';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TestInterface = () => {
  const [answers, setAnswers] = useState({});
  const [missedQuestions, setMissedQuestions] = useState([]);
  const [partAQuestions, setPartAQuestions] = useState([]);
  const [partBQuestions, setPartBQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/generate-mcqs/');
        setPartAQuestions(response.data.mcqs.partAQuestions || []);
        setPartBQuestions(response.data.mcqs.partBQuestions || []);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError('Failed to load questions. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const allQuestions = [...partAQuestions, ...partBQuestions];

  const handleSelect = (id, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: option,
    }));
  };

  const handleSubmit = () => {
    const unansweredQuestions = allQuestions
      .filter((q) => !answers[q.id])
      .map((q) => q.id);

    if (unansweredQuestions.length > 0) {
      setMissedQuestions(unansweredQuestions);
      alert(`Please answer the following questions: ${unansweredQuestions.join(', ')}`);
      return;
    }

    alert('Test submitted successfully!');
    console.log('Selected Answers:', answers);
    navigate('/FeedBack');
  };

  const renderQuestions = (questions, part) => {
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return <p>No questions available for Part {part}</p>;
    }
    return (
      <ol>
        {questions.map((item, index) => (
          <li key={index}>
            {item.question}
            <ul>
              {item.options.map((option, idx) => (
                <li key={idx}>
                  <label>
                    <input
                      type="radio"
                      name={item.id}
                      value={option}
                      checked={answers[item.id] === option}
                      onChange={() => handleSelect(item.id, option)}
                    />
                    <strong>{String.fromCharCode(65 + idx)}. </strong>
                    {option}
                  </label>
                </li>
              ))}
            </ul>
            {missedQuestions.includes(item.id) && (
              <p className="missed-question">This question is required!</p>
            )}
          </li>
        ))}
      </ol>
    );
  };

  if (isLoading) {
    return <div>Loading questions...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <NavbarComponent />
      <div className="test-interface-container">
        <header className="test-header">
          <h1>CSS Examination - English Paper</h1>
          <h2>Competitive Exam for Federal Services</h2>
        </header>
        <div className="test-content">
          <section className="instructions">
            <h3>Instructions:</h3>
            <ul>
              <li>PART-I (MCQs) : MAXIMUM 30 MINUTES.</li>
              <li>Attempt all questions before submitting.</li>
              <li>Each question carries 1 mark.</li>
              <li>Select the best option for each question.</li>
            </ul>
          </section>

          <section className="questions">
            <h4>(a) Choose the word that is nearly most similar in meaning to the capitalized words:</h4>
            {renderQuestions(partAQuestions, 'A')}

            <h4>(b) Choose the word that is nearly most opposite in meaning to the capitalized words:</h4>
            {renderQuestions(partBQuestions, 'B')}
          </section>

          <footer className="test-footer">
            <button onClick={handleSubmit} className="submit-button">
              Submit Test
            </button>
            <button
              className="btn-back"
              onClick={() => navigate('/Dashboard')}
            >
              Back
            </button>
          </footer>
        </div>
      </div>
      <ChatbotWidget />
    </>
  );
};

export default TestInterface;