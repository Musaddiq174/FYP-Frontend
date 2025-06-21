"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const SubjectiveTest = () => {
  const [answers, setAnswers] = useState({}) // Store text answers
  const [uploads, setUploads] = useState({}) // Store file uploads
  const [subjectiveQuestions, setSubjectiveQuestions] = useState([]) // Store API questions
  const [loading, setLoading] = useState(true) // Track API loading state
  const [error, setError] = useState(null) // Track API errors
  const navigate = useNavigate()

  // Fetch questions from backend API
  const fetchPartAQuestions = async () => {
    try {
      setLoading(true)
      setError(null) // Clear previous errors
      const response = await axios.post("http://127.0.0.1:8000/api/generate-subjective/")
      console.log("API Response:", response.data) // Debug: Log response
      // Normalize API response to match frontend structure
      const questions = Array.isArray(response.data.subjective_test)
        ? response.data.subjective_test.map((q) => ({
            id: q.id,
            marks: q.marks,
            question: q.section, // Use section as question title (e.g., "Precis Writing")
            description: q.Question, // Use Question as description text
            subQuestions: q.sub_section
              ? q.sub_section.map((sub) => ({
                  id: sub.sub_id,
                  text: sub.Question,
                  marks: sub.marks,
                }))
              : undefined,
          }))
        : []
      setSubjectiveQuestions(questions)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching questions:", err)
      setError(`Failed to load questions: ${err.message}`)
      setLoading(false)
    }
  }

  // Fetch questions on component mount
  useEffect(() => {
    fetchPartAQuestions()
  }, [])

  // Update answer state for text inputs
  const handleInputChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }

  // Update upload state for files
  const handleFileUpload = (id, file) => {
    setUploads((prev) => ({ ...prev, [id]: file }))
  }

  // Validate and submit test
  const handleSubmit = async () => {
    const unanswered = subjectiveQuestions.flatMap((q) => {
      if (q.subQuestions) {
        return q.subQuestions
          .filter((subQ) => (!answers[subQ.id] || answers[subQ.id].trim() === "") && !uploads[subQ.id])
          .map((subQ) => subQ.id)
      }
      return (!answers[q.id] || answers[q.id].trim() === "") && !uploads[q.id] ? [q.id] : []
    })

    if (unanswered.length > 0) {
      setError(`Please answer all questions or upload files. Missing: ${unanswered.join(", ")}`)
      return
    }

    setError(null)
    setLoading(true)

    try {
      // Check if we have any file uploads
      const hasFileUploads = Object.values(uploads).some((file) => file !== null && file !== undefined)

      if (hasFileUploads) {
        // If there are file uploads, use FormData approach
        await handleFormDataSubmission()
      } else {
        // If only text answers, use JSON approach
        await handleJsonSubmission()
      }
    } catch (err) {
      console.error("Error evaluating test:", err)
      console.error("Response data:", err.response?.data) // Log server response
      setError(`Failed to evaluate test: ${err.response?.data?.detail || err.message}`)
      setLoading(false)
    }
  }

  // Handle JSON submission for text-only answers
  const handleJsonSubmission = async () => {
    const questionsData = []

    // Process all questions and sub-questions
    subjectiveQuestions.forEach((q) => {
      if (q.subQuestions) {
        q.subQuestions.forEach((subQ) => {
          if (answers[subQ.id]) {
            questionsData.push({
              type: "subjective",
              question: `${q.question} - ${subQ.text}`,
              answer: answers[subQ.id],
              marks: subQ.marks,
            })
          }
        })
      } else {
        if (answers[q.id]) {
          questionsData.push({
            type: "subjective",
            question: q.question,
            answer: answers[q.id],
            marks: q.marks,
          })
        }
      }
    })

    const payload = {
      questions: questionsData,
    }

    console.log("Submitting JSON payload:", payload)

    const response = await axios.post("http://127.0.0.1:8000/api/evaluate/", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    // Navigate to feedback page with evaluation results
    navigate("/FeedBack", { state: { evaluation: response.data } })
  }

  // Handle FormData submission for mixed text and file answers
  const handleFormDataSubmission = async () => {
    const questionsData = []

    // Process text answers first
    subjectiveQuestions.forEach((q) => {
      if (q.subQuestions) {
        q.subQuestions.forEach((subQ) => {
          if (answers[subQ.id]) {
            questionsData.push({
              type: "subjective",
              question: `${q.question} - ${subQ.text}`,
              answer: answers[subQ.id],
              marks: subQ.marks,
            })
          }
        })
      } else {
        if (answers[q.id]) {
          questionsData.push({
            type: "subjective",
            question: q.question,
            answer: answers[q.id],
            marks: q.marks,
          })
        }
      }
    })

    // Handle file uploads separately
    const fileUploads = Object.entries(uploads).filter(([_, file]) => file)

    if (fileUploads.length > 0) {
      // Submit files one by one or handle as needed by your backend
      for (const [questionId, file] of fileUploads) {
        const formData = new FormData()
        formData.append("file", file)

        // Find the question for this file
        const question = subjectiveQuestions.find((q) => {
          if (q.id === questionId) return q
          if (q.subQuestions) {
            return q.subQuestions.find((subQ) => subQ.id === questionId)
          }
          return null
        })

        if (question) {
          formData.append("question", question.question || question.text)
        }

        const response = await axios.post("http://127.0.0.1:8000/api/evaluate/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        // You might want to collect all responses and then navigate
        console.log("File upload response:", response.data)
      }
    }

    // If we have text answers, submit them as JSON
    if (questionsData.length > 0) {
      const payload = { questions: questionsData }
      const response = await axios.post("http://127.0.0.1:8000/api/evaluate/", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      // Navigate to feedback page with evaluation results
      navigate("/FeedBack", { state: { evaluation: response.data } })
    } else {
      // If only files were uploaded, navigate after file processing
      navigate("/FeedBack", { state: { evaluation: { message: "Files submitted successfully" } } })
    }
  }

  // Render loading or error states
  if (loading) return <div>Loading questions...</div>
  if (error)
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={fetchPartAQuestions}>Retry</button>
      </div>
    )

  return (
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
          <li>Text answers will be submitted as JSON, files will be uploaded separately.</li>
        </ul>
      </section>

      <section className="questions">
        {subjectiveQuestions.map((q) => (
          <div key={q.id} className="question">
            <h4>
              {q.id}. {q.question} ({q.marks} Marks)
            </h4>
            <p dangerouslySetInnerHTML={{ __html: q.description }} />
            {q.subQuestions ? (
              <ol>
                {q.subQuestions.map((subQ) => (
                  <li key={subQ.id}>
                    <label>{subQ.text}</label>
                    <textarea
                      rows={4}
                      placeholder="Write your answer here..."
                      value={answers[subQ.id] || ""}
                      onChange={(e) => handleInputChange(subQ.id, e.target.value)}
                    />
                    <label className="upload-label">Upload your answer:</label>
                    <input
                      type="file"
                      accept="image/*,.pdf,.txt,.doc,.docx"
                      className="custom-file-input"
                      onChange={(e) => handleFileUpload(subQ.id, e.target.files[0])}
                    />
                    {uploads[subQ.id] && <p className="file-info">Selected: {uploads[subQ.id].name}</p>}
                  </li>
                ))}
              </ol>
            ) : (
              <>
                <textarea
                  rows={6}
                  placeholder="Write your answer here..."
                  value={answers[q.id] || ""}
                  onChange={(e) => handleInputChange(q.id, e.target.value)}
                />
                <label className="upload-label">Upload your answer:</label>
                <input
                  type="file"
                  accept="image/*,.pdf,.txt,.doc,.docx"
                  className="custom-file-input"
                  onChange={(e) => handleFileUpload(q.id, e.target.files[0])}
                />
                {uploads[q.id] && <p className="file-info">Selected: {uploads[q.id].name}</p>}
              </>
            )}
          </div>
        ))}
      </section>

      <footer className="subjective-footer">
        <button className="submit-button" onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit Test"}
        </button>
        <button className="btn-back" onClick={() => navigate("/Dashboard")} disabled={loading}>
          Back
        </button>
      </footer>
    </div>
  )
}

export default SubjectiveTest
