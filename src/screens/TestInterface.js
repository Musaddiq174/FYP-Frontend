import React, { useState } from 'react';
import '../screens/SelectionPage.css';
import NavbarComponent from './Navbar';
import './TestInterface.css';
import ChatbotWidget from './Chatbot'
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import axios from 'axios';
import { useEffect } from 'react';

const TestInterface = () => {
  const [answers, setAnswers] = useState({});
  const [missedQuestions, setMissedQuestions] = useState([]);
 const navigate = useNavigate(); 
  // const partAQuestions = [
  //   { id: 'A1', question: 'UBIQUITOUS', options: ['Scarce', 'Present everywhere', 'Unique', 'Limited'] },
  //   { id: 'A2', question: 'PERNICIOUS', options: ['Beneficial', 'Harmful', 'Lucid', 'Fervent'] },
  //   { id: 'A3', question: 'MELLIFLUOUS', options: ['Grating', 'Smooth and sweet-sounding', 'Dissonant', 'Discordant'] },
  //   { id: 'A4', question: 'EPHEMERAL', options: ['Enduring', 'Eternal', 'Short-lived', 'Persistent'] },
  //   { id: 'A5', question: 'ASTUTE', options: ['Indifferent', 'Pensive', 'Stupid', 'Insightful'] },
  //   { id: 'A6', question: 'ENTHRALL', options: ['Bore', 'Captivate', 'Fascinate', 'Disinterest'] },
  //   { id: 'A7', question: 'SYCOPHANT', options: ['Admirer', 'Advocate', 'Critic', 'Flatterer'] },
  //   { id: 'A8', question: 'ASSUAGE', options: ['Aggravate', 'Intensify', 'Soothe', 'Alleviate'] },
  //   { id: 'A9', question: 'RETICENT', options: ['Talkative', 'Loquacious', 'Vocal', 'Reserved'] },
  //   { id: 'A10', question: 'INCESSANT', options: ['Sporadic', 'Intermittent', 'Persistent', 'Halted'] },
  // ];

  const [partAQuestions, setPartAQuestions] = useState([]);
  const [partBQuestions, setPartBQuestions] = useState([]);

  useEffect(() => {
  const fetchPartAQuestions = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/generate-mcqs/'
        // , {
        // category: 'partA' // 👈 this is your single parameter
      // }
    );

      setPartAQuestions(response.data.partAQuestions); // Adjust based on API response structure
      setPartBQuestions(response.data.partBQuestions); // Adjust based on API response structure
    } catch (error) {
      console.error('Error fetching Part A questions:', error);
    }
  };

  fetchPartAQuestions();
}, []);

console.log(partAQuestions);
console.log(partBQuestions);
  // const partBQuestions = [
  //   { id: 'B1', question: 'ESOTERIC', options: ['Obvious', 'Understood by few', 'Extraneous', 'Common'] },
  //   { id: 'B2', question: 'SQUALID', options: ['Dirty', 'Wretched', 'Lavish', 'Clean'] },
  //   { id: 'B3', question: 'TACITURN', options: ['Loquacious', 'Voluble', 'Reticent', 'Silent'] },
  //   { id: 'B4', question: 'CONSTRICT', options: ['Tighten', 'Contract', 'Expand', 'Release'] },
  //   { id: 'B5', question: 'LOQUACIOUS', options: ['Talkative', 'Silent', 'Reticent', 'Reserved'] },
  //   { id: 'B6', question: 'INDOLENT', options: ['Lazy', 'Active', 'Lethargic', 'Energetic'] },
  //   { id: 'B7', question: 'COALESCE', options: ['Merge', 'Combine', 'Disperse', 'Separate'] },
  //   { id: 'B8', question: 'RANCOR', options: ['Animosity', 'Bitterness', 'Hostility', 'Amicability'] },
  //   { id: 'B9', question: 'ACQUIESCE', options: ['Comply', 'Resist', 'Agree', 'Deny'] },
  //   { id: 'B10', question: 'DEBILITATE', options: ['Fortify', 'Weaken', 'Strengthen', 'Enervate'] },
  // ];

  const allQuestions = [...partAQuestions, ...partBQuestions];

  const handleSelect = (id, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: option,
    }));
  };

  const handleSubmit = () => {
    navigate('/FeedBack');
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
  };

  const renderQuestions = (questions, part) => (
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
            
          </footer>
          <button className=" btn-back"
          onClick={()=>{ navigate('/Dashboard')}}
          >Back</button>
        </div>
      </div>
      <ChatbotWidget/>
    </>
  );
};

export default TestInterface;
