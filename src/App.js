import './App.css';
import WelcomeHeading from './screens/WelcomePage';
import RegistrationForm from './screens/RegistrationPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './screens/Dashboard';
import LoginPage from './screens/LoginPage';
import MockTestGenerator from './screens/SelectionPage.js'; // Correct import
import TestInterface from './screens/TestInterface.js'
import SubjectiveTest from './screens/SubjectiveTest.js';
import FeedbackComponent from './screens/FeedBack.js'
import EssayTestPage from './screens/EssayTestPage';
function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/essay-test" element={<EssayTestPage />} />
          <Route path="/Subjective-test" element={<SubjectiveTest />} />
            <Route path="/test-generation" element={<MockTestGenerator />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/FeedBack" element={<FeedbackComponent />} />
            <Route path="/Objective-test" element={<TestInterface />} />
            <Route path="/" element={<WelcomeHeading />} />
            <Route path="/Signup" element={<RegistrationForm />} />
            <Route path="/LoginPage" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
