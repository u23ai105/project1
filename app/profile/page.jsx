'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useCookies } from 'react-cookie'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [cookies] = useCookies(['token'])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [profileImage, setProfileImage] = useState(null)
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/profile', {
          headers: {
            Authorization: `Bearer ${cookies.token}`
          }
        })
        if (!response.ok) throw new Error('Failed to fetch user profile')
        const data = await response.json()
        setUser(data.user)
        setProfileImage(data.user.profileImage || null)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (cookies.token) {
      fetchUserProfile()
    }
  }, [cookies.token])

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append('profileImage', file)
    
    try {
      const response = await fetch('/api/upload-profile', {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) throw new Error('Failed to upload profile image')
      const data = await response.json()
      setProfileImage(data.imageUrl)
    } catch (error) {
      console.error('Image upload error:', error)
    }
  }

  if (loading) return <div className="h-screen flex items-center justify-center text-white text-xl">Loading...</div>
  if (error) return <div className="h-screen flex items-center justify-center text-red-500 text-xl">Error: {error}</div>
  if (!user) return <div className="h-screen flex items-center justify-center text-gray-500 text-xl">No user data available</div>

  return (
    <div className="min-h-screen bg-white text-white font-sans">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-28">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          className="text-4xl font-extrabold text-center mb-8 tracking-wide">
          User Profile
        </motion.h1>
        <div className="bg-[#0d031b] rounded-lg shadow-xl p-8 space-y-6">
          <motion.h2 className="text-2xl font-semibold mb-4 tracking-wide" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>Personal Details</motion.h2>
          <div className="flex items-center space-x-4">
            <img src={profileImage || '/default-avatar.png'} alt="Profile" className="w-24 h-24 rounded-full border-2 border-gray-500" />
            <input type="file" onChange={handleImageUpload} className="text-sm text-gray-400" />
          </div>
          <TypingText label="Email" text={user.email} />
          <TypingText label="Username" text={user.username} />
          <TypingText label="Phone" text={user.phonenumber} />
        </div>
        <div className="mt-10">
          <motion.h2 className="text-2xl font-semibold mb-4 tracking-wide" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>Active Orders</motion.h2>
          <AnimatedList items={user.currentOrders} />
        </div>
        <div className="mt-10">
          <motion.h2 className="text-2xl font-semibold mb-4 tracking-wide" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>Order History</motion.h2>
          <AnimatedList items={user.previousOrders} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

function TypingText({ label, text }) {
  const [displayText, setDisplayText] = useState('')
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i + 1))
      i++
      if (i === text.length) clearInterval(interval)
    }, 40)
    return () => clearInterval(interval)
  }, [text])
  return (
    <p className="mb-3 text-lg leading-relaxed"><strong>{label}:</strong> <span className="text-gray-300">{displayText}</span></p>
  )
}

function AnimatedList({ items }) {
  return (
    <ul className="space-y-4">
      {items.map((order, index) => (
        <motion.li 
          key={index} 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: index * 0.2 }}
          className="p-5 bg-gray-800 rounded-lg shadow-md">
          <p className="text-lg"><strong>Service:</strong> {order.title}</p>
          <p className="text-lg"><strong>Date:</strong> {new Date(order.bookingDate).toLocaleDateString()}</p>
          <p className="text-lg"><strong>Time:</strong> {order.bookingTime}</p>
          <p className="text-lg"><strong>Status:</strong> {order.status}</p>
        </motion.li>
      ))}
    </ul>
  )
}
