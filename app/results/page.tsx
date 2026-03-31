'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import Link from 'next/link'

interface Result {
  id: string
  respondent_name: string
  respondent_email?: string
  scores: Record<string, number>
  total_score: number
  created_at: string
}

export default function Results() {
  const searchParams = useSearchParams()
  const resultId = searchParams.get('id') || localStorage.getItem('lastResultId')
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    if (!resultId) {
      setError('No result found. Please complete the assessment first.')
      setLoading(false)
      return
    }

    const fetchResult = async () => {
      try {
        const response = await fetch(`/api/results?id=${resultId}`)
        if (!response.ok) {
          throw new Error('Result not found')
        }
        const data = await response.json()
        setResult(data)
      } catch (err) {
        setError('Failed to load results')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchResult()
  }, [resultId])

  const downloadPDF = async () => {
    if (!result) return

    setDownloading(true)
    try {
      const element = document.getElementById('results-content')
      if (!element) return

      const canvas = await html2canvas(element, { scale: 2 })
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      const imgData = canvas.toDataURL('image/png')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = pdfWidth - 20
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      let heightLeft = imgHeight
      let position = 10

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
      heightLeft -= pdfHeight - 20

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight + 10
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight)
        heightLeft -= pdfHeight - 20
      }

      pdf.save(`leadership-assessment-${result.respondent_name.replace(/\s+/g, '-')}.pdf`)
    } catch (err) {
      console.error('Error generating PDF:', err)
    } finally {
      setDownloading(false)
    }
  }

  if (loading) {
    return (
      <main>
        <div className="assessment-container" style={{ textAlign: 'center' }}>
          <p>Loading your results...</p>
        </div>
      </main>
    )
  }

  if (error || !result) {
    return (
      <main>
        <div className="assessment-container">
          <div className="error">{error}</div>
          <Link href="/">
            <button>Take the Assessment</button>
          </Link>
        </div>
      </main>
    )
  }

  const maxScore = 4
  const categoryScores = Object.entries(result.scores).map(([category, score]) => ({
    category,
    score,
    percentage: (score / maxScore) * 100
  }))

  return (
    <main>
      <div className="header">
        <h1>📊 Your Leadership Assessment Results</h1>
        <p>Detailed breakdown of your leadership profile</p>
      </div>

      <div className="results-container" id="results-content" style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ marginBottom: '10px' }}>👤 Respondent Information</h2>
          <p><strong>Name:</strong> {result.respondent_name}</p>
          {result.respondent_email && <p><strong>Email:</strong> {result.respondent_email}</p>}
          <p><strong>Assessment Date:</strong> {new Date(result.created_at).toLocaleDateString()}</p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ marginBottom: '20px' }}>Overall Score</h2>
          <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#007bff', marginBottom: '10px' }}>
            {result.total_score.toFixed(1)} / {(maxScore * Object.keys(result.scores).length).toFixed(1)}
          </div>
          <div className="progress-bar" style={{ height: '20px', marginBottom: '20px' }}>
            <div 
              className="progress-fill" 
              style={{ 
                width: `${(result.total_score / (maxScore * Object.keys(result.scores).length)) * 100}%`,
                background: '#007bff'
              }} 
            />
          </div>
        </div>

        <div>
          <h2 style={{ marginBottom: '20px' }}>Leadership Dimensions</h2>
          {categoryScores.map((item) => (
            <div key={item.category} className="result-item">
              <h4>{item.category}</h4>
              <p style={{ marginBottom: '8px' }}>Score: <strong>{item.score.toFixed(1)}</strong> / {maxScore.toFixed(1)}</p>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0f7ff', borderRadius: '6px' }}>
          <h3>📌 Next Steps</h3>
          <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
            <li>Identify your top 2-3 strengths and leverage them more</li>
            <li>Select one area for development and create an action plan</li>
            <li>Share results with your coach or mentor for perspective</li>
            <li>Revisit this assessment in 6 months to track progress</li>
          </ul>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
        <button onClick={downloadPDF} disabled={downloading}>
          {downloading ? 'Generating PDF...' : '📥 Download as PDF'}
        </button>
        <Link href="/">
          <button>Take Another Assessment</button>
        </Link>
      </div>
    </main>
  )
}
