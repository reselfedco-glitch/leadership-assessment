import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin/dashboard"

export default async function AdminPage() {
  const supabase = await createClient()
  
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/admin/login")
  }

  // Fetch all assessment results
  const { data: results, error } = await supabase
    .from("assessment_results")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Failed to fetch results:", error)
  }

  return <AdminDashboard results={results || []} userEmail={user.email || ""} />
}
