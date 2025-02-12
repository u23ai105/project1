'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCookies } from 'react-cookie'
import Logout from '../components/shared/logout'
import AnimatedHamburgerButton from '../../components/ui/animatedbutton'
import Logo from '../../public/icons/buddy.svg';
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cookies] = useCookies(['token'])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = cookies.token
      console.log('🔍 Token from cookies:', token) // Debugging line
      setIsLoggedIn(!!token)
    }
  }, [cookies])

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex justify-start items-end">
            <Link href="/"><Logo width={160} height={80} /></Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link href="/services" className="text-gray-700 hover:text-blue-600">Services</Link>
            <Link href="/features" className="text-gray-700 hover:text-blue-600">Features</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">About Us</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart" className="text-gray-700 hover:text-blue-600">
              <ShoppingCart className="w-6 h-6" />
            </Link>
            {isLoggedIn ? (
              <>
                <Link href="/profile">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Profile
                  </button>
                </Link>
                <Logout className="rounded-2xl border-1  border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none" />
              </>
            ) : (
              <>
                <Link href="/login">
                <button className="rounded-2xl border-1  border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">Login</button>
                </Link>
                <Link href="/signup">
                <button className="rounded-2xl border-1  border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">Sign Up</button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <AnimatedHamburgerButton onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Home</Link>
            <Link href="/services" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Services</Link>
            <Link href="/features" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Features</Link>
            <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-blue-600">About Us</Link>
            <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Contact</Link>
            {isLoggedIn ? (
              <>
                <Link href="/profile" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Profile</Link>
                <Logout />
              </>
            ) : (
              <>
                <Link href="/login" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Login</Link>
                <Link href="/signup" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}