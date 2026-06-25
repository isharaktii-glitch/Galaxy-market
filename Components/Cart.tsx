'use client'
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { formatCurrency } from "@/lib/utils"

interface CartItem {
  id: string
  productId: string
  quantity: number
  product: { name: string; price: number }
}

export default function Cart() {
  const { data: session } = useSession()
  const [items, setItems] = useState<CartItem[]>([])
  const router = useRouter()

  useEffect(() => {
    if (session) fetch("/api/cart").then(res => res.json()).then(setItems)
  }, [session])

  const removeItem = async (id: string) => {
    await fetch(`/api/cart?id=${id}`, { method: "DELETE" })
    setItems(items.filter(i => i.id !== id))
  }

  const handleCheckout = async (method: "stripe" | "manual") => {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentMethod: method })
    })
    if (res.ok) {
      const order = await res.json()
      if (method === "stripe") {
        window.location.href = `/api/payment/stripe?orderId=${order.id}`
      } else {
        router.push("/customer/orders?needReceipt=true")
      }
    }
  }

  if (!items.length) return <p className="text-gray-500">කරත්තය හිස් ය.</p>

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  return (
    <div className="p-4 bg-white rounded-lg shadow max-w-md">
      <h2 className="text-xl font-bold mb-2">🛒 ඔබේ කරත්තය</h2>
      {items.map(item => (
        <div key={item.id} className="flex justify-between items-center border-b py-2">
          <div>
            <p>{item.product.name}</p>
            <p className="text-sm">{formatCurrency(item.product.price)} x {item.quantity}</p>
          </div>
          <button onClick={() => removeItem(item.id)} className="text-red-500">ඉවත්</button>
        </div>
      ))}
      <p className="mt-2 font-bold">මුළු මුදල: {formatCurrency(total)}</p>
      <div className="mt-4 flex gap-2">
        <button onClick={() => handleCheckout("stripe")} className="bg-indigo-600 text-white px-4 py-2 rounded">Stripe ගෙවීම</button>
        <button onClick={() => handleCheckout("manual")} className="bg-green-600 text-white px-4 py-2 rounded">අතින් ගෙවා රිසිට් උඩුගත කරන්න</button>
      </div>
    </div>
  )
}
