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
  Mail
} from "lucide-react"
import { useRouter } from "next/navigation"

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

export function AdminDashboard({ results, userEmail }: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedResult, setExpandedResult] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"date" | "score">("date")
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin-logout', { method: 'POST' })
    router.push("/admin/login")
  }

  const filteredResults = results.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.email && r.email.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const sortedResults = [...filteredResults].sort((a, b) => {
    if (sortBy === "score") {
      return b.leadership_score - a.leadership_score
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  // Stats
  const totalAssessments = results.length
  const avgScore = results.length > 0 
    ? Math.round(results.reduce((acc, r) => acc + r.leadership_score, 0) / results.length)
    : 0
  const highBlockCount = results.filter(r => r.top_blocks && r.top_blocks.length > 0).length

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-blue-600"
    if (score >= 40) return "text-amber-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Emerging Leader"
    if (score >= 60) return "Growing Influence"
    if (score >= 40) return "Hidden Influence"
    return "Foundational"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Reselfed Admin</h1>
            <p className="text-sm text-muted-foreground">Assessment Results Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{userEmail}</span>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="w-6 h-6 text-primary" />
                </div>
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
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-500" />
                </div>
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
                <div className="p-3 bg-amber-500/10 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">With High Blocks</p>
                  <p className="text-2xl font-bold text-foreground">{highBlockCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={sortBy === "date" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSortBy("date")}
                >
                  Recent
                </Button>
                <Button 
                  variant={sortBy === "score" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSortBy("score")}
                >
                  By Score
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results List */}
        <Card>
          <CardHeader>
            <CardTitle>Assessment Results ({sortedResults.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {sortedResults.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                {searchQuery ? "No results match your search" : "No assessments yet"}
              </div>
            ) : (
              <div className="divide-y divide-border">
                {sortedResults.map((result) => (
                  <div key={result.id} className="p-4">
                    <button
                      onClick={() => setExpandedResult(expandedResult === result.id ? null : result.id)}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-lg font-semibold text-primary">
                            {result.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-foreground truncate">{result.name}</p>
                          <p className="text-sm text-muted-foreground truncate">
                            {result.email || "No email provided"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="text-right hidden sm:block">
                          <p className={`text-lg font-bold ${getScoreColor(result.leadership_score)}`}>
                            {result.leadership_score}
                          </p>
                          <p className="text-xs text-muted-foreground">{getScoreLabel(result.leadership_score)}</p>
                        </div>
                        <div className="text-right hidden md:block">
                          <p className="text-sm text-muted-foreground">{formatDate(result.created_at)}</p>
                        </div>
                        {expandedResult === result.id ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </button>

                    {expandedResult === result.id && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Score Summary */}
                          <div>
                            <p className="text-sm font-semibold text-muted-foreground mb-3">SCORE BREAKDOWN</p>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-foreground">Leadership Score</span>
                                <span className={`font-bold ${getScoreColor(result.leadership_score)}`}>
                                  {result.leadership_score}/100
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-foreground">Classification</span>
                                <span className="text-sm font-medium text-foreground">
                                  {getScoreLabel(result.leadership_score)}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-foreground">Active Blocks</span>
                                <span className="text-sm font-medium text-foreground">
                                  {result.top_blocks?.length || 0}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Block Details */}
                          <div>
                            <p className="text-sm font-semibold text-muted-foreground mb-3">BLOCK SCORES</p>
                            <div className="space-y-2">
                              {result.block_scores?.map((block, idx) => (
                                <div key={idx} className="flex justify-between items-center">
                                  <span className="text-sm text-foreground">{block.blockName}</span>
                                  <span className={`text-sm font-medium ${block.percentage >= 50 ? 'text-destructive' : 'text-muted-foreground'}`}>
                                    {block.percentage}%
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Top Blocks */}
                        {result.top_blocks && result.top_blocks.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-border">
                            <p className="text-sm font-semibold text-muted-foreground mb-2">COACHING FOCUS AREAS</p>
                            <div className="flex flex-wrap gap-2">
                              {result.top_blocks.map((block, idx) => (
                                <span 
                                  key={idx} 
                                  className="px-3 py-1 bg-destructive/10 text-destructive text-sm rounded-full"
                                >
                                  {block}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="mt-4 pt-4 border-t border-border flex gap-2">
                          {result.email && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={`mailto:${result.email}`} className="gap-2">
                                <Mail className="w-4 h-4" />
                                Email Client
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
