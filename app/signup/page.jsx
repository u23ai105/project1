import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Services() {
  const scrollRef = useRef(null);
  const [servicesList, setServicesList] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        const data = await response.json();
        setServicesList(data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const scroll = () => {
      if (scrollRef.current) {
        const scrollPosition = scrollRef.current.scrollLeft;
        if (scrollPosition >= scrollRef.current.children[0].clientWidth * servicesList.length) {
          scrollRef.current.scrollLeft = 0;
        } else {
          scrollRef.current.scrollLeft += 1;
        }
      }
    };

    let interval = setInterval(scroll, 30);

    return () => clearInterval(interval);
  }, [servicesList]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0">
        <source src="/videos/background.mp4" type="video/mp4" autoPlay/>
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
      <div className="relative z-20 max-w-7xl mx-auto py-16 px-6 text-white">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-blue-400 tracking-wide">
          Our Services
        </h2>
        <div className="overflow-hidden relative">
          <div
            ref={scrollRef}
            className="flex gap-10 overflow-x-auto whitespace-nowrap no-scrollbar"
            style={{ scrollBehavior: "smooth", scrollbarColor: "transparent transparent" }}
          >
            {servicesList.map((service, index) => (
              <div
                key={index}
                className="min-w-[280px] bg-white bg-opacity-90 rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <div className="p-6 text-gray-900">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-700 mb-4">{service.description}</p>
                  <Link 
                    href="/services" 
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}