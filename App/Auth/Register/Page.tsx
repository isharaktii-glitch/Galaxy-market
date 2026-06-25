'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useDropzone } from "react-dropzone"

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "", role: "CUSTOMER",
    storeName: "", bankName: "", accountNo: "", branch: "", commissionPercent: 10
  })
  const [idCardFront, setIdCardFront] = useState<File | null>(null)
  const router = useRouter()
  const { getRootProps, getInputProps } = useDropzone({ onDrop: files => setIdCardFront(files[0]) })

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
    if (res.ok) router.push("/auth/login")
    else alert("Registration failed")
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl w-[500px]">
        <h1 className="text-2xl font-bold mb-4">ලියාපදිංචිය</h1>
        <input name="name" placeholder="නම" className="w-full p-2 border rounded mb-2" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" className="w-full p-2 border rounded mb-2" onChange={handleChange} required />
        <input name="phone" placeholder="දුරකථන අංකය" className="w-full p-2 border rounded mb-2" onChange={handleChange} required />
        <input name="password" type="password" placeholder="මුරපදය" className="w-full p-2 border rounded mb-2" onChange={handleChange} required />
        <select name="role" className="w-full p-2 border rounded mb-4" onChange={handleChange} value={form.role}>
          <option value="CUSTOMER">පාරිභෝගික (Customer)</option>
          <option value="SELLER">විකුණුම්කරු (Seller/Dropshipper)</option>
        </select>
        {form.role === "SELLER" && (
          <>
            <input name="storeName" placeholder="ගබඩා නම" className="w-full p-2 border rounded mb-2" onChange={handleChange} />
            <input name="bankName" placeholder="බැංකු නම" className="w-full p-2 border rounded mb-2" onChange={handleChange} />
            <input name="accountNo" placeholder="ගිණුම් අංකය" className="w-full p-2 border rounded mb-2" onChange={handleChange} />
            <input name="branch" placeholder="ශාඛාව" className="w-full p-2 border rounded mb-2" onChange={handleChange} />
            <input name="commissionPercent" type="number" placeholder="කොමිස් %" className="w-full p-2 border rounded mb-2" onChange={handleChange} value={form.commissionPercent} />
          </>
        )}
        {form.role === "CUSTOMER" && (
          <div className="mb-2">
            <label className="block mb-1">KYC - ID ඉදිරිපස</label>
            <div {...getRootProps()} className="border-dashed border-2 p-4 text-center cursor-pointer">
              <input {...getInputProps()} />
              {idCardFront ? idCardFront.name : "ගොනුව තෝරන්න"}
            </div>
          </div>
        )}
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">ලියාපදිංචි වන්න</button>
      </form>
    </div>
  )
}
