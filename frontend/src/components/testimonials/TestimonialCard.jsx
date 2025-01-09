/* eslint-disable react/prop-types */

import { Star } from "lucide-react";


export default function TestimonialCard({
    quote = "Passage its ten led hearted removal cordial. Preference any astonished unreserved Mrs. understood the Preference unreserved.",
    author = "Carolyn Ortiz",
    role = "Ceo of Google",
    image = "/placeholder.svg",
    rating = 5
}) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto p-6">
    <div className="relative">
      {/* Emoji icon */}
      <div className="absolute -top-2 -left-2 z-10 bg-orange-500 rounded-lg p-2">
        <span className="text-xl" role="img" aria-label="laughing emoji">
          😆
        </span>
      </div>
      
      {/* Main image */}
      <div className="relative w-64 h-64 bg-pink-100 rounded-lg overflow-hidden">
        <img
          src={image}
          alt={`Review by ${author}`}
          className="object-cover"
        />
      </div>
    </div>

    <div className="flex flex-col gap-4 md:max-w-sm">
      {/* Quote mark */}
      <div className="text-6xl text-indigo-600 font-serif">&quot;</div>
      
      {/* Testimonial text */}
      <blockquote className="text-xl font-medium">
        {quote}
      </blockquote>

      {/* Star rating */}
      <div className="flex gap-1">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Author info */}
      <div className="mt-2">
        <div className="font-semibold text-lg">{author}</div>
        <div className="text-gray-600">{role}</div>
      </div>
    </div>
  </div>
  )
}
