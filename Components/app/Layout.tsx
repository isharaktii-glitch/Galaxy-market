import './globals.css'
import { Providers } from './providers'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
const ThreeScene = dynamic(() => import('@/components/ThreeScene'), { ssr: false })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="si">
      <body>
        <Providers>
          <div className="fixed inset-0 -z-10">
            <ThreeScene />
          </div>
          <Navbar />
          <div className="relative z-10 min-h-screen bg-white/80 backdrop-blur-sm">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
