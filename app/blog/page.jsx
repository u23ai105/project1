"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const services = [
  {
    id: 1,
    title: "Professional Makeup Services",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: [
      "Transform your look with our professional makeup artists who bring years of experience and creativity to every session.",
      "Using premium cosmetic products, we ensure that your makeup not only looks stunning but also stays perfect throughout your event.",
      "From natural day looks to glamorous evening makeup, we customize our services to match your style and preferences."
    ]
  },
  {
    id: 2,
    title: "Premium Cosmetics",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: [
      "Discover our curated collection of high-end cosmetics from renowned brands worldwide.",
      "Each product is carefully selected to ensure quality, safety, and exceptional results.",
      "Our experts provide personalized recommendations based on your skin type and preferences."
    ]
  },
  {
    id: 3,
    title: "Home Cleaning Excellence",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: [
      "Experience the difference with our professional home cleaning services, delivering spotless results every time.",
      "Our trained cleaning specialists use eco-friendly products and advanced techniques to ensure your home shines.",
      "From regular maintenance to deep cleaning, we customize our services to meet your specific needs."
    ]
  },
  {
    id: 4,
    title: "Premium Home Services",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: [
      "Comprehensive home maintenance services delivered by skilled professionals.",
      "From repairs to renovations, we handle all aspects of home care with attention to detail.",
      "Our team of experts ensures quality workmanship and timely completion of all projects."
    ]
  },
  {
    id: 5,
    title: "Skincare Consultations",
    image: "https://images.unsplash.com/photo-1601612628452-9e99ced43524?q=80&w=2674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: [
      "Get personalized skincare advice from our certified dermatologists and beauty experts.",
      "Learn about the best products and routines for your specific skin type and concerns.",
      "Receive customized treatment plans to achieve your skincare goals effectively."
    ]
  },
  {
    id: 6,
    title: "Bridal Beauty Packages",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: [
      "Comprehensive bridal beauty services to make your special day perfect.",
      "From pre-wedding skincare routines to the final makeup look, we've got you covered.",
      "Experience luxury treatment with our premium bridal packages and professional team."
    ]
  },
  {
    id: 7,
    title: "Home Organization",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: [
      "Transform your living space with our professional organization services.",
      "Learn effective storage solutions and maintenance tips from our experts.",
      "Create a clutter-free, peaceful environment that enhances your daily life."
    ]
  },
  {
    id: 8,
    title: "Garden Maintenance",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: [
      "Professional garden care services to keep your outdoor space beautiful year-round.",
      "Expert landscaping and maintenance from our experienced horticulturists.",
      "Sustainable gardening practices that protect the environment while enhancing your property."
    ]
  },
  {
    id: 9,
    title: "Wellness Workshops",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: [
      "Join our expert-led workshops on health, beauty, and wellness.",
      "Learn about natural beauty remedies and holistic self-care practices.",
      "Connect with like-minded individuals in our wellness community."
    ]
  },
  {
    id: 10,
    title: "Interior Styling",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: [
      "Transform your space with our professional interior styling services.",
      "Get personalized design recommendations that match your style and budget.",
      "Create beautiful, functional spaces that reflect your personality."
    ]
  },
  {
    id: 11,
    title: "Sustainable Living",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: [
      "Discover eco-friendly products and practices for a sustainable lifestyle.",
      "Learn about reducing your environmental impact while maintaining style.",
      "Join our community of environmentally conscious consumers."
    ]
  },
  {
    id: 12,
    title: "Home Tech Solutions",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: [
      "Smart home installation and setup services for modern living.",
      "Expert guidance on choosing and implementing home automation systems.",
      "Enhance your home's efficiency and convenience with cutting-edge technology."
    ]
  },
  {
  id: 13,
    title: "AC Repair & Maintenance",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: [
      "Professional AC repair and maintenance services by certified technicians.",
      "Regular servicing, deep cleaning, and performance optimization for all AC brands.",
      "Emergency repair services available with quick response time."
    ]
  },
  {
    id: 14,
    title: "TV & Home Theater Installation",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: [
      "Expert TV mounting and home theater setup services.",
      "Professional cable management and optimal positioning for the best viewing experience.",
      "Setup and configuration of smart TV features and streaming devices."
    ]
  },
  {
    id: 15,
    title: "Classic Bathroom Cleaning",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: [
      "Standard bathroom cleaning and sanitization.",
      "Tile and grout cleaning services.",
      "Mold prevention and treatment."
    ]
  },
  {
    id: 16,
    title: "Geyser & Water Heater Services",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: [
      "Installation and repair of all types of water heaters and geysers.",
      "Regular maintenance and safety checks for optimal performance.",
      "Energy efficiency optimization and consultation."
    ]
  },
  {
    id: 17,
    title: "Fan Installation & Repair",
    image: "https://media.istockphoto.com/id/1349990426/photo/electrical-services.jpg?s=612x612&w=0&k=20&c=jst5ZhntTf7H5q06d0GvHipMorcvQQmWgqC5v9QYkbE=",
    description: [
      "Professional installation of ceiling and wall fans.",
      "Repair and maintenance services for all fan types.",
      "Balance adjustment and noise reduction solutions."
    ]
  },
  {
    id: 18,
    title: "Water Purifier Maintenance",
    image: "https://rosaleandservices.com/wp-content/uploads/2021/07/20210718_154401-scaled.jpg",
    description: [
      "Regular maintenance and filter replacement for water purifiers.",
      "Water quality testing and consultation.",
      "Repair services for all major water purifier brands."
    ]
  },
  {
    id: 19,
    title: "Electrical Services",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: [
      "Professional switchbox installation and repair.",
      "Electrical safety inspections and upgrades.",
      "24/7 emergency electrical services available."
    ]
  },
  {
    id: 20,
    title: "Washing Machine Services",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: [
      "Installation and uninstallation of all washing machine types.",
      "Maintenance services for semi-automatic and fully automatic machines.",
      "Expert repair services with genuine spare parts."
    ]
  },
  {
    id: 21,
    title: "Furniture Cleaning",
    image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: [
      "Professional cleaning of dining tables, chairs, and all furniture types.",
      "Specialized cleaning solutions for different materials.",
      "Protective coating application for long-lasting results."
    ]
  },
  {
    id: 22,
    title: "Refrigerator Maintenance",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: [
      "Comprehensive service for all refrigerator types.",
      "Performance optimization and energy efficiency checks.",
      "Regular maintenance and deep cleaning services."
    ]
  },
  {
    id: 23,
    title: "Cushion & Upholstery Cleaning",
    image: "https://images.unsplash.com/photo-1632935190508-bd46801c14af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: [
      "Deep cleaning services for all types of cushions and upholstery.",
      "Stain removal and fabric protection treatments available.",
      "Eco-friendly cleaning solutions safe for your family and pets."
    ]
  },
  
  {
    id: 24,
    title: "Intense Bathroom Cleaning",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description: [
      "Deep cleaning and disinfection of multiple bathrooms.",
      "Advanced stain removal and surface restoration.",
      "Complete sanitization and odor elimination."
    ]
  }
];

export default function Home() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white">
        <Navbar />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <h1 className="text-5xl font-bold text-center mb-20 tracking-tight">
          Our Latest Blogs
        </h1>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedService(service)}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={service.image}
                  alt={service.title}
                  className="object-cover w-full h-full fit-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity group-hover:bg-opacity-60">
                <h3 className="text-xl font-semibold text-center px-4">
                  {service.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black border border-white rounded-lg max-w-3xl w-full p-6 relative overflow-y-auto max-h-full"
          >
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-3xl font-bold mb-6">{selectedService.title}</h2>
            
            <div className="aspect-w-16 aspect-h-9 mb-6">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            
            <div className="space-y-4">
              {selectedService.description.map((para, index) => (
                <p key={index} className="text-gray-300 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
      <Footer />
    </div>
  );
}