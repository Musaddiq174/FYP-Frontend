import React, { useState } from 'react';
import NavbarComponent from './Navbar'; // Importing the Navbar component
import './Dashboard.css'; // Importing Dashboard-specific CSS
import './SubjectiveTest.css'; // Importing SubjectiveTest-specific CSS
import { useNavigate } from 'react-router-dom';
import ChatbotWidget from './Chatbot'
import './TestInterface.css';
import axios from 'axios';
import { useEffect } from 'react';
const SubjectiveTest = () => {
  const [answers, setAnswers] = useState({});
  const [uploads, setUploads] = useState({});
const navigate = useNavigate();
  // const subjectiveQuestions = [
  //   {
  //     id: 'Q2',
  //     marks: 20,
  //     question: 'Write a précis of the following passage and suggest a suitable title.',
  //     description: `On the question of freedom in education there are at present three main schools of thought, deriving partly from differences as to ends and partly from differences in psychological theory. There are those who say that children should be completely free, however bad they may be; there are those who say they should be completely subject to authority, however good they may be; and there are those who say they should be free, but in spite of freedom they should be always good. This last party is larger than it has any logical right to be; children, like adults, will not all be virtuous if they are all free. The belief that liberty will ensure moral perfection is a relic of Rousseauism, and would not survive a study of animals and babies. `,
  //   },
  //   {
  //     id: 'Q3',
  //     marks: 20,
  //     question: 'Read the following passage carefully and answer the questions given at the end.',
  //     description: `The majority of people have always lived simply, and most of humanity still struggles on a daily basis to eke out a meager existence under dire circumstances. Only in affluent industrialized countries do people have the luxury of more goods and services than they need to survive. On the basis of material wealth, North Americans and Europeans should be the happiest people on earth, but according to the 2012 Happy Planet Index (HPI), they are not. For example, Costa Rica consistently ranks high on the HPI, despite having a GDP per capita much lower than that of the United States. This suggests that material wealth alone does not guarantee happiness.`,
  //     subQuestions: [
  //       { id: 'Q3.1', text: 'How important is happiness to most people, and what is the relationship between material wealth and happiness?' },
  //       { id: 'Q3.2', text: 'How does the author characterize the concept of ‘Voluntary Simplicity’ as a movement and as a philosophy?' },
  //       { id: 'Q3.3', text: 'What impact is feared by the growing consumerism of modern society?' },
  //       { id: 'Q3.4', text: 'What influences make it difficult for people to reduce their consumption patterns?' },
  //       { id: 'Q3.5', text: 'What are the challenges and rewards of voluntary simplicity?' },
  //     ],
  //   },
  //   {
  //     id: 'Q4',
  //     marks: 10,
  //     question: 'Correct only FIVE of the following:',
  //     description: `1. His knowledge of languages and international relations aid him in his work.<br /><br />2. The ambassador, with his family and staff, invite you to a reception at the embassy on Tuesday afternoon.<br /><br />3. This year, he will sit in the CSS examination.<br /><br />4. The Chief Executive will let us know whether or not he can attend the meeting.<br /><br />5. When he came back from vacation, Aslam and me plan to look for another apartment.<br /><br />6. If some of you make a noise, they shall be punished.<br /><br />7. He came to me to enquire what is the salary attached to the appointment.<br /><br />8. I am too tired that I do not hunt words and idioms in my English book.`,
  //   },
  //   {
  //     id: 'Q5.a',
  //     marks: 5,
  //     question: 'Punctuate the following text, where necessary.',
  //     description: `While taking a nap on the porch one hot summer day, Hodga dreamed that a stranger promised to give him ten pieces of gold. The stranger placed them in Hodga's hand one by one until he reached the tenth piece, which he hesitated to give him.<br /><br />"Come on, what are you waiting for?" said Hodga. "You promised me ten."<br /><br />Just then, he woke up. He immediately looked at his hand and saw that it was empty. He quickly shut his eyes again, stretched out his hand, and said, "All right, I'll settle for nine."`,
  //   },
  //   {
  //     id: 'Q5.b',
  //     marks: 5,
  //     question: 'Fill in the blanks with appropriate prepositions.',
  //     description: `1. The neighbours came ______ my house to see what’s going on in the house.<br /><br />2. She sat _______ the shade of the tree.<br /><br />3. The moon does not shine _______ its own light.<br /><br />4. The burglar jumped ________ the compound wall.<br /><br />5. She entered ________ an agreement with them.<br /><br />6. I have been working hard ________ arithmetic.<br /><br />7. He got ________ his bicycle.<br /><br />8. It cannot be done ________ offence.`,
  //   },
  //   {
  //     id: 'Q6',
  //     marks: 10,
  //     question: 'Use only FIVE pairs of words in sentences clearly illustrating their meanings.',
  //     description: `Pairs: Antic, Antique | Draught, Drought | Quaint, Queer | Momentary, Momentous | Compliment, Complement | Eminent, Imminent | Faint, Feint | Immigrant, Emigrant`,
  //   },
  //   {
  //     id: 'Q7',
  //     marks: 10,
  //     question: 'Translate the following into English by keeping in view figurative/idiomatic expressions.',
  //     description: `جنگل کے پار ایک پہاڑ ہے جہاں وہ پھول اگُتا ہے جس کی خوشبو سے آنکھوں کی خوئی ہوئی روشنی لوٹ آتی ہے...`,
  //   },
  // ];
  const [subjectiveQuestions, setSubjectiveQuestions] = useState([]);
  
    useEffect(() => {
    const fetchPartAQuestions = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/generate-subjective/'
          // , {
          // category: 'partA' // 👈 this is your single parameter
        // }
      );
  
        setSubjectiveQuestions(response.data.subjectiveQuestions); // Adjust based on API response structure
      } catch (error) {
        console.error('Error fetching Part A questions:', error);
      }
    };
  
    fetchPartAQuestions();
  }, []);
  

  const handleInputChange = (id, value) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileUpload = (id, file) => {
    setUploads((prev) => ({
      ...prev,
      [id]: file,
    }));
  };

  const handleSubmit = () => {
    navigate('/FeedBack');
    const unanswered = subjectiveQuestions.flatMap((q) => {
      if (q.subQuestions) {
        return q.subQuestions.filter(
          (subQ) => (!answers[subQ.id] || answers[subQ.id].trim() === '') && !uploads[subQ.id]
        ).map((subQ) => subQ.id);
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
  };

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
          {subjectiveQuestions.map((q) => (
            <div key={q.id} className="question">
              <h4>
                {q.id}. {q.question} ({q.marks} Marks)
              </h4>
              <p dangerouslySetInnerHTML={{ __html: q.description }}></p>
              {q.subQuestions ? (
                <ol>
                  {q.subQuestions.map((subQ) => (
                    <li key={subQ.id}>
                      <label>{subQ.text}</label>
                      <textarea
                        rows="4"
                        placeholder="Write your answer here..."
                        value={answers[subQ.id] || ''}
                        onChange={(e) => handleInputChange(subQ.id, e.target.value)}
                      />
                      <label className="upload-label">Upload your answer:</label>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="custom-file-input"
                        onChange={(e) => handleFileUpload(subQ.id, e.target.files[0])}
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
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                  />
                  <label className="upload-label">Upload your answer:</label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="custom-file-input"
                    onChange={(e) => handleFileUpload(q.id, e.target.files[0])}
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
        <button className=" btn-back"
          onClick={()=>{ navigate('/Dashboard')}}
          >Back</button>
      </div>
      <ChatbotWidget/>
    </>
  );
};

export default SubjectiveTest;
