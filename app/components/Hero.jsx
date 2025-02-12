'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'

const backgroundImages = [
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1552960562-daf630e9278b?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1920"
]

export default function Hero() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[calc(100vh-4rem)] flex items-center justify-center">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/60" />
            <img
              src={image}
              alt={`Background ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto text-center">
        <div className="animate-fade-in space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Your Personal Helper-Buddy
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Making your daily tasks easier and more efficient
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md sm:max-w-lg md:max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for services..."
              className="w-full px-4 py-3 sm:py-4 rounded-lg border border-gray-300 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 text-gray-800 text-lg"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  )
}