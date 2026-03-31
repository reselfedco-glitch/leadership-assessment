import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

interface ResultsData {
  name: string
  email: string
  leadershipScore: number
  blockScores: {
    blockName: string
    percentage: number
    belief: string
  }[]
  topBlocks: string[]
}

export async function POST(request: Request) {
  try {
    const { to, subject, data } = await request.json() as {
      to: string
      subject: string
      data: ResultsData
    }

    const emailHtml = generateEmailHtml(data)

    if (resend) {
      // Send with Resend
      const { error } = await resend.emails.send({
        from: 'Reselfed Assessment <onboarding@resend.dev>',
        to: [to],
        subject: subject,
        html: emailHtml,
      })

      if (error) {
        console.error('Resend error:', error)
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
      }
    } else {
      // Fallback: log email when no API key configured
      console.log('[v0] Email would be sent to:', to)
      console.log('[v0] Subject:', subject)
      console.log('[v0] RESEND_API_KEY not configured - email logged only')
    }

    return NextResponse.json({ success: true, to })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}

function generateEmailHtml(data: ResultsData): string {
  const topBlocksList = data.topBlocks.length > 0 
    ? data.topBlocks.map(b => `<li style="margin-bottom: 8px;">${b}</li>`).join('')
    : '<li>No significant blocks identified</li>'

  const blockDetails = data.blockScores
    .map(bs => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${bs.blockName}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">
          <span style="color: ${bs.percentage >= 50 ? '#dc2626' : '#16a34a'}; font-weight: 600;">
            ${bs.percentage}%
          </span>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
          ${bs.percentage >= 50 ? 'Active - Needs Attention' : 'Aligned'}
        </td>
      </tr>
    `)
    .join('')

  const scoreCategory = data.leadershipScore >= 80 ? 'Emerging Leader' : 
    data.leadershipScore >= 60 ? 'Growing Influence' : 
    data.leadershipScore >= 40 ? 'Hidden Influence' : 
    'Foundational Stage'

  const scoreColor = data.leadershipScore >= 80 ? '#16a34a' : 
    data.leadershipScore >= 60 ? '#2563eb' : 
    data.leadershipScore >= 40 ? '#d97706' : 
    '#dc2626'

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <div style="text-align: center; margin-bottom: 32px;">
    <p style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; color: #6b21a8; margin: 0;">RESELFED</p>
    <p style="font-size: 12px; color: #6b7280; margin: 4px 0 0 0;">Leadership Identity Assessment</p>
  </div>

  <div style="background: linear-gradient(135deg, #6b21a8 0%, #0d9488 100%); color: white; padding: 32px; border-radius: 12px; text-align: center; margin-bottom: 24px;">
    <h1 style="margin: 0 0 8px 0; font-size: 24px;">Leadership Assessment Results</h1>
    <p style="margin: 0; font-size: 16px; opacity: 0.9;">for ${data.name}</p>
  </div>

  <div style="background: #f9fafb; padding: 24px; border-radius: 12px; text-align: center; margin-bottom: 24px;">
    <p style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; margin: 0 0 8px 0;">Leadership Identity Score</p>
    <p style="font-size: 48px; font-weight: 700; color: ${scoreColor}; margin: 0;">${data.leadershipScore}</p>
    <p style="font-size: 14px; color: #6b7280; margin: 8px 0 0 0;">out of 100</p>
    <div style="margin-top: 16px; padding: 8px 16px; background: white; border-radius: 20px; display: inline-block;">
      <span style="font-weight: 600; color: ${scoreColor};">${scoreCategory}</span>
    </div>
  </div>

  ${data.topBlocks.length > 0 ? `
  <div style="background: #fef2f2; border: 1px solid #fecaca; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
    <h2 style="margin: 0 0 16px 0; font-size: 18px; color: #991b1b;">Active Blocks Requiring Attention</h2>
    <ul style="margin: 0; padding-left: 20px; color: #7f1d1d;">
      ${topBlocksList}
    </ul>
  </div>
  ` : `
  <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
    <h2 style="margin: 0 0 8px 0; font-size: 18px; color: #166534;">Strong Leadership Alignment</h2>
    <p style="margin: 0; color: #15803d;">No significant blocks identified. Your beliefs support leadership behavior.</p>
  </div>
  `}

  <div style="margin-bottom: 24px;">
    <h2 style="font-size: 18px; margin: 0 0 16px 0;">Detailed Block Analysis</h2>
    <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <thead>
        <tr style="background: #f3f4f6;">
          <th style="padding: 12px; text-align: left; font-size: 14px;">Block</th>
          <th style="padding: 12px; text-align: center; font-size: 14px;">Score</th>
          <th style="padding: 12px; text-align: left; font-size: 14px;">Status</th>
        </tr>
      </thead>
      <tbody>
        ${blockDetails}
      </tbody>
    </table>
  </div>

  ${data.topBlocks.length > 0 ? `
  <div style="background: #faf5ff; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
    <h2 style="font-size: 18px; margin: 0 0 16px 0; color: #6b21a8;">Beliefs to Challenge with Your Coach</h2>
    ${data.blockScores
      .filter(bs => bs.percentage >= 50)
      .map(bs => `
        <div style="background: white; padding: 16px; border-radius: 8px; margin-bottom: 12px; border-left: 4px solid #6b21a8;">
          <p style="font-weight: 600; margin: 0 0 4px 0; color: #1f2937;">${bs.blockName}</p>
          <p style="margin: 0; font-style: italic; color: #6b7280;">"${bs.belief}"</p>
        </div>
      `)
      .join('')}
  </div>
  ` : ''}

  <div style="text-align: center; padding: 24px; border-top: 1px solid #e5e7eb; margin-top: 32px;">
    <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; margin: 0 0 8px 0;">CONFIDENTIAL</p>
    <p style="font-size: 14px; font-weight: 600; color: #6b21a8; margin: 0;">Reselfed Leadership Identity Assessment</p>
    <p style="font-size: 12px; color: #9ca3af; margin: 8px 0 0 0;">Assessment completed on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
  </div>

</body>
</html>
`
}
