import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminDashboard } from "@/components/admin/dashboard"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get("admin_auth")

  if (!authCookie || authCookie.value !== "authenticated") {
    redirect("/admin/login")
  }

  const supabase = await createClient()

  const { data: results, error } = await supabase
    .from("assessment_results")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Failed to fetch results:", error)
  }

  return <AdminDashboard results={results || []} userEmail="admin@reselfed.com" />
}
