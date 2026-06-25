'use client'
import { useDropzone } from "react-dropzone"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function PaymentReceiptUpload({ orderId }: { orderId: string }) {
  const [file, setFile] = useState<File | null>(null)
  const { getRootProps, getInputProps } = useDropzone({ onDrop: files => setFile(files[0]) })
  const router = useRouter()

  const handleUpload = async () => {
    if (!file) return
    const formData = new FormData()
    formData.append("receipt", file)
    formData.append("orderId", orderId)
    await fetch("/api/receipts", { method: "POST", body: formData })
    router.refresh()
  }

  return (
    <div>
      <div {...getRootProps()} className="border-dashed border-2 p-2 text-center cursor-pointer">
        <input {...getInputProps()} />
        {file ? file.name : "ගොනුව තෝරන්න"}
      </div>
      <button onClick={handleUpload} className="mt-2 bg-green-600 text-white px-3 py-1 rounded">Upload</button>
    </div>
  )
}
