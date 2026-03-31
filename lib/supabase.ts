import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface AssessmentResult {
  id?: string
  respondent_name: string
  respondent_email?: string
  scores: Record<string, number>
  total_score: number
  created_at?: string
}
