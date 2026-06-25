'use client'
import { signOut } from "next-auth/react"
export default function SignOutButton() {
  return <button onClick={() => signOut()} className="text-white bg-red-600 px-3 py-1 rounded">පිටවීම</button>
}
