'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const imageLinks = [
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1601612628452-9e99ced43524?q=80&w=2674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  "https://media.istockphoto.com/id/1349990426/photo/electrical-services.jpg?s=612x612&w=0&k=20&c=jst5ZhntTf7H5q06d0GvHipMorcvQQmWgqC5v9QYkbE=",
  "https://rosaleandservices.com/wp-content/uploads/2021/07/20210718_154401-scaled.jpg",
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1581428982868-e410dd047a90?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1632935190508-bd46801c14af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
];

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const gridSize = 250;
      const newX = Math.floor(e.clientX / gridSize);
      const newY = Math.floor(e.clientY / gridSize);

      if (newX !== mousePosition.x || newY !== mousePosition.y) {
        setMousePosition({ x: newX, y: newY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mousePosition]);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <div className="background-animation">
          {imageLinks.map((src, i) => (
            <div
              key={i}
              className="animated-image"
              style={{
                top: `${Math.random() * 90}%`,
                left: `${Math.random() * 90}%`,
                animationDelay: `${Math.random() * 50}s`,
                transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`
              }}
            >
              <img src={src} alt="Background" className="w-48 h-36 object-cover rounded-3xl box-shadow"/>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-red-800 px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-center tracking-tight leading-none">
          Helper
          <span className="block mt-2">Buddy</span>
        </h1>
        <p className="text-xl md:text-2xl text-blue-300  mb-12 text-center max-w-2xl mx-auto leading-relaxed">
          Your trusted partner for everyday assistance, making life easier one task at a time
        </p>
        
        <button
          onClick={scrollToServices}
          className="absolute bottom-12 animate-bounce p-2 rounded-full border border-white/20 hover:border-white/40 transition-colors"
        >
          <ChevronDown size={80} />
        </button>
      </div>

      <style jsx>{`
        .background-animation {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .animated-image {
          position: absolute;
          animation: float 30s infinite ease-in-out;
        }

        .animated-image img {
          box-shadow: 0 0 25px rgba(255, 255, 255, 1);
        }

        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}