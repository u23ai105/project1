'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCookies } from 'react-cookie';

const categories = [
  "All",
  "Appliance Installation & Setup",
  "Bathroom & Kitchen Services",
  "Furniture & Home Cleaning",
  "Home Installation & Repairs",
  "Appliance Uninstallation"
];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [bookingDate, setBookingDate] = useState(null);
  const [bookingTime, setBookingTime] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [services, setServices] = useState([]);
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const encodedCategory = encodeURIComponent(selectedCategory);
        const response = await fetch(`/api/services?category=${encodedCategory}`);
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };

    fetchServices();
  }, [selectedCategory]);

  const filteredServices = services
    .filter(service => 
      service && service.items && service.items.length > 0 &&
      service.items.some(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .flatMap(service => service.items);

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM"
  ];

  const handleAddToCart = async () => {
    if (selectedService) {
      try {
        const cartItem = {
          serviceId: selectedService._id,
          title: selectedService.title,
          actualprice: selectedService.actualprice,
          discountedprice: selectedService.discountedprice,
          image: selectedService.image,
          bookingDate,
          bookingTime,
          quantity
        };
  
        console.log('Sending to cart:', cartItem);
  
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies.token}`
          },
          body: JSON.stringify(cartItem)
        });
  
        if (!response.ok) throw new Error('Failed to add service to cart');
        const data = await response.json();
        console.log('Service added to cart:', data);
  
        setSelectedService(null);
        setBookingDate(null);
        setBookingTime("");
        setQuantity(1);
      } catch (error) {
        console.error('Error adding service to cart:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
          <div className="w-full md:w-64 space-y-4 ">
            <h3 className="text-lg font-semibold text-gray-300">Categories</h3>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedCategory === category
                    ? 'bg-gray-500 text-white'
                    : 'bg-slate-400 text-black font-medium hover:bg-gray-50'
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
                <div key={service._id} className="bg-neutral-900 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-slate-100">{service.title}</h3>
                    <p className="text-gray-300 mb-4">{service.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex flex-row items-center">
                        <span className="text-xl font-semibold line-through text-gray-200">
                          {service.actualprice} ₹
                        </span>
                        <span className="text-xl font-semibold text-white ml-2">
                          {service.discountedprice} ₹
                        </span>
                      </div>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xl font-semibold line-through text-gray-500">
                    {selectedService.actualprice} INR
                  </span>
                  <span className="text-xl font-semibold text-blue-600 ml-2">
                    {selectedService.discountedprice} INR
                  </span>
                </div>
                <span className="text-xl font-semibold">
                  Total: {selectedService.discountedprice * quantity} INR
                </span>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!bookingDate || !bookingTime || quantity < 1}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}