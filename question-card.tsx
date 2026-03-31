"use client"

import { cn } from "@/lib/utils"
import type { Question } from "@/lib/assessment-data"
import { CheckCircle2 } from "lucide-react"

interface QuestionCardProps {
  question: Question
  selectedAnswer: number | undefined
  onSelectAnswer: (score: number) => void
}

export function QuestionCard({ question, selectedAnswer, onSelectAnswer }: QuestionCardProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold leading-relaxed text-balance text-foreground">
          {question.question}
        </h2>
      </div>
      
      <div className="space-y-3 max-w-2xl mx-auto">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option.score
          
          return (
            <button
              key={index}
              onClick={() => onSelectAnswer(option.score)}
              className={cn(
                "w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-center gap-4",
                isSelected
                  ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                  : "border-border bg-card hover:border-primary/50 hover:bg-secondary/50"
              )}
            >
              <div className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
                isSelected 
                  ? "border-primary bg-primary" 
                  : "border-muted-foreground/30"
              )}>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-primary-foreground" />}
              </div>
              <span className={cn(
                "text-base md:text-lg leading-relaxed",
                isSelected ? "text-foreground font-medium" : "text-muted-foreground"
              )}>
                {option.text}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
