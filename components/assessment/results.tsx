"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { Block } from "@/lib/assessment-data"
import { 
  RefreshCcw, Eye, AlertTriangle, Target, Download, Mail, Users, 
  Briefcase, TrendingDown, TrendingUp, Lightbulb, CheckCircle2, UserCircle,
  BarChart3, Brain, Compass, ChevronRight
} from "lucide-react"

interface BlockScore {
  block: Block
  score: number
  percentage: number
}

interface ResultsProps {
  name: string
  email: string
  leadershipScore: number
  blockScores: BlockScore[]
  topBlocks: BlockScore[]
  onRestart: () => void
}

type TabId = "overview" | "blocks" | "perception" | "actions"

function ScoreRing({ score, size = "large" }: { score: number; size?: "large" | "small" }) {
  const dimensions = size === "large" ? { width: 160, radius: 45, stroke: 8 } : { width: 80, radius: 28, stroke: 6 }
  const circumference = 2 * Math.PI * dimensions.radius
  const strokeDashoffset = circumference - (score / 100) * circumference
  
  return (
    <div className={`relative ${size === "large" ? "w-40 h-40" : "w-20 h-20"}`}>
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx={dimensions.width / 2}
          cy={dimensions.width / 2}
          r={dimensions.radius}
          stroke="currentColor"
          strokeWidth={dimensions.stroke}
          fill="none"
          className="text-secondary"
        />
        <circle
          cx={dimensions.width / 2}
          cy={dimensions.width / 2}
          r={dimensions.radius}
          stroke="currentColor"
          strokeWidth={dimensions.stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-primary transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-bold text-foreground ${size === "large" ? "text-4xl" : "text-xl"}`}>{score}</span>
        {size === "large" && <span className="text-sm text-muted-foreground">out of 100</span>}
      </div>
    </div>
  )
}

function NavigationTabs({ activeTab, onTabChange, name }: { activeTab: TabId; onTabChange: (tab: TabId) => void; name: string }) {
  const tabs = [
    { id: "overview" as TabId, label: "Overview", icon: BarChart3, description: "Your score summary" },
    { id: "blocks" as TabId, label: "Your Blocks", icon: Brain, description: "Psychological blocks" },
    { id: "perception" as TabId, label: "Perception", icon: Eye, description: "How others see you" },
    { id: "actions" as TabId, label: "Next Steps", icon: Compass, description: "What to do now" },
  ]

  return (
    <div className="sticky top-[73px] z-10 bg-background/95 backdrop-blur-sm border-b border-border -mx-4 px-4 py-2">
      <nav className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

function OverviewTab({ name, leadershipScore, blockScores, scoreInfo }: { 
  name: string; 
  leadershipScore: number; 
  blockScores: BlockScore[];
  scoreInfo: { label: string; description: string };
}) {
  const topBlocks = blockScores.filter(b => b.percentage >= 50).slice(0, 3)
  
  return (
    <div className="space-y-8">
      {/* Main Score Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <ScoreRing score={leadershipScore} />
            <div className="text-center md:text-left flex-1">
              <p className="text-sm font-medium text-primary mb-1">Leadership Identity Score</p>
              <h2 className="text-3xl font-bold text-foreground mb-3">{scoreInfo.label}</h2>
              <p className="text-muted-foreground leading-relaxed">{scoreInfo.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-foreground">{blockScores.filter(b => b.percentage >= 50).length}</p>
            <p className="text-sm text-muted-foreground">Active Blocks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-foreground">{blockScores.filter(b => b.percentage < 30).length}</p>
            <p className="text-sm text-muted-foreground">Strengths</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">{topBlocks[0]?.percentage || 0}%</p>
            <p className="text-sm text-muted-foreground">Top Block</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-foreground">5</p>
            <p className="text-sm text-muted-foreground">Areas Analyzed</p>
          </CardContent>
        </Card>
      </div>

      {/* Block Summary */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Block Summary</h3>
          <div className="space-y-4">
            {blockScores.map((bs) => (
              <div key={bs.block.id} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{bs.block.name}</span>
                    <span className={`text-sm font-bold ${bs.percentage >= 50 ? 'text-destructive' : 'text-primary'}`}>
                      {bs.percentage}%
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ${bs.percentage >= 50 ? 'bg-destructive' : 'bg-primary'}`}
                      style={{ width: `${bs.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Primary Identity */}
      {topBlocks[0] && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-destructive/20">
                <UserCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Primary Identity</p>
                <h3 className="text-xl font-bold text-foreground mb-2">{topBlocks[0].block.identity.label}</h3>
                <p className="text-muted-foreground text-sm">{topBlocks[0].block.identity.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function BlocksTab({ name, blockScores }: { name: string; blockScores: BlockScore[] }) {
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null)
  const hasHighBlocks = blockScores.some(b => b.percentage >= 50)
  const strengths = blockScores.filter(b => b.percentage < 30)
  
  const getBenchmarkLevel = (percentage: number) => {
    if (percentage >= 70) return 'low'
    if (percentage >= 50) return 'average'
    if (percentage >= 35) return 'aboveAverage'
    if (percentage >= 20) return 'executive'
    return 'elite'
  }
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">{name}&apos;s Leadership Beliefs</h2>
        <p className="text-muted-foreground">These beliefs shape how you show up and how others perceive you</p>
      </div>

      {/* Strengths Section - when no high blocks */}
      {!hasHighBlocks && strengths.length > 0 && (
        <Card className="border-primary/30 bg-primary/5 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Your Leadership Beliefs Are Aligned</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              {name}, your beliefs support leadership behavior. You don&apos;t hold the psychological blocks that typically limit professionals from stepping into influence. Here&apos;s what you believe and why it serves you:
            </p>
            <div className="space-y-4">
              {strengths.map((bs) => (
                <div key={bs.block.id} className="bg-background/50 rounded-lg p-4">
                  <p className="font-medium text-foreground mb-1">{bs.block.strength.label}</p>
                  <p className="text-sm text-muted-foreground italic mb-2">&quot;{bs.block.strength.belief}&quot;</p>
                  <p className="text-sm text-foreground">{bs.block.strength.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {blockScores.map((bs) => {
          const isExpanded = expandedBlock === bs.block.id
          const isHighBlock = bs.percentage >= 50
          const currentLevel = getBenchmarkLevel(bs.percentage)
          
          return (
            <Card 
              key={bs.block.id} 
              className={`border transition-all ${isHighBlock ? 'border-destructive/50' : 'border-border'} ${isExpanded ? 'ring-2 ring-primary/20' : ''}`}
            >
              <CardContent className="p-0">
                <button
                  onClick={() => setExpandedBlock(isExpanded ? null : bs.block.id)}
                  className="w-full p-6 text-left flex items-center justify-between"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {isHighBlock ? (
                      <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">{bs.block.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {isHighBlock ? `"${bs.block.belief}"` : `"${bs.block.strength.belief}"`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xl font-bold ${isHighBlock ? 'text-destructive' : 'text-primary'}`}>
                      {bs.percentage}%
                    </span>
                    <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 space-y-6 border-t border-border pt-6 animate-in fade-in-0 slide-in-from-top-2">
                    {/* Current Belief */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-primary" />
                        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                          {isHighBlock ? "Current Belief" : "Your Belief"}
                        </p>
                      </div>
                      <p className="text-foreground italic border-l-2 border-primary/50 pl-3">
                        {isHighBlock ? `"${bs.block.belief}"` : `"${bs.block.strength.belief}"`}
                      </p>
                    </div>

                    {/* Strength explanation when not a high block */}
                    {!isHighBlock && (
                      <div className="bg-primary/10 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Why This Serves You</p>
                        </div>
                        <p className="text-sm text-foreground">{bs.block.strength.description}</p>
                      </div>
                    )}

                    {/* Identity - for high blocks */}
                    {isHighBlock && (
                      <div className="bg-destructive/10 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <UserCircle className="w-4 h-4 text-destructive" />
                          <p className="text-xs font-semibold uppercase tracking-wide text-destructive">Identity You Hold</p>
                        </div>
                        <p className="font-semibold text-foreground mb-1">{bs.block.identity.label}</p>
                        <p className="text-sm text-muted-foreground">{bs.block.identity.description}</p>
                      </div>
                    )}

                    {/* Impact - for high blocks */}
                    {isHighBlock && (
                      <div className="bg-secondary/50 rounded-lg p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Impact on Being Respected</p>
                        <p className="text-sm text-foreground">{bs.block.identity.impact}</p>
                      </div>
                    )}

                    {/* Benchmark Comparison */}
                    <div className="bg-secondary/30 rounded-lg p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">Where You Stand</p>
                      <div className="space-y-3">
                        {[
                          { key: 'low', label: bs.block.benchmarks.low.label, behavior: bs.block.benchmarks.low.behavior },
                          { key: 'average', label: bs.block.benchmarks.average.label, behavior: bs.block.benchmarks.average.behavior },
                          { key: 'aboveAverage', label: bs.block.benchmarks.aboveAverage.label, behavior: bs.block.benchmarks.aboveAverage.behavior },
                          { key: 'executive', label: bs.block.benchmarks.executive.label, behavior: bs.block.benchmarks.executive.behavior },
                          { key: 'elite', label: bs.block.benchmarks.elite.label, behavior: bs.block.benchmarks.elite.behavior },
                        ].map((benchmark) => (
                          <div 
                            key={benchmark.key}
                            className={`p-3 rounded-lg border ${currentLevel === benchmark.key ? 'bg-primary/10 border-primary' : 'bg-background/50 border-transparent'}`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              {currentLevel === benchmark.key && (
                                <span className="text-xs font-bold text-primary px-2 py-0.5 bg-primary/20 rounded">YOU</span>
                              )}
                              <p className={`text-sm font-semibold ${currentLevel === benchmark.key ? 'text-primary' : 'text-foreground'}`}>
                                {benchmark.label}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground">{benchmark.behavior}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function PerceptionTab({ name, blockScores, leadershipScore }: { name: string; blockScores: BlockScore[]; leadershipScore: number }) {
  const topBlocks = blockScores.filter(b => b.percentage >= 50)
  const strengths = blockScores.filter(b => b.percentage < 30)
  const hasSignificantBlocks = topBlocks.length > 0
  const hasStrengths = strengths.length > 0

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">How Others See You, {name}</h2>
        <p className="text-muted-foreground">
          {hasSignificantBlocks 
            ? "The gap between your intentions and others' perceptions" 
            : "Your leadership presence and how it impacts those around you"}
        </p>
      </div>

      {/* Dynamic Perception Gap / Alignment Section */}
      <Card className={`border-${hasSignificantBlocks ? 'primary' : 'primary'}/30 bg-${hasSignificantBlocks ? 'primary' : 'primary'}/5`}>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <Eye className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">
              {hasSignificantBlocks ? "The Perception Gap" : "Perception Alignment"}
            </h3>
          </div>
          
          <div className="space-y-4">
            {hasSignificantBlocks ? (
              <>
                <p className="text-muted-foreground leading-relaxed">
                  {name}, there is a gap between who you are and who others see. Your intentions are invisible — only your actions are observed. 
                  Based on your responses, you have {topBlocks.length} active block{topBlocks.length > 1 ? 's' : ''} that create{topBlocks.length === 1 ? 's' : ''} a disconnect between your potential and how others perceive you.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  People don&apos;t evaluate you on your potential. They evaluate what they observe: Do you speak up? Do you take initiative? 
                  Do you own outcomes? Your {topBlocks.map(b => b.block.name.replace(' Block', '')).join(', ')} tendencies may be sending unintended signals about your leadership capacity.
                </p>
              </>
            ) : (
              <>
                <p className="text-muted-foreground leading-relaxed">
                  {name}, your actions and intentions are well-aligned. You demonstrate leadership behaviors that match your internal self-image. 
                  This alignment means others see you the way you intend to be seen — as someone with presence, initiative, and influence.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  With a leadership score of {leadershipScore}, you&apos;re operating from a position of strength. Your behaviors consistently signal 
                  that you&apos;re ready for leadership, and others recognize this in their interactions with you.
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Strengths Section - when there are low-scoring blocks */}
      {hasStrengths && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground">Your Leadership Strengths</h3>
          
          {strengths.map((bs) => (
            <Card key={bs.block.id} className="border-primary/30">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-foreground">{bs.block.strength.label}</h4>
                  </div>
                  <span className="text-sm text-primary font-medium">{100 - bs.percentage}% aligned</span>
                </div>

                <p className="text-sm text-muted-foreground italic border-l-2 border-primary/50 pl-3">
                  &quot;{bs.block.strength.belief}&quot;
                </p>

                <p className="text-sm text-foreground">{bs.block.strength.description}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-primary/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-primary" />
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary">Colleagues See</p>
                    </div>
                    <p className="text-sm text-foreground">{bs.block.strength.howColleaguesSeeYou}</p>
                  </div>

                  <div className="bg-primary/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary">Leadership Sees</p>
                    </div>
                    <p className="text-sm text-foreground">{bs.block.strength.howLeadershipSeesYou}</p>
                  </div>
                </div>

                <div className="bg-primary/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">Career Benefit</p>
                  </div>
                  <p className="text-sm text-foreground">{bs.block.strength.careerBenefit}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Detailed Block Perceptions - when there are high-scoring blocks */}
      {hasSignificantBlocks && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground">Areas Requiring Attention</h3>
          
          {topBlocks.map((bs) => (
            <Card key={bs.block.id} className="border-destructive/30">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    <h4 className="font-semibold text-foreground">{bs.block.name}</h4>
                  </div>
                  <span className="text-sm text-destructive font-medium">{bs.percentage}% active</span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Colleagues See</p>
                    </div>
                    <p className="text-sm text-foreground">{bs.block.perceptionDetails.howColleaguesSeeYou}</p>
                  </div>

                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-4 h-4 text-muted-foreground" />
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Leadership Sees</p>
                    </div>
                    <p className="text-sm text-foreground">{bs.block.perceptionDetails.howLeadershipSeesYou}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="w-4 h-4 text-muted-foreground" />
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Career Impact</p>
                    </div>
                    <p className="text-sm text-foreground">{bs.block.perceptionDetails.careerImpact}</p>
                  </div>

                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-muted-foreground" />
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">What You Miss</p>
                    </div>
                    <p className="text-sm text-foreground">{bs.block.perceptionDetails.whatYouMiss}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dynamic Bottom Section - Cost or Momentum */}
      <Card className={hasSignificantBlocks ? "border-destructive/30 bg-destructive/5" : "border-primary/30 bg-primary/5"}>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            {hasSignificantBlocks ? "What Happens If Nothing Changes" : "Your Leadership Momentum"}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {hasSignificantBlocks ? (
              `${name}, every day you operate from these patterns, you reinforce how others see you. Perceptions become reputations. Reputations become ceilings. With ${topBlocks.length} active block${topBlocks.length > 1 ? 's' : ''}, you risk being seen as someone with potential that never materializes — capable but not ready, talented but not trusted with more.`
            ) : (
              `${name}, your current trajectory is strong. With ${strengths.length} area${strengths.length > 1 ? 's' : ''} of alignment, you're building the reputation of someone who leads through action. Keep reinforcing these behaviors — they compound over time, and others will increasingly see you as someone ready for greater responsibility.`
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function ActionsTab({ name, blockScores, onRestart, leadershipScore }: { 
  name: string; 
  blockScores: BlockScore[];
  onRestart: () => void;
  leadershipScore: number;
}) {
  const resultsRef = useRef<HTMLDivElement>(null)
  
  const topBlocks = blockScores.filter(b => b.percentage >= 50)
  const hasBlocks = topBlocks.length > 0

  // Generate personalized quote based on their blocks
  const getPersonalizedQuote = () => {
    if (!hasBlocks) {
      return `${name}, your alignment with leadership behaviors is strong. Continue to build on your strengths and remain intentional about how you show up. Leadership is not a destination — it is a daily practice.`
    }
    
    // Use the quote from their highest block
    const primaryBlock = topBlocks[0]
    return primaryBlock.block.coaching.quote
  }

  // Generate coaching focus summary
  const getCoachingFocusSummary = () => {
    if (!hasBlocks) {
      return {
        currentState: `${name}, you currently operate with strong leadership alignment. Your beliefs support initiative, influence, and visibility.`,
        coachFocus: "Your coach will focus on expanding your sphere of influence, developing others, and preparing you for increasingly senior leadership contexts.",
        futureState: "After working together, you'll have a larger leadership footprint, be developing future leaders, and be positioned for executive-level opportunities."
      }
    }
    
    const primaryBlock = topBlocks[0]
    const blockNames = topBlocks.map(b => b.block.name.replace(' Block', '')).join(' and ')
    
    return {
      currentState: `${name}, you currently operate with ${topBlocks.length} active block${topBlocks.length > 1 ? 's' : ''} (${blockNames}) that limit how others perceive your leadership capacity. Your score of ${leadershipScore} indicates ${leadershipScore >= 60 ? 'emerging' : leadershipScore >= 40 ? 'developing' : 'foundational'} leadership identity.`,
      coachFocus: `Your coach will focus on challenging the belief "${primaryBlock.block.coaching.beliefToChallenge}" and helping you adopt new behaviors that signal leadership readiness. Together, you'll work on ${topBlocks.length > 1 ? 'multiple belief patterns' : 'this belief pattern'} through targeted exercises and reflection.`,
      futureState: `After working on these areas, you'll be perceived as someone who ${topBlocks.map(b => b.block.strength.label.toLowerCase()).join(', acts as ')}. Your leadership score could move from ${leadershipScore} to ${Math.min(100, leadershipScore + (topBlocks.length * 15))}+ as you internalize new beliefs and demonstrate new behaviors.`
    }
  }

  const coachingSummary = getCoachingFocusSummary()

  const [downloadError, setDownloadError] = useState<string | null>(null)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const handleDownloadPDF = async () => {
    try {
      setDownloadError(null)
      setIsGeneratingPDF(true)
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

      const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number, r: number, g: number, b: number, style: string = 'normal') => {
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
        return lines.length
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
        // underline
        pdf.setDrawColor(90, 50, 150)
        pdf.setLineWidth(0.5)
        pdf.line(margin, yPos, margin + 40, yPos)
        yPos += 8
      }

      const addSubHeader = (text: string) => {
        addNewPageIfNeeded(12)
        yPos += 4
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(80, 80, 80)
        pdf.text(text, margin, yPos)
        pdf.setFont('helvetica', 'normal')
        yPos += 7
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

      // ==========================================
      // PAGE 1: HEADER & OVERVIEW
      // ==========================================
      pdf.setFontSize(9)
      pdf.setTextColor(128, 128, 128)
      pdf.text('RESELFED', margin, yPos)
      pdf.text('Leadership Identity Assessment', pageWidth - margin, yPos, { align: 'right' })
      yPos += 15

      pdf.setFontSize(24)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(60, 60, 60)
      pdf.text(`${name}'s Leadership Identity`, margin, yPos)
      pdf.setFont('helvetica', 'normal')
      yPos += 8

      pdf.setFontSize(11)
      pdf.setTextColor(100, 100, 100)
      pdf.text('Full Assessment Results', margin, yPos)
      yPos += 15

      // Score Box
      pdf.setFillColor(245, 245, 250)
      pdf.roundedRect(margin, yPos, contentWidth, 40, 3, 3, 'F')
      
      const scoreInfo = leadershipScore >= 80 ? { label: "Emerging Leader", desc: `${name}, you already think and operate like a leader.` }
        : leadershipScore >= 60 ? { label: "Growing Influence", desc: `${name}, you show leadership traits but certain blocks hold you back.` }
        : leadershipScore >= 40 ? { label: "Hidden Influence", desc: `${name}, several blocks are limiting your leadership identity.` }
        : { label: "Foundational Stage", desc: `${name}, significant blocks prevent you from seeing yourself as a leader.` }

      pdf.setFontSize(32)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(90, 50, 150)
      pdf.text(`${leadershipScore}`, margin + 10, yPos + 22)
      pdf.setFontSize(12)
      pdf.setTextColor(130, 130, 130)
      pdf.text('/ 100', margin + 38, yPos + 22)
      
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(60, 60, 60)
      pdf.text(scoreInfo.label, margin + 60, yPos + 15)
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(9)
      pdf.setTextColor(100, 100, 100)
      const descLines = pdf.splitTextToSize(scoreInfo.desc, contentWidth - 65)
      pdf.text(descLines, margin + 60, yPos + 22)
      yPos += 50

      // Quick Stats
      const stats = [
        { label: 'Active Blocks', value: blockScores.filter(b => b.percentage >= 50).length.toString() },
        { label: 'Strengths', value: blockScores.filter(b => b.percentage < 30).length.toString() },
        { label: 'Top Block', value: `${blockScores.filter(b => b.percentage >= 50)[0]?.percentage || 0}%` },
        { label: 'Areas Analyzed', value: '5' },
      ]
      const statWidth = contentWidth / 4
      stats.forEach((stat, i) => {
        const x = margin + i * statWidth
        pdf.setFillColor(250, 250, 255)
        pdf.roundedRect(x + 2, yPos, statWidth - 4, 22, 2, 2, 'F')
        pdf.setFontSize(16)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(60, 60, 60)
        pdf.text(stat.value, x + statWidth / 2, yPos + 10, { align: 'center' })
        pdf.setFontSize(7)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(120, 120, 120)
        pdf.text(stat.label, x + statWidth / 2, yPos + 17, { align: 'center' })
      })
      yPos += 30

      // Block Summary with bars
      addSectionHeader('Block Summary')
      blockScores.forEach((bs) => {
        addNewPageIfNeeded(18)
        const isHigh = bs.percentage >= 50
        
        pdf.setFontSize(10)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(60, 60, 60)
        pdf.text(bs.block.name, margin, yPos)
        pdf.setTextColor(isHigh ? 180 : 90, isHigh ? 80 : 130, isHigh ? 80 : 90)
        pdf.text(`${bs.percentage}%`, pageWidth - margin, yPos, { align: 'right' })
        pdf.setFont('helvetica', 'normal')
        yPos += 4
        
        // Progress bar
        pdf.setFillColor(230, 230, 240)
        pdf.roundedRect(margin, yPos, contentWidth, 3, 1, 1, 'F')
        pdf.setFillColor(isHigh ? 220 : 90, isHigh ? 100 : 130, isHigh ? 100 : 180)
        pdf.roundedRect(margin, yPos, contentWidth * (bs.percentage / 100), 3, 1, 1, 'F')
        yPos += 9
      })

      // Primary Identity (if high blocks exist)
      const topBlocks = blockScores.filter(b => b.percentage >= 50)
      if (topBlocks[0]) {
        addNewPageIfNeeded(30)
        yPos += 5
        pdf.setFillColor(255, 245, 245)
        pdf.roundedRect(margin, yPos, contentWidth, 25, 3, 3, 'F')
        pdf.setFontSize(8)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(180, 80, 80)
        pdf.text('PRIMARY IDENTITY', margin + 8, yPos + 8)
        pdf.setFontSize(12)
        pdf.setTextColor(60, 60, 60)
        pdf.text(topBlocks[0].block.identity.label, margin + 8, yPos + 16)
        pdf.setFont('helvetica', 'normal')
        yPos += 30
        addWrappedText(topBlocks[0].block.identity.description, margin, yPos, contentWidth, 9, 100, 100, 100)
        yPos += 5
      }

      // ==========================================
      // DETAILED BLOCKS
      // ==========================================
      addSectionHeader('Your Leadership Beliefs — Detailed')

      blockScores.forEach((bs) => {
        const isHigh = bs.percentage >= 50
        
        addNewPageIfNeeded(60)
        // Block header
        pdf.setFillColor(isHigh ? 255 : 245, isHigh ? 248 : 250, isHigh ? 248 : 255)
        pdf.roundedRect(margin, yPos, contentWidth, 12, 2, 2, 'F')
        pdf.setFontSize(11)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(60, 60, 60)
        pdf.text(bs.block.name, margin + 5, yPos + 8)
        pdf.setTextColor(isHigh ? 180 : 90, isHigh ? 80 : 130, isHigh ? 80 : 90)
        pdf.text(`${bs.percentage}%`, pageWidth - margin - 5, yPos + 8, { align: 'right' })
        pdf.setFont('helvetica', 'normal')
        yPos += 17

        // Belief
        addLabel(isHigh ? 'CURRENT BELIEF' : 'YOUR BELIEF')
        addWrappedText(`"${isHigh ? bs.block.belief : bs.block.strength.belief}"`, margin + 5, yPos, contentWidth - 10, 9, 80, 80, 80, 'italic')
        yPos += 4

        if (isHigh) {
          // Identity
          addLabel('IDENTITY YOU HOLD', [180, 80, 80])
          addWrappedText(bs.block.identity.label, margin + 5, yPos, contentWidth - 10, 10, 60, 60, 60, 'bold')
          yPos += 2
          addWrappedText(bs.block.identity.description, margin + 5, yPos, contentWidth - 10, 9, 100, 100, 100)
          yPos += 3

          // Impact
          addLabel('IMPACT')
          addWrappedText(bs.block.identity.impact, margin + 5, yPos, contentWidth - 10, 9, 100, 100, 100)
          yPos += 3

          // Perception Details
          addLabel('HOW COLLEAGUES SEE YOU')
          addWrappedText(bs.block.perceptionDetails.howColleaguesSeeYou, margin + 5, yPos, contentWidth - 10, 9, 100, 100, 100)
          yPos += 3

          addLabel('HOW LEADERSHIP SEES YOU')
          addWrappedText(bs.block.perceptionDetails.howLeadershipSeesYou, margin + 5, yPos, contentWidth - 10, 9, 100, 100, 100)
          yPos += 3

          addLabel('CAREER IMPACT')
          addWrappedText(bs.block.perceptionDetails.careerImpact, margin + 5, yPos, contentWidth - 10, 9, 100, 100, 100)
          yPos += 3

          addLabel('WHAT YOU MISS')
          addWrappedText(bs.block.perceptionDetails.whatYouMiss, margin + 5, yPos, contentWidth - 10, 9, 100, 100, 100)
          yPos += 3

          // Belief to Challenge
          addLabel('BELIEF TO CHALLENGE', [180, 80, 80])
          addWrappedText(`"${bs.block.coaching.beliefToChallenge}"`, margin + 5, yPos, contentWidth - 10, 9, 180, 80, 80, 'italic')
          yPos += 3

          // Discussion Topics
          addLabel('TOPICS FOR COACHING SESSIONS')
          bs.block.coaching.discussWithCoach.forEach((topic) => {
            addNewPageIfNeeded(8)
            pdf.setFontSize(9)
            pdf.setTextColor(100, 100, 100)
            pdf.text('▸', margin + 5, yPos)
            const topicLines = pdf.splitTextToSize(topic, contentWidth - 18)
            pdf.text(topicLines, margin + 12, yPos)
            yPos += topicLines.length * 4 + 2
          })
          yPos += 2

          // New Belief
          addLabel('NEW BELIEF TO ADOPT', [90, 50, 150])
          addWrappedText(`"${bs.block.coaching.newBeliefToAdopt}"`, margin + 5, yPos, contentWidth - 10, 9, 90, 50, 150, 'bold')
          yPos += 3

          // Actions
          addLabel('ACTIONS TO PRACTICE')
          bs.block.changeActions.forEach((action) => {
            addNewPageIfNeeded(8)
            pdf.setFontSize(9)
            pdf.setTextColor(100, 100, 100)
            pdf.text('✓', margin + 5, yPos)
            const actionLines = pdf.splitTextToSize(action, contentWidth - 18)
            pdf.text(actionLines, margin + 12, yPos)
            yPos += actionLines.length * 4 + 2
          })

        } else {
          // Strength details
          addLabel('WHY THIS SERVES YOU', [90, 130, 90])
          addWrappedText(bs.block.strength.description, margin + 5, yPos, contentWidth - 10, 9, 100, 100, 100)
          yPos += 3

          addLabel('HOW COLLEAGUES SEE YOU')
          addWrappedText(bs.block.strength.howColleaguesSeeYou, margin + 5, yPos, contentWidth - 10, 9, 100, 100, 100)
          yPos += 3

          addLabel('HOW LEADERSHIP SEES YOU')
          addWrappedText(bs.block.strength.howLeadershipSeesYou, margin + 5, yPos, contentWidth - 10, 9, 100, 100, 100)
          yPos += 3

          addLabel('CAREER BENEFIT')
          addWrappedText(bs.block.strength.careerBenefit, margin + 5, yPos, contentWidth - 10, 9, 100, 100, 100)
          yPos += 3
        }

        // Separator
        yPos += 3
        pdf.setDrawColor(220, 220, 220)
        pdf.setLineWidth(0.3)
        pdf.line(margin, yPos, pageWidth - margin, yPos)
        yPos += 5
      })

      // ==========================================
      // COACHING FOCUS SUMMARY
      // ==========================================
      addSectionHeader('Coaching Focus')

      addLabel('WHERE YOU ARE NOW')
      addWrappedText(coachingSummary.currentState, margin + 5, yPos, contentWidth - 10, 9, 80, 80, 80)
      yPos += 5

      addLabel('COACHING FOCUS', [90, 50, 150])
      addWrappedText(coachingSummary.coachFocus, margin + 5, yPos, contentWidth - 10, 9, 80, 80, 80)
      yPos += 5

      addLabel('WHERE YOU\'LL BE AFTER')
      addWrappedText(coachingSummary.futureState, margin + 5, yPos, contentWidth - 10, 9, 80, 80, 80)
      yPos += 5

      // Personalized Quote
      addNewPageIfNeeded(25)
      yPos += 5
      pdf.setFillColor(248, 248, 252)
      const quoteText = getPersonalizedQuote()
      const quoteLines = pdf.splitTextToSize(quoteText, contentWidth - 20)
      const quoteHeight = quoteLines.length * 4.5 + 14
      pdf.roundedRect(margin, yPos, contentWidth, quoteHeight, 3, 3, 'F')
      pdf.setFontSize(9)
      pdf.setFont('helvetica', 'italic')
      pdf.setTextColor(80, 80, 80)
      pdf.text(quoteLines, margin + 10, yPos + 10)
      pdf.setFont('helvetica', 'normal')
      yPos += quoteHeight + 8

      // ==========================================
      // FOOTER
      // ==========================================
      addNewPageIfNeeded(20)
      yPos += 10
      pdf.setDrawColor(200, 200, 200)
      pdf.line(margin, yPos, pageWidth - margin, yPos)
      yPos += 8
      pdf.setFontSize(8)
      pdf.setTextColor(150, 150, 150)
      pdf.text('CONFIDENTIAL', pageWidth / 2, yPos, { align: 'center' })
      yPos += 4
      pdf.text('Reselfed Leadership Identity Assessment', pageWidth / 2, yPos, { align: 'center' })
      yPos += 4
      pdf.text(`Generated for ${name} • ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`, pageWidth / 2, yPos, { align: 'center' })
      
      pdf.save(`${name}-leadership-assessment.pdf`)
    } catch (error) {
      console.error('[v0] PDF download error:', error)
      setDownloadError('Failed to generate PDF. Please try again.')
    } finally {
      setIsGeneratingPDF(false)
    }
  }


  return (
    <div className="space-y-8" ref={resultsRef}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Next Steps for {name}</h2>
        <p className="text-muted-foreground">
          {hasBlocks 
            ? "Topics to discuss with your coach and beliefs to challenge"
            : "Continue building on your leadership strengths"}
        </p>
      </div>

      {/* Coaching Focus Summary */}
      <Card className="border-primary bg-primary/5">
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">What Your Coach Will Focus On</h3>
          
          <div className="space-y-4">
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Where You Are Now</p>
              <p className="text-sm text-foreground">{coachingSummary.currentState}</p>
            </div>
            
            <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">Coaching Focus</p>
              <p className="text-sm text-foreground">{coachingSummary.coachFocus}</p>
            </div>
            
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Where You&apos;ll Be After</p>
              <p className="text-sm text-foreground">{coachingSummary.futureState}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personalized Quote */}
      <Card className="border-secondary bg-secondary/10">
        <CardContent className="p-6 text-center">
          <p className="text-lg text-foreground font-medium italic leading-relaxed">
            &quot;{getPersonalizedQuote()}&quot;
          </p>
        </CardContent>
      </Card>

      {/* Coaching Discussion Topics for each block */}
      {hasBlocks && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground">Discuss With Your Coach</h3>
          
          {topBlocks.map((bs, index) => (
            <Card key={bs.block.id} className="border-border">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold text-foreground">{bs.block.name}</h4>
                    <p className="text-sm text-muted-foreground">{bs.percentage}% impact on your leadership presence</p>
                  </div>
                </div>

                {/* Belief to Challenge */}
                <div className="bg-destructive/5 rounded-lg p-4 border border-destructive/20">
                  <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-2">Belief to Challenge</p>
                  <p className="text-foreground italic">&quot;{bs.block.coaching.beliefToChallenge}&quot;</p>
                </div>

                {/* Discussion Topics */}
                <div className="bg-secondary/50 rounded-lg p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Topics for Coaching Sessions</p>
                  <ul className="space-y-3">
                    {bs.block.coaching.discussWithCoach.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start gap-3">
                        <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                        <span className="text-sm text-foreground">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* New Belief to Adopt */}
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">New Belief to Adopt</p>
                  <p className="text-foreground font-medium">&quot;{bs.block.coaching.newBeliefToAdopt}&quot;</p>
                </div>

                {/* Actions to Take */}
                <div className="bg-secondary/30 rounded-lg p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Actions to Practice</p>
                  <ul className="space-y-3">
                    {bs.block.changeActions.map((action, actionIndex) => (
                      <li key={actionIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* No Blocks - Strengths Focus */}
      {!hasBlocks && (
        <Card className="border-primary/30">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Continue Building Authority</h3>
            <p className="text-muted-foreground mb-4">
              {name}, your assessment shows strong alignment with leadership behaviors. With your coach, focus on:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">Expanding your influence to new contexts and stakeholder groups</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">Developing others and becoming a multiplier of leadership</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">Taking on stretch assignments that push your current capabilities</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">Building executive presence for increasingly senior audiences</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Save Options */}
      <Card className="border-border">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Save Your Results</h3>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Download your full assessment as a PDF</p>
            <Button onClick={handleDownloadPDF} variant="outline" className="w-full gap-2" disabled={isGeneratingPDF}>
              <Download className="w-4 h-4" />
              {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
            </Button>
            {downloadError && (
              <p className="text-xs text-destructive">{downloadError}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Restart */}
      <div className="text-center pt-4">
        <Button onClick={onRestart} variant="ghost" className="gap-2">
          <RefreshCcw className="w-4 h-4" />
          Take Assessment Again
        </Button>
      </div>
    </div>
  )
}

export function Results({ name, email, leadershipScore, blockScores, onRestart }: ResultsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview")
  const [savedToDb, setSavedToDb] = useState(false)

  // Save results to database on mount
  useEffect(() => {
    const saveResults = async () => {
      if (savedToDb) return
      
      const resultsData = {
        name,
        email,
        leadershipScore,
        blockScores: blockScores.map(bs => ({
          blockName: bs.block.name,
          percentage: bs.percentage,
          belief: bs.block.belief,
        })),
        topBlocks: blockScores.filter(b => b.percentage >= 50).map(bs => bs.block.name),
      }

      try {
        const saveResponse = await fetch('/api/save-results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(resultsData),
        })
        if (saveResponse.ok) {
          setSavedToDb(true)
        }
      } catch (error) {
        console.error('Failed to save to database:', error)
      }
    }

    saveResults()
  }, [name, email, leadershipScore, blockScores, savedToDb])

  const getScoreLabel = (score: number) => {
    if (score >= 80) return { 
      label: "Emerging Leader", 
      description: `${name}, you already think and operate like a leader. Your blocks are minimal, and others likely see you as someone who shapes outcomes.` 
    }
    if (score >= 60) return { 
      label: "Growing Influence", 
      description: `${name}, you show leadership traits but certain blocks hold you back. Others notice your potential but may wonder why you don't step up more.` 
    }
    if (score >= 40) return { 
      label: "Hidden Influence", 
      description: `${name}, several psychological blocks are limiting your leadership identity. Others may see you as capable but passive.` 
    }
    return { 
      label: "Foundational Stage", 
      description: `${name}, significant blocks are preventing you from seeing yourself as a leader. Others likely perceive you as someone who follows rather than leads.` 
    }
  }
  
  const scoreInfo = getScoreLabel(leadershipScore)

  return (
    <div className="space-y-6">
      {/* Results Ready Banner */}
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 flex items-center gap-3">
        <Download className="w-5 h-5 text-primary flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            Your results are ready
          </p>
          <p className="text-xs text-muted-foreground">
            You can download your full assessment results as a PDF from the Next Steps tab.
          </p>
        </div>
        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
      </div>

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          {name}&apos;s Leadership Identity Results
        </h1>
        <p className="text-muted-foreground text-sm">
          Based on your 25 responses
        </p>
      </div>

      {/* Navigation Tabs */}
      <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} name={name} />
      
      {/* Tab Content */}
      <div className="pt-4">
        {activeTab === "overview" && (
          <OverviewTab name={name} leadershipScore={leadershipScore} blockScores={blockScores} scoreInfo={scoreInfo} />
        )}
        {activeTab === "blocks" && (
          <BlocksTab name={name} blockScores={blockScores} />
        )}
{activeTab === "perception" && (
  <PerceptionTab name={name} blockScores={blockScores} leadershipScore={leadershipScore} />
  )}
        {activeTab === "actions" && (
          <ActionsTab name={name} blockScores={blockScores} onRestart={onRestart} leadershipScore={leadershipScore} />
        )}
      </div>

      {/* Footer */}
      <div className="text-center pt-8 border-t border-border mt-8 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Reselfed</p>
        <p className="text-xs text-muted-foreground">Leadership Identity Assessment</p>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mt-4">Confidential</p>
      </div>
    </div>
  )
}
