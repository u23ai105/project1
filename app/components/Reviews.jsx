import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    review: "Amazing service! Highly recommended.",
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 2,
    name: "Jane Smith",
    review: "Professional and top-notch work. Will use again!",
    image: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: 3,
    name: "Alex Johnson",
    review: "Absolutely fantastic experience. 10/10!",
    image: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    id: 4,
    name: "Emily Davis",
    review: "Great team and excellent results!",
    image: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    id: 5,
    name: "Michael Brown",
    review: "Very satisfied with the service.",
    image: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  {
    id: 6,
    name: "Sarah Wilson",
    review: "Outstanding quality and attention to detail.",
    image: "https://randomuser.me/api/portraits/women/6.jpg"
  }
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for previous

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

  const transitionConfig = (index) => ({
    type: "spring",
    stiffness: 100,
    damping: 20,
    delay: index * 0.1
  });

  const getAnimation = (index) => {
    const offset = direction === 1 ? 100 : -100;
    return {
      initial: { 
        opacity: 0, 
        y: (index % 2 === 0 ? -50 : 50) * direction,
        x: offset
      },
      animate: { 
        opacity: 1, 
        y: 0,
        x: 0
      },
      exit: { 
        opacity: 0, 
        y: (index % 2 === 0 ? 50 : -50) * -direction,
        x: -offset
      }
    };
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-gray-500 rounded-2xl shadow-lg w-full max-w-7xl mx-auto mt-16">
      <h2 className="text-3xl font-bold mb-6">Client Reviews</h2>
      <div className="relative w-full">
        <AnimatePresence mode="popLayout" initial={false}>
          <div className="grid grid-cols-4 gap-6 px-4">
            {getVisibleReviews().map((review, index) => (
              <motion.div
                key={`${review.id}-${currentIndex}`}
                {...getAnimation(index)}
                transition={transitionConfig(index)}
                className="text-center bg-white p-8 rounded-xl shadow-lg h-80 flex flex-col items-center justify-between"
              >
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-20 h-20 rounded-full mb-4 border-2 border-blue-500"
                />
                <div>
                  <h3 className="text-lg font-semibold mb-2">{review.name}</h3>
                  <p className="text-gray-600 italic">"{review.review}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
      <div className="flex gap-6 mt-8">
        <button 
          onClick={prevReview} 
          className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition hover:scale-110"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextReview} 
          className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition hover:scale-110"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}