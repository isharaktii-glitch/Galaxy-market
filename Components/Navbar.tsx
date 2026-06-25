import Link from "next/link"
import { auth } from "@/lib/auth"
import Cart from "./Cart"

export default async function Navbar() {
  const session = await auth()
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">Galaxy Market</Link>
      <div className="flex gap-4 items-center">
        {session ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Cart />
          </>
        ) : (
          <Link href="/auth/login">පිවිසෙන්න</Link>
        )}
      </div>
    </nav>
  )
}
