"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const EssayTestPage = () => {
  const [essayTopics, setEssayTopics] = useState([])
  const [selectedTopic, setSelectedTopic] = useState("")
  const [userEssay, setUserEssay] = useState("")
  const [file, setFile] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [submissionResult, setSubmissionResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEssayTopics = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/generate-essay/")
        setEssayTopics(response.data.alltopics)
        console.log(response.data.alltopics)
      } catch (error) {
        console.error("Error fetching essay topics:", error)
        setErrorMessage("Failed to load essay topics. Please try again later.")
      }
    }

    fetchEssayTopics()
  }, [])

  // Function to extract text from file (for client-side reading)
  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.onerror = (e) => reject(e)
      reader.readAsText(file)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedTopic) {
      setErrorMessage("Please select a topic.")
      return
    }

    let essayContent = userEssay.trim()

    // If file is uploaded, read its content
    if (file) {
      try {
        // For simple text files, read content on client side
        if (file.type === "text/plain" || file.name.endsWith(".txt")) {
          essayContent = await readFileContent(file)
        } else {
          // For other file types, use FormData approach
          return handleFileUpload(e)
        }
      } catch (error) {
        setErrorMessage("Error reading file. Please try again.")
        return
      }
    }

    if (!essayContent) {
      setErrorMessage("Please either upload a file or write your essay.")
      return
    }

    setErrorMessage("")
    setSubmissionResult(null)
    setIsLoading(true)

    try {
      // Create JSON payload matching your backend expectations
      const payload = {
        questions: [
          {
            type: "essay", // or "subjective" based on your backend logic
            question: `Write an essay on: ${selectedTopic}`,
            answer: essayContent,
          },
        ],
      }

      console.log("Submitting payload:", payload)

      const response = await axios.post("http://127.0.0.1:8000/api/evaluate/", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      console.log("Essay evaluation response:", response.data)

      // Navigate to feedback page with evaluation results
      navigate("/FeedBack", { state: { evaluation: response.data } })
    } catch (err) {
      console.error("Error submitting essay:", err)
      console.error("Response data:", err.response?.data)
      setErrorMessage("Submission failed. Please try again.")
      setIsLoading(false)
    }
  }

  // Handle file upload for complex file types (PDF, DOCX)
  const handleFileUpload = async (e) => {
    e.preventDefault()

    if (!selectedTopic) {
      setErrorMessage("Please select a topic.")
      return
    }

    if (!file) {
      setErrorMessage("Please upload a file.")
      return
    }

    setErrorMessage("")
    setSubmissionResult(null)
    setIsLoading(true)

    try {
      // Use FormData for file uploads (your backend handles this)
      const formData = new FormData()
      formData.append("file", file)
      // Add topic as metadata if needed by your backend
      formData.append("topic", selectedTopic)

      const response = await axios.post("http://127.0.0.1:8000/api/evaluate/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      console.log("Essay evaluation response:", response.data)

      // Navigate to feedback page with evaluation results
      navigate("/FeedBack", { state: { evaluation: response.data } })
    } catch (err) {
      console.error("Error submitting essay:", err)
      console.error("Response data:", err.response?.data)
      setErrorMessage("Submission failed. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="essay-container">
      <header className="essay-header">
        <h1>CSS Essay Test</h1>
        <h2>Competitive Exam for Federal Services</h2>
      </header>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {submissionResult && (
        <div className="submission-result">
          <h3>Submission Result</h3>
          <pre>{JSON.stringify(submissionResult, null, 2)}</pre>
        </div>
      )}

      <section className="topic-selection">
        <h3>Select a Topic:</h3>
        <div className="topic-list">
          {essayTopics.map((topic, index) => (
            <label key={index} className="topic-option">
              <input
                type="radio"
                name="essayTopic"
                value={topic}
                checked={selectedTopic === topic}
                onChange={() => setSelectedTopic(topic)}
              />
              <span className="topic-text">{topic}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="essay-input">
        <h3>Write Your Essay:</h3>
        <textarea
          value={userEssay}
          onChange={(e) => setUserEssay(e.target.value)}
          className="essay-textarea"
          placeholder="Write your essay here..."
          rows={15}
          disabled={isLoading}
        />
      </section>

      <section className="file-upload-section">
        <h3>Or Upload Essay File:</h3>
        <input
          type="file"
          accept=".txt,.pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="file-upload"
          disabled={isLoading}
        />
        {file && (
          <div className="file-info">
            <p>Selected file: {file.name}</p>
            <p className="file-type-info">
              {file.name.endsWith(".txt")
                ? "Text file will be processed as JSON"
                : "File will be uploaded for server-side processing"}
            </p>
          </div>
        )}
      </section>

      <div className="submission-section">
        <button
          onClick={handleSubmit}
          className="submit-button primary"
          disabled={isLoading || (!userEssay.trim() && !file)}
        >
          {isLoading ? "Submitting..." : "Submit Essay"}
        </button>
      </div>

      <footer className="essay-footer">
        <button className="btn-back" onClick={() => navigate("/Dashboard")} disabled={isLoading}>
          Back to Dashboard
        </button>
      </footer>
    </div>
  )
}

export default EssayTestPage
