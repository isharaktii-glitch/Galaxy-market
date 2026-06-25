import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const session = await auth()
  if (!session) redirect("/auth/login")
  const role = (session.user as any).role
  if (role === "ADMIN") redirect("/admin")
  else if (role === "SELLER") redirect("/seller")
  else redirect("/customer")
}
