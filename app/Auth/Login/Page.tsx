'use client'
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn("credentials", { email, password, redirect: false })
    if (res?.error) setError("වලංගු නොවන අක්තපත්‍ර")
    else router.push("/dashboard")
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h1 className="text-2xl font-bold mb-4">පිවිසෙන්න</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input type="email" placeholder="Email" className="w-full p-2 border rounded mb-2" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="මුරපදය" className="w-full p-2 border rounded mb-4" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">ඇතුල් වන්න</button>
        <p className="mt-2">ගිණුමක් නැද්ද? <Link href="/auth/register" className="text-indigo-600">ලියාපදිංචි වන්න</Link></p>
      </form>
    </div>
  )
}
