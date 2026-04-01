"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Search,
  ChevronDown,
  ChevronUp,
  LogOut,
  Download,
  Mail,
  Eye,
  Brain,
  Briefcase,
  Target,
  CheckCircle2,
  Lightbulb,
  TrendingDown,
  UserCircle,
  ChevronRight
} from "lucide-react"
import { useRouter } from "next/navigation"
import { blocks as allBlocks, type Block } from "@/lib/assessment-data"

interface BlockScore {
  blockName: string
  percentage: number
  belief: string
}

interface AssessmentResult {
  id: string
  name: string
  email: string | null
  leadership_score: number
  block_scores: BlockScore[]
  top_blocks: string[]
  created_at: string
}

interface AdminDashboardProps {
  results: AssessmentResult[]
  userEmail: string
}

function getFullBlock(blockName: string): Block | undefined {
  return allBlocks.find(b => b.name === blockName)
}

function getScoreLabel(score: number) {
  if (score >= 80) return "Emerging Leader"
  if (score >= 60) return "Growing Influence"
  if (score >= 40) return "Hidden Influence"
  return "Foundational"
}

function getScoreColor(score: number) {
  if (score >= 80) return "text-green-600"
  if (score >= 60) return "text-blue-600"
  if (score >= 40) return "text-amber-600"
  return "text-red-600"
}

function getScoreDescription(name: string, score: number) {
  if (score >= 80) return `${name} already thinks and operates like a leader. Blocks are minimal.`
  if (score >= 60) return `${name} shows leadership traits but certain blocks hold them back.`
  if (score >= 40) return `${name} has several blocks limiting their leadership identity.`
  return `${name} has significant blocks preventing them from seeing themselves as a leader.`
}

async function generatePDFForResult(result: AssessmentResult) {
  const { default: jsPDF } = await import('jspdf')
  const pdf = new jsPDF('p', 'mm', 'a4')
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 20
  const contentWidth = pageWidth - (margin * 2)
  let yPos = margin

  const addNewPageIfNeeded = (requiredSpace: number) => {
    if (yPos + requiredSpace > pageHeight - margin) {
      pdf.addPage()
      yPos = margin
    }
  }

  const addWrappedText = (text: string, x: number, maxWidth: number, fontSize: number, r: number, g: number, b: number, style: string = 'normal') => {
    pdf.setFontSize(fontSize)
    pdf.setTextColor(r, g, b)
    if (style === 'bold') pdf.setFont('helvetica', 'bold')
    else if (style === 'italic') pdf.setFont('helvetica', 'italic')
    else pdf.setFont('helvetica', 'normal')
    const lines = pdf.splitTextToSize(text, maxWidth)
    const lineHeight = fontSize * 0.45
    lines.forEach((line: string) => {
      addNewPageIfNeeded(lineHeight + 2)
      pdf.text(line, x, yPos)
      yPos += lineHeight
    })
    pdf.setFont('helvetica', 'normal')
  }

  const addLabel = (text: string, color: [number, number, number] = [120, 120, 120]) => {
    addNewPageIfNeeded(8)
    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(...color)
    pdf.text(text.toUpperCase(), margin + 5, yPos)
    pdf.setFont('helvetica', 'normal')
    yPos += 5
  }

  const addSectionHeader = (text: string) => {
    addNewPageIfNeeded(15)
    yPos += 8
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(60, 60, 60)
    pdf.text(text, margin, yPos)
    pdf.setFont('helvetica', 'normal')
    yPos += 3
    pdf.setDrawColor(90, 50, 150)
    pdf.setLineWidth(0.5)
    pdf.line(margin, yPos, margin + 40, yPos)
    yPos += 8
  }

  // Header
  pdf.setFontSize(9)
  pdf.setTextColor(128, 128, 128)
  pdf.text('RESELFED — ADMIN REPORT', margin, yPos)
  pdf.text('Leadership Identity Assessment', pageWidth - margin, yPos, { align: 'right' })
  yPos += 15

  // Title
  pdf.setFontSize(22)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(60, 60, 60)
  pdf.text(`${result.name}'s Assessment Results`, margin, yPos)
  pdf.setFont('helvetica', 'normal')
  yPos += 8
  pdf.setFontSize(10)
  pdf.setTextColor(120, 120, 120)
  pdf.text(`Email: ${result.email || 'Not provided'} • Date: ${new Date(result.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`, margin, yPos)
  yPos += 12

  // Score
  const label = getScoreLabel(result.leadership_score)
  pdf.setFillColor(245, 245, 250)
  pdf.roundedRect(margin, yPos, contentWidth, 30, 3, 3, 'F')
  pdf.setFontSize(28)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(90, 50, 150)
  pdf.text(`${result.leadership_score}`, margin + 10, yPos + 20)
  pdf.setFontSize(11)
  pdf.setTextColor(130, 130, 130)
  pdf.text('/ 100', margin + 36, yPos + 20)
  pdf.setFontSize(13)
  pdf.setTextColor(60, 60, 60)
  pdf.text(label, margin + 60, yPos + 14)
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(9)
  pdf.setTextColor(100, 100, 100)
  pdf.text(getScoreDescription(result.name, result.leadership_score), margin + 60, yPos + 22)
  yPos += 40

  // Block Summary
  addSectionHeader('Block Summary')
  result.block_scores?.forEach((bs) => {
    addNewPageIfNeeded(14)
    const isHigh = bs.percentage >= 50
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(60, 60, 60)
    pdf.text(bs.blockName, margin, yPos)
    pdf.setTextColor(isHigh ? 180 : 90, isHigh ? 80 : 130, isHigh ? 80 : 90)
    pdf.text(`${bs.percentage}%`, pageWidth - margin, yPos, { align: 'right' })
    pdf.setFont('helvetica', 'normal')
    yPos += 4
    pdf.setFillColor(230, 230, 240)
    pdf.roundedRect(margin, yPos, contentWidth, 3, 1, 1, 'F')
    pdf.setFillColor(isHigh ? 220 : 90, isHigh ? 100 : 130, isHigh ? 100 : 180)
    pdf.roundedRect(margin, yPos, contentWidth * (bs.percentage / 100), 3, 1, 1, 'F')
    yPos += 9
  })

  // Detailed Blocks
  addSectionHeader('Detailed Block Analysis')
  result.block_scores?.forEach((bs) => {
    const fullBlock = getFullBlock(bs.blockName)
    if (!fullBlock) return

    const isHigh = bs.percentage >= 50
    addNewPageIfNeeded(40)

    pdf.setFillColor(isHigh ? 255 : 245, isHigh ? 248 : 250, isHigh ? 248 : 255)
    pdf.roundedRect(margin, yPos, contentWidth, 12, 2, 2, 'F')
    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(60, 60, 60)
    pdf.text(bs.blockName, margin + 5, yPos + 8)
    pdf.setTextColor(isHigh ? 180 : 90, isHigh ? 80 : 130, isHigh ? 80 : 90)
    pdf.text(`${bs.percentage}%`, pageWidth - margin - 5, yPos + 8, { align: 'right' })
    pdf.setFont('helvetica', 'normal')
    yPos += 17

    addLabel(isHigh ? 'CURRENT BELIEF' : 'BELIEF')
    addWrappedText(`"${isHigh ? fullBlock.belief : fullBlock.strength.belief}"`, margin + 5, contentWidth - 10, 9, 80, 80, 80, 'italic')
    yPos += 3

    if (isHigh) {
      addLabel('IDENTITY', [180, 80, 80])
      addWrappedText(`${fullBlock.identity.label}: ${fullBlock.identity.description}`, margin + 5, contentWidth - 10, 9, 100, 100, 100)
      yPos += 3

      addLabel('HOW COLLEAGUES SEE THEM')
      addWrappedText(fullBlock.perceptionDetails.howColleaguesSeeYou, margin + 5, contentWidth - 10, 9, 100, 100, 100)
      yPos += 3

      addLabel('HOW LEADERSHIP SEES THEM')
      addWrappedText(fullBlock.perceptionDetails.howLeadershipSeesYou, margin + 5, contentWidth - 10, 9, 100, 100, 100)
      yPos += 3

      addLabel('CAREER IMPACT')
      addWrappedText(fullBlock.perceptionDetails.careerImpact, margin + 5, contentWidth - 10, 9, 100, 100, 100)
      yPos += 3

      addLabel('BELIEF TO CHALLENGE', [180, 80, 80])
      addWrappedText(`"${fullBlock.coaching.beliefToChallenge}"`, margin + 5, contentWidth - 10, 9, 180, 80, 80, 'italic')
      yPos += 3

      addLabel('COACHING DISCUSSION TOPICS')
      fullBlock.coaching.discussWithCoach.forEach((topic) => {
        addNewPageIfNeeded(8)
        pdf.setFontSize(9)
        pdf.setTextColor(100, 100, 100)
        pdf.text('▸', margin + 5, yPos)
        const topicLines = pdf.splitTextToSize(topic, contentWidth - 18)
        pdf.text(topicLines, margin + 12, yPos)
        yPos += topicLines.length * 4 + 2
      })
      yPos += 2

      addLabel('NEW BELIEF TO ADOPT', [90, 50, 150])
      addWrappedText(`"${fullBlock.coaching.newBeliefToAdopt}"`, margin + 5, contentWidth - 10, 9, 90, 50, 150, 'bold')
      yPos += 3

      addLabel('ACTIONS TO PRACTICE')
      fullBlock.changeActions.forEach((action) => {
        addNewPageIfNeeded(8)
        pdf.setFontSize(9)
        pdf.setTextColor(100, 100, 100)
        pdf.text('✓', margin + 5, yPos)
        const lines = pdf.splitTextToSize(action, contentWidth - 18)
        pdf.text(lines, margin + 12, yPos)
        yPos += lines.length * 4 + 2
      })
    } else {
      addLabel('STRENGTH', [90, 130, 90])
      addWrappedText(`${fullBlock.strength.label}: ${fullBlock.strength.description}`, margin + 5, contentWidth - 10, 9, 100, 100, 100)
      yPos += 3

      addLabel('HOW COLLEAGUES SEE THEM')
      addWrappedText(fullBlock.strength.howColleaguesSeeYou, margin + 5, contentWidth - 10, 9, 100, 100, 100)
      yPos += 3

      addLabel('HOW LEADERSHIP SEES THEM')
      addWrappedText(fullBlock.strength.howLeadershipSeesYou, margin + 5, contentWidth - 10, 9, 100, 100, 100)
      yPos += 3
    }

    yPos += 3
    pdf.setDrawColor(220, 220, 220)
    pdf.setLineWidth(0.3)
    pdf.line(margin, yPos, pageWidth - margin, yPos)
    yPos += 5
  })

  // Footer
  addNewPageIfNeeded(20)
  yPos += 10
  pdf.setDrawColor(200, 200, 200)
  pdf.line(margin, yPos, pageWidth - margin, yPos)
  yPos += 8
  pdf.setFontSize(8)
  pdf.setTextColor(150, 150, 150)
  pdf.text('CONFIDENTIAL — ADMIN REPORT', pageWidth / 2, yPos, { align: 'center' })
  yPos += 4
  pdf.text(`Reselfed Leadership Identity Assessment • Generated ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`, pageWidth / 2, yPos, { align: 'center' })

  pdf.save(`${result.name}-assessment-report.pdf`)
}

export function AdminDashboard({ results, userEmail }: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedResult, setExpandedResult] = useState<string | null>(null)
  const [detailedView, setDetailedView] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"date" | "score">("date")
  const [generatingPDF, setGeneratingPDF] = useState<string | null>(null)
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin-logout', { method: 'POST' })
    router.push("/admin/login")
  }

  const handleDownloadPDF = async (result: AssessmentResult) => {
    setGeneratingPDF(result.id)
    try {
      await generatePDFForResult(result)
    } catch (e) {
      console.error('PDF generation failed:', e)
    } finally {
      setGeneratingPDF(null)
    }
  }

  const filteredResults = results.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.email && r.email.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const sortedResults = [...filteredResults].sort((a, b) => {
    if (sortBy === "score") return b.leadership_score - a.leadership_score
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  const totalAssessments = results.length
  const avgScore = results.length > 0 
    ? Math.round(results.reduce((acc, r) => acc + r.leadership_score, 0) / results.length) : 0
  const highBlockCount = results.filter(r => r.top_blocks && r.top_blocks.length > 0).length

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit"
  })

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Reselfed Admin</h1>
            <p className="text-sm text-muted-foreground">Assessment Results Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{userEmail}</span>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg"><Users className="w-6 h-6 text-primary" /></div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Assessments</p>
                  <p className="text-2xl font-bold text-foreground">{totalAssessments}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg"><TrendingUp className="w-6 h-6 text-blue-500" /></div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <p className="text-2xl font-bold text-foreground">{avgScore}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-500/10 rounded-lg"><AlertTriangle className="w-6 h-6 text-amber-500" /></div>
                <div>
                  <p className="text-sm text-muted-foreground">With High Blocks</p>
                  <p className="text-2xl font-bold text-foreground">{highBlockCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by name or email..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Button variant={sortBy === "date" ? "default" : "outline"} size="sm" onClick={() => setSortBy("date")}>Recent</Button>
                <Button variant={sortBy === "score" ? "default" : "outline"} size="sm" onClick={() => setSortBy("score")}>By Score</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader><CardTitle>Assessment Results ({sortedResults.length})</CardTitle></CardHeader>
          <CardContent className="p-0">
            {sortedResults.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                {searchQuery ? "No results match your search" : "No assessments yet"}
              </div>
            ) : (
              <div className="divide-y divide-border">
                {sortedResults.map((result) => {
                  const isExpanded = expandedResult === result.id
                  const isDetailed = detailedView === result.id

                  return (
                    <div key={result.id} className="p-4">
                      <button onClick={() => { setExpandedResult(isExpanded ? null : result.id); setDetailedView(null) }} className="w-full flex items-center justify-between text-left">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-lg font-semibold text-primary">{result.name.charAt(0).toUpperCase()}</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-foreground truncate">{result.name}</p>
                            <p className="text-sm text-muted-foreground truncate">{result.email || "No email provided"}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 flex-shrink-0">
                          <div className="text-right hidden sm:block">
                            <p className={`text-lg font-bold ${getScoreColor(result.leadership_score)}`}>{result.leadership_score}</p>
                            <p className="text-xs text-muted-foreground">{getScoreLabel(result.leadership_score)}</p>
                          </div>
                          <div className="text-right hidden md:block">
                            <p className="text-sm text-muted-foreground">{formatDate(result.created_at)}</p>
                          </div>
                          {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-border">
                          {/* Summary View */}
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <p className="text-sm font-semibold text-muted-foreground mb-3">SCORE BREAKDOWN</p>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-foreground">Leadership Score</span>
                                  <span className={`font-bold ${getScoreColor(result.leadership_score)}`}>{result.leadership_score}/100</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-foreground">Classification</span>
                                  <span className="text-sm font-medium text-foreground">{getScoreLabel(result.leadership_score)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-foreground">Active Blocks</span>
                                  <span className="text-sm font-medium text-foreground">{result.top_blocks?.length || 0}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-muted-foreground mb-3">BLOCK SCORES</p>
                              <div className="space-y-2">
                                {result.block_scores?.map((block, idx) => (
                                  <div key={idx}>
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-sm text-foreground">{block.blockName}</span>
                                      <span className={`text-sm font-medium ${block.percentage >= 50 ? 'text-destructive' : 'text-muted-foreground'}`}>{block.percentage}%</span>
                                    </div>
                                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                                      <div className={`h-full rounded-full ${block.percentage >= 50 ? 'bg-destructive' : 'bg-primary'}`} style={{ width: `${block.percentage}%` }} />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Coaching Focus Areas */}
                          {result.top_blocks && result.top_blocks.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-border">
                              <p className="text-sm font-semibold text-muted-foreground mb-2">COACHING FOCUS AREAS</p>
                              <div className="flex flex-wrap gap-2">
                                {result.top_blocks.map((block, idx) => (
                                  <span key={idx} className="px-3 py-1 bg-destructive/10 text-destructive text-sm rounded-full">{block}</span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Detailed View Toggle */}
                          <div className="mt-4 pt-4 border-t border-border">
                            <Button variant="outline" size="sm" onClick={() => setDetailedView(isDetailed ? null : result.id)} className="gap-2 mb-4">
                              <Eye className="w-4 h-4" />
                              {isDetailed ? 'Hide Detailed Results' : 'View Detailed Results'}
                            </Button>

                            {isDetailed && (
                              <div className="space-y-6 mt-4">
                                <p className="text-sm text-muted-foreground">{getScoreDescription(result.name, result.leadership_score)}</p>

                                {result.block_scores?.map((bs, idx) => {
                                  const fullBlock = getFullBlock(bs.blockName)
                                  if (!fullBlock) return null
                                  const isHigh = bs.percentage >= 50

                                  return (
                                    <Card key={idx} className={`border ${isHigh ? 'border-destructive/30' : 'border-primary/30'}`}>
                                      <CardContent className="p-5 space-y-4">
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-3">
                                            {isHigh ? <AlertTriangle className="w-5 h-5 text-destructive" /> : <CheckCircle2 className="w-5 h-5 text-primary" />}
                                            <h4 className="font-semibold text-foreground">{bs.blockName}</h4>
                                          </div>
                                          <span className={`text-sm font-bold ${isHigh ? 'text-destructive' : 'text-primary'}`}>{bs.percentage}%</span>
                                        </div>

                                        <p className="text-sm text-muted-foreground italic border-l-2 border-primary/50 pl-3">
                                          &quot;{isHigh ? fullBlock.belief : fullBlock.strength.belief}&quot;
                                        </p>

                                        {isHigh ? (
                                          <>
                                            <div className="bg-destructive/5 rounded-lg p-3 border border-destructive/10">
                                              <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Identity: {fullBlock.identity.label}</p>
                                              <p className="text-sm text-foreground">{fullBlock.identity.description}</p>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-3">
                                              <div className="bg-secondary/50 rounded-lg p-3">
                                                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Colleagues See</p>
                                                <p className="text-sm text-foreground">{fullBlock.perceptionDetails.howColleaguesSeeYou}</p>
                                              </div>
                                              <div className="bg-secondary/50 rounded-lg p-3">
                                                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Leadership Sees</p>
                                                <p className="text-sm text-foreground">{fullBlock.perceptionDetails.howLeadershipSeesYou}</p>
                                              </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-3">
                                              <div className="bg-secondary/50 rounded-lg p-3">
                                                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Career Impact</p>
                                                <p className="text-sm text-foreground">{fullBlock.perceptionDetails.careerImpact}</p>
                                              </div>
                                              <div className="bg-secondary/50 rounded-lg p-3">
                                                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">What They Miss</p>
                                                <p className="text-sm text-foreground">{fullBlock.perceptionDetails.whatYouMiss}</p>
                                              </div>
                                            </div>

                                            <div className="bg-destructive/5 rounded-lg p-3 border border-destructive/10">
                                              <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Belief to Challenge</p>
                                              <p className="text-sm text-foreground italic">&quot;{fullBlock.coaching.beliefToChallenge}&quot;</p>
                                            </div>

                                            <div className="bg-secondary/30 rounded-lg p-3">
                                              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Coaching Discussion Topics</p>
                                              <ul className="space-y-2">
                                                {fullBlock.coaching.discussWithCoach.map((topic, ti) => (
                                                  <li key={ti} className="flex items-start gap-2">
                                                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                                    <span className="text-sm text-foreground">{topic}</span>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>

                                            <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                                              <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">New Belief to Adopt</p>
                                              <p className="text-sm text-foreground font-medium">&quot;{fullBlock.coaching.newBeliefToAdopt}&quot;</p>
                                            </div>

                                            <div className="bg-secondary/30 rounded-lg p-3">
                                              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Actions to Practice</p>
                                              <ul className="space-y-2">
                                                {fullBlock.changeActions.map((action, ai) => (
                                                  <li key={ai} className="flex items-start gap-2">
                                                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                                    <span className="text-sm text-foreground">{action}</span>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          </>
                                        ) : (
                                          <>
                                            <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                                              <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">Strength: {fullBlock.strength.label}</p>
                                              <p className="text-sm text-foreground">{fullBlock.strength.description}</p>
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-3">
                                              <div className="bg-primary/5 rounded-lg p-3">
                                                <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">Colleagues See</p>
                                                <p className="text-sm text-foreground">{fullBlock.strength.howColleaguesSeeYou}</p>
                                              </div>
                                              <div className="bg-primary/5 rounded-lg p-3">
                                                <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">Leadership Sees</p>
                                                <p className="text-sm text-foreground">{fullBlock.strength.howLeadershipSeesYou}</p>
                                              </div>
                                            </div>
                                            <div className="bg-primary/5 rounded-lg p-3">
                                              <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">Career Benefit</p>
                                              <p className="text-sm text-foreground">{fullBlock.strength.careerBenefit}</p>
                                            </div>
                                          </>
                                        )}
                                      </CardContent>
                                    </Card>
                                  )
                                })}
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleDownloadPDF(result)} disabled={generatingPDF === result.id} className="gap-2">
                              <Download className="w-4 h-4" />
                              {generatingPDF === result.id ? 'Generating...' : 'Download PDF'}
                            </Button>
                            {result.email && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={`mailto:${result.email}`} className="gap-2">
                                  <Mail className="w-4 h-4" />Email Client
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
