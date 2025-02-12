'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const categories = [
  "All",
  "Home Services",
  "Personal Assistant",
  "Professional Services",
  "Tech Support",
  "Health & Wellness"
]

const initialServices = [
  {
    id: 1,
    title: "Personal Assistant",
    category: "Personal Assistant",
    image: "https://images.unsplash.com/photo-1552960562-daf630e9278b?auto=format&fit=crop&q=80&w=600",
    description: "Your dedicated assistant for daily tasks and organization",
    price: 25,
    bookings: 150
  },
  {
    id: 2,
    title: "Home Cleaning",
    category: "Home Services",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=600",
    description: "Professional home cleaning services",
    price: 35,
    bookings: 200
  },
  {
    id: 3,
    title: "Tech Support",
    category: "Tech Support",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
    description: "Expert technical support for all your devices",
    price: 40,
    bookings: 120
  },
  {
    id: 4,
    title: "Fitness Training",
    category: "Health & Wellness",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600",
    description: "Personalized fitness training sessions",
    price: 45,
    bookings: 180
  },
  {
    id: 5,
    title: "Business Consulting",
    category: "Professional Services",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
    description: "Expert business advice and strategy",
    price: 60,
    bookings: 90
  },
  {
    id: 6,
    title: "Ac installation",
    category: "Professional Services",
    image: "https://www.vecteezy.com/free-photos/ac-installation",
    description: "Expert in ac installation",
    price: 30,
    bookings: 90
  },
  {
    id: 7,
    title: "Plumber",
    category: "Home Services",
    image: "https://www.vecteezy.com/free-photos/ac-installation",
    description: "Expert in plumbing",
    price: 20,
    bookings: 80
  }
].sort((a, b) => b.bookings - a.bookings)

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedService, setSelectedService] = useState(null)
  const [bookingDate, setBookingDate] = useState(null)
  const [bookingTime, setBookingTime] = useState("")
  const [cart, setCart] = useState([])

  const filteredServices = initialServices
    .filter(service => 
      (selectedCategory === "All" || service.category === selectedCategory) &&
      service.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM"
  ]

  const handleAddToCart = () => {
    if (selectedService) {
      const updatedCart = [...cart, {
        ...selectedService,
        bookingDate,
        bookingTime
      }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setSelectedService(null);
      setBookingDate(null);
      setBookingTime("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Categories */}
          <div className="w-full md:w-64 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map(service => (
                <div key={service.id} className="bg-white rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-blue-600">${service.price}/hr</span>
                      <span className="text-sm text-gray-500">{service.bookings} bookings</span>
                    </div>
                    <button
                      onClick={() => setSelectedService(service)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{selectedService.title}</h3>
              <button
                onClick={() => setSelectedService(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Date
                </label>
                <DatePicker
                  selected={bookingDate}
                  onChange={(date) => setBookingDate(date)}
                  minDate={new Date()}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholderText="Select date"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Time
                </label>
                <select
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select time</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold">
                  Total: ${selectedService.price}
                </span>
                <button
                  onClick={handleAddToCart}
                  disabled={!bookingDate || !bookingTime}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}