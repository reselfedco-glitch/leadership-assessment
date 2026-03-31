"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Eye, Target, Users, Zap } from "lucide-react"

interface IntroProps {
  onStart: () => void
}

export function Intro({ onStart }: IntroProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-12">
      {/* Hero */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          8-Minute Assessment
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
          Discover Your{" "}
          <span className="text-primary">Leadership Identity</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          This assessment will reveal how others perceive you based on your actions, beliefs, and behaviors in professional settings.
        </p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6 text-center">
            <p className="text-4xl font-bold text-primary">25</p>
            <p className="text-sm text-muted-foreground mt-1">Questions</p>
          </CardContent>
        </Card>
        <Card className="border-secondary/30 bg-secondary/10">
          <CardContent className="p-6 text-center">
            <p className="text-4xl font-bold text-foreground">5</p>
            <p className="text-sm text-muted-foreground mt-1">Key Areas</p>
          </CardContent>
        </Card>
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6 text-center">
            <p className="text-4xl font-bold text-primary">8</p>
            <p className="text-sm text-muted-foreground mt-1">Minutes</p>
          </CardContent>
        </Card>
      </div>
      
      {/* What You'll Discover */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground text-center">
          What You&apos;ll Discover
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { icon: Target, text: "Your Leadership Identity Score", color: "text-primary" },
            { icon: Eye, text: "How others perceive your actions", color: "text-secondary" },
            { icon: Users, text: "The gap between intention and perception", color: "text-secondary" },
            { icon: Zap, text: "Actions to change how you're seen", color: "text-primary" },
          ].map((item, index) => (
            <Card key={index} className="border-border hover:border-primary/30 transition-colors">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-2 rounded-lg bg-secondary ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-foreground font-medium">{item.text}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* CTA */}
      <div className="text-center space-y-4">
        <Button 
          size="lg" 
          onClick={onStart}
          className="text-lg px-8 py-6 gap-2 bg-primary hover:bg-primary/90"
        >
          Start the Assessment
          <ArrowRight className="w-5 h-5" />
        </Button>
        <p className="text-sm text-muted-foreground">
          No email required. Get your results instantly.
        </p>
      </div>
      
      {/* Quote */}
      <Card className="border-secondary/30 bg-secondary/10">
        <CardContent className="p-8 text-center">
          <blockquote className="text-lg md:text-xl italic text-foreground">
            &quot;People follow clarity, direction, and decisiveness. Not perfection.&quot;
          </blockquote>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center pt-8 border-t border-border space-y-2">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Reselfed</p>
        <p className="text-xs text-muted-foreground">Leadership Identity Assessment</p>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mt-4">Confidential</p>
      </div>
    </div>
  )
}
