import React, { useState, useEffect } from 'react';
import NavbarComponent from './Navbar';
import './EssayTestPage.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// const allTopics = [
//   'The Role of Education in Nation Building',
//   'Impact of Technology on Modern Education',
//   'Climate Change and Its Global Impact',
//   'Women Empowerment in the 21st Century',
//   'Importance of Mental Health Awareness',
//   'The Future of Artificial Intelligence',
//   'Social Media: Boon or Bane?',
//   'Globalization and Cultural Identity',
//   'Corruption and Its Impact on Society',
//   'The Importance of Environmental Conservation',
//   'Youth and Politics',
//   'Online Learning vs Traditional Learning',
//   'Economic Inequality in Developing Countries',
//   'The Rise of Freelancing in the Modern Economy',
//   'Cybersecurity Threats in the Digital Age'
// ];

const EssayTestPage = () => {
  const [EssayTest, setEssayTest] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [userEssay, setUserEssay] = useState('');
  const [file, setFile] = useState(null);
  const [errorMessage, setError] = useState('');

  useEffect(() => {
    const fetchPartAQuestions = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/generate-essay/');
        setEssayTest(response.data.alltopics); // Make sure this key matches your Django response
        console.log(response.data.alltopics);
      } catch (error) {
        console.error('Error fetching essay topics:', error);
      }
    };

    fetchPartAQuestions();
  }, []);


  const handleSubmit = async (e)  => {
    if (!selectedTopic) {
      alert('❌ Please select a topic.');
      return;
    }

    if (!file && !userEssay.trim()) {
      alert('❌ Please either upload a file or write your essay.');
      return;
    }

    const formData = new FormData();
formData.append("topic", selectedTopic);
formData.append("essay", userEssay);

e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/evaluate-essay/', formData,
        // {
        // essay: userEssay,
        // topic: selectedTopic
      // },
    //  {
    // headers: {
      // 'Content-Type': 'application/json',
    // },
  // }
);
      // Handle successful login (e.g., save token, navigate to dashboard)
      console.log(response.data);
    } catch (err) {
      setError('Submission failed.');
    }
    alert(`✅ Essay submitted for topic: ${selectedTopic}`);
    console.log('Topic:', selectedTopic);
    console.log('Essay:', userEssay);
    console.log('File:', file);
  };

  return (
    <>
      <NavbarComponent />
      <div className="essay-container">
        <h2>Essay Test</h2>

        <h4>Select a Topic:</h4>
        <ul className="topic-list">
          {EssayTest.map((topic, index) => (
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
