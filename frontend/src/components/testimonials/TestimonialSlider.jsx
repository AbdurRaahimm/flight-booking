import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);


  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
   <div className="bg-white">
     <div className="relative w-8/12 mx-auto overflow-hidden transition-all ">
      <div className="flex items-center justify-center min-h-[400px] px-4">
        <TestimonialCard {...testimonials[currentIndex]} />
      </div>

      {/* Navigation buttons */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          size="icon"
          className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous slide</span>
        </button>
        <button
          size="icon"
          className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next slide</span>
        </button>
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex items-center justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex ? "bg-indigo-600 w-4" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <span className="sr-only">Go to slide {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
   </div>
  );
}

const testimonials = [
  {
    quote:
      "Passage its ten led hearted removal cordial. Preference any astonished unreserved Mrs. understood the Preference unreserved.",
    author: "Carolyn Ortiz",
    role: "Ceo of Google",
    image: "https://themes.stackbros.in/booking_r/assets/02-UdmfvO88.jpg",
    rating: 5,
  },
  {
    quote:
      "Another great experience! The team was very helpful and responsive to all our needs.",
    author: "Sarah Chen",
    role: "Product Manager",
    image: "https://themes.stackbros.in/booking_r/assets/01-A46SX7OM.jpg",
    rating: 5,
  },
  {
    quote:
      "Exceptional service and attention to detail. Would highly recommend!",
    author: "Michael Park",
    role: "Creative Director",
    image: "https://themes.stackbros.in/booking_r/assets/01-A46SX7OM.jpg",
    rating: 5,
  },
];
