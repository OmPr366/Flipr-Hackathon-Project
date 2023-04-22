import Image from 'next/image'
import { Inter } from 'next/font/google'
import ComplexNavbar from '@/components/Navbar'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from "@/utils/Redux/UserSlice";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const dispatch = useDispatch()

  const getUser = async () => {
    const { data } = await axios.get(`http://localhost:3001/auth/user`, { withCredentials: true })
    console.log(data);
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
      dispatch(setUser(data));
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <main className="flex min-h-screen flex-col p-0 items-center">
      <ComplexNavbar />
    </main>
  )
}
