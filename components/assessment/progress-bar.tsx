"use client"

interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">Question {current} of {total}</span>
        <span className="font-medium text-primary">{Math.round(percentage)}% complete</span>
      </div>
      <div className="h-3 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {/* Step indicators */}
      <div className="flex justify-between px-1">
        {Array.from({ length: 5 }).map((_, i) => {
          const stepStart = (i * 4) + 1
          const isCompleted = current > stepStart + 3
          const isActive = current >= stepStart && current <= stepStart + 3
          
          return (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full transition-all ${
                isCompleted ? 'bg-primary' : isActive ? 'bg-primary/50' : 'bg-muted'
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}
