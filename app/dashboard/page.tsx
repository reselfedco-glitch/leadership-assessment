'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface DashboardResult {
  id: string
  respondent_name: string
  respondent_email?: string
  total_score: number
  created_at: string
}

export default function Dashboard() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [results, setResults] = useState<DashboardResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/results', {
        headers: {
          'x-password': password
        }
      })

      if (!response.ok) {
        throw new Error('Invalid password')
      }

      const data = await response.json()
      setResults(data)
      setAuthenticated(true)
    } catch (err) {
      setError('Invalid password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!authenticated) {
    return (
      <main>
        <div className="header">
          <h1>🔐 Dashboard Login</h1>
        </div>
        <div className="assessment-container" style={{ maxWidth: '400px', margin: '0 auto' }}>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Dashboard Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p style={{ marginTop: '20px', textAlign: 'center' }}>
            <Link href="/" style={{ color: '#007bff', textDecoration: 'none' }}>
              Back to Assessment
            </Link>
          </p>
        </div>
      </main>
    )
  }

  return (
    <main>
      <div className="header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>📊 Assessment Results Dashboard</h1>
            <p>Viewing all submitted assessments</p>
          </div>
          <Link href="/">
            <button>Back to Assessment</button>
          </Link>
        </div>
      </div>

      <div className="dashboard">
        <div style={{ marginBottom: '20px' }}>
          <p style={{ color: '#666' }}>Total Submissions: <strong>{results.length}</strong></p>
        </div>

        {results.length === 0 ? (
          <div className="assessment-container" style={{ textAlign: 'center' }}>
            <p>No assessments submitted yet.</p>
          </div>
        ) : (
          <table className="results-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Overall Score</th>
                <th>Submitted</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id}>
                  <td>{result.respondent_name}</td>
                  <td>{result.respondent_email || '-'}</td>
                  <td style={{ fontWeight: 'bold', color: '#007bff' }}>
                    {result.total_score.toFixed(1)}
                  </td>
                  <td>{new Date(result.created_at).toLocaleDateString()}</td>
                  <td>
                    <Link href={`/results?id=${result.id}`}>
                      <button style={{ padding: '8px 16px', fontSize: '14px' }}>
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  )
}
