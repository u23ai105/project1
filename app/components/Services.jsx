'use client';

import { useState, useEffect } from 'react';

const ServiceCard = ({ name, image }) => (
  <div className="relative flex-shrink-0 w-72 h-72 rounded-xl overflow-hidden shadow-2xl transition-transform duration-300 transform hover:scale-105">
    <div className="absolute inset-0">
      <img src={image} alt={name} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    </div>
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
      <h3 className="text-xl font-bold text-center">{name}</h3>
    </div>
  </div>
);

const AnimatedRow = ({ items, direction = 'left', speed = 30 }) => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div 
      className="flex gap-8 py-8"
      style={{
        animation: `scroll ${speed}s linear infinite ${direction === 'right' ? 'reverse' : 'normal'}`,
        animationPlayState: isPaused ? 'paused' : 'running',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {items.map((service, index) => (
        <ServiceCard
          key={`${service.title}-${index}`}
          name={service.title}
          image={service.image}
        />
      ))}
    </div>
  );
};

export default function ServicesPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        console.log('Fetched services:', data); // Debug log

        // Flatten the services data
        const flattenedServices = data.flatMap(category => category.items);
        setServices(flattenedServices);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <main className=" bg-black text-white overflow-hidden">
      <div className="container mx-auto py-16">
        <h1 className="text-5xl font-bold text-center mb-16">Our Services</h1>
        <div className="overflow-hidden">
          <AnimatedRow items={services} direction="left" speed={30} />
        </div>
      </div>
    </main>
  );
}