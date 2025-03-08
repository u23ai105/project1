'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "John Doe",
    review: "Amazing service! The team was professional and thorough.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=200&h=200"
  },
  {
    id: 2,
    name: "Jane Smith",
    review: "Made my life so much easier. Highly recommended!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=200&h=200"
  },
  {
    id: 3,
    name: "Alex Johnson",
    review: "Absolutely fantastic experience. 10/10!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=200&h=200"
  },
  {
    id: 4,
    name: "Emily Davis",
    review: "Great team and excellent results!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=200&h=200"
  }
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextReview = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + reviews.length) % reviews.length);
  };

  const getVisibleReviews = () => {
    return [
      reviews[currentIndex % reviews.length],
      reviews[(currentIndex + 1) % reviews.length],
      reviews[(currentIndex + 2) % reviews.length],
      reviews[(currentIndex + 3) % reviews.length]
    ];
  };

  return (
    <div className="relative  bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-center tracking-tight pb-10">
          Client Reviews
        </h2>

        <div className="relative">
          <AnimatePresence mode="popLayout" initial={false}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {getVisibleReviews().map((review, index) => (
                <motion.div
                  key={`${review.id}-${currentIndex}`}
                  initial={{ 
                    opacity: 0,
                    y: direction * 50,
                    scale: 0.9
                  }}
                  animate={{ 
                    opacity: 1,
                    y: 0,
                    scale: 1
                  }}
                  exit={{ 
                    opacity: 0,
                    y: -direction * 50,
                    scale: 0.9
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: index * 0.1
                  }}
                  className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-colors"
                >
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-20 h-20 rounded-full mx-auto mb-6 object-cover border-2 border-white/20"
                  />
                  <h3 className="text-xl font-semibold text-center mb-4">{review.name}</h3>
                  <p className="text-gray-400 text-center italic">"{review.review}"</p>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-6 mt-12 ">
          <button 
            onClick={prevReview}
            className="p-3 rounded-full border border-white/20 hover:border-white/40 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextReview}
            className="p-3 rounded-full border border-white/20 hover:border-white/40 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}