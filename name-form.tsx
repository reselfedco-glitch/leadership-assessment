"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, User, Mail } from "lucide-react"

interface NameFormProps {
  onSubmit: (name: string, email: string) => void
}

export function NameForm({ onSubmit }: NameFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onSubmit(name.trim(), email.trim())
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mx-auto">
          <User className="w-10 h-10 text-primary-foreground" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Before We Begin
        </h2>
        <p className="text-muted-foreground">
          Enter your name so we can personalize your results
        </p>
      </div>

      <Card className="border-primary/20">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Your First Name
              </label>
              <Input
                type="text"
                placeholder="Enter your first name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 text-lg bg-secondary border-border focus:border-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email (optional)
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-lg bg-secondary border-border focus:border-primary"
              />
              <p className="text-xs text-muted-foreground">We&apos;ll use this only to send your results if you choose</p>
            </div>
            <Button 
              type="submit" 
              size="lg" 
              className="w-full h-12 text-lg gap-2 mt-4 bg-primary hover:bg-primary/90"
              disabled={!name.trim()}
            >
              Continue to Assessment
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground">
        Your information is private and never shared
      </p>
    </div>
  )
}
