import Image from 'next/image'
import { Inter } from 'next/font/google'
import ComplexNavbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-0 items-center">
      <ComplexNavbar/>
    </main>
  )
}
