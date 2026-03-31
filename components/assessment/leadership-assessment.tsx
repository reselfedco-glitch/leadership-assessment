"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { questions, calculateResults } from "@/lib/assessment-data"
import { ProgressBar } from "./progress-bar"
import { QuestionCard } from "./question-card"
import { Results } from "./results"
import { Intro } from "./intro"
import { NameForm } from "./name-form"
import { ArrowLeft, ArrowRight } from "lucide-react"

type AssessmentStep = "intro" | "name" | "questions" | "results"

export function LeadershipAssessment() {
  const [step, setStep] = useState<AssessmentStep>("intro")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  
  const handleStart = useCallback(() => {
    setStep("name")
  }, [])

  const handleNameSubmit = useCallback((name: string, email: string) => {
    setUserName(name)
    setUserEmail(email)
    setStep("questions")
    setCurrentQuestion(0)
    setAnswers({})
  }, [])
  
  const handleSelectAnswer = useCallback((score: number) => {
    const questionId = questions[currentQuestion].id
    setAnswers(prev => ({ ...prev, [questionId]: score }))
  }, [currentQuestion])
  
  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setStep("results")
    }
  }, [currentQuestion])
  
  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }, [currentQuestion])
  
  const handleRestart = useCallback(() => {
    setStep("intro")
    setCurrentQuestion(0)
    setAnswers({})
    setUserName("")
    setUserEmail("")
  }, [])
  
  const currentQuestionData = questions[currentQuestion]
  const currentAnswer = currentQuestionData ? answers[currentQuestionData.id] : undefined
  const hasAnsweredCurrent = currentAnswer !== undefined
  const results = step === "results" ? calculateResults(answers) : null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">L</span>
            </div>
            <span className="font-semibold text-foreground hidden sm:inline">Leadership Identity</span>
          </div>
          <div className="flex items-center gap-4">
            {userName && step === "questions" && (
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {userName}
              </span>
            )}
            {step === "questions" && (
              <div className="text-sm text-muted-foreground">
                {currentQuestion + 1} / {questions.length}
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        {step === "intro" && <Intro onStart={handleStart} />}

        {step === "name" && <NameForm onSubmit={handleNameSubmit} />}
        
        {step === "questions" && currentQuestionData && (
          <div className="space-y-8">
            <ProgressBar current={currentQuestion + 1} total={questions.length} />
            
            <div className="py-8">
              <QuestionCard 
                question={currentQuestionData}
                selectedAnswer={currentAnswer}
                onSelectAnswer={handleSelectAnswer}
              />
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <Button
                variant="ghost"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!hasAnsweredCurrent}
                className="gap-2"
              >
                {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
        
        {step === "results" && results && (
          <Results
            name={userName}
            email={userEmail}
            leadershipScore={results.leadershipScore}
            blockScores={results.blockScores}
            topBlocks={results.topBlocks}
            onRestart={handleRestart}
          />
        )}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Leadership = The ability to influence direction, decisions, and outcomes</p>
        </div>
      </footer>
    </div>
  )
}
