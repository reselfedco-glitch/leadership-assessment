'use client'

import { useState, useEffect } from 'react'
import { QUESTIONS } from '@/lib/questions'
import Link from 'next/link'

interface Answers {
  [key: string]: number
}

export default function Assessment() {
  const [answers, setAnswers] = useState<Answers>({})
  const [respondentName, setRespondentName] = useState('')
  const [respondentEmail, setRespondentEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleAnswer = (questionId: string, score: number) => {
    setAnswers({
      ...answers,
      [questionId]: score
    })
  }

  const calculateScores = () => {
    const categoryScores: Record<string, number[]> = {}
    
    QUESTIONS.forEach(question => {
      if (!categoryScores[question.category]) {
        categoryScores[question.category] = []
      }
      categoryScores[question.category].push(answers[question.id] || 0)
    })

    const scores: Record<string, number> = {}
    let totalScore = 0

    Object.entries(categoryScores).forEach(([category, scores_arr]) => {
      const avg = scores_arr.reduce((a, b) => a + b, 0) / scores_arr.length
      scores[category] = Math.round(avg * 10) / 10
      totalScore += scores[category]
    })

    return { scores, totalScore }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (Object.keys(answers).length !== QUESTIONS.length) {
      setError('Please answer all questions before submitting')
      return
    }

    if (!respondentName.trim()) {
      setError('Please enter your name')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { scores, totalScore } = calculateScores()

      const response = await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          respondent_name: respondentName,
          respondent_email: respondentEmail,
          scores,
          total_score: totalScore
        })
      })

      if (!response.ok) {
        throw new Error('Failed to submit assessment')
      }

      const result = await response.json()
      localStorage.setItem('lastResultId', result.id)
      setSubmitted(true)
    } catch (err) {
      setError('Error submitting assessment. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="assessment-container" style={{ textAlign: 'center' }}>
        <h2>Assessment Submitted Successfully!</h2>
        <p style={{ marginTop: '20px', marginBottom: '30px' }}>
          Your leadership assessment has been recorded.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <Link href="/results">
            <button>View Your Results</button>
          </Link>
        </div>
      </div>
    )
  }

  const progressPercentage = (Object.keys(answers).length / QUESTIONS.length) * 100

  return (
    <div>
      <div className="header">
        <h1>🎯 Leadership Identity Assessment</h1>
        <p>Discover how others perceive you based on your actions and behaviors</p>
      </div>

      <main>
        <div className="assessment-container">
          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '30px' }}>
              <div className="input-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  value={respondentName}
                  onChange={(e) => setRespondentName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="input-group">
                <label>Your Email (optional)</label>
                <input
                  type="email"
                  value={respondentEmail}
                  onChange={(e) => setRespondentEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>Progress: {Object.keys(answers).length} / {QUESTIONS.length}</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progressPercentage}%` }} />
              </div>
            </div>

            {QUESTIONS.map((question) => (
              <div key={question.id} className="question-item">
                <h3>
                  {question.id.toUpperCase()} - {question.text}
                </h3>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                  {question.category}
                </p>
                <div className="options">
                  {question.options.map((option, index) => (
                    <label key={index} className="option">
                      <input
                        type="radio"
                        name={question.id}
                        value={question.scores[index]}
                        checked={answers[question.id] === question.scores[index]}
                        onChange={(e) => handleAnswer(question.id, question.scores[index])}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="button-group">
              <button type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Assessment'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
