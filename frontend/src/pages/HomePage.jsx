import React from 'react'
import HeroSection from '../components/HeroSection'
import { Plane } from 'lucide-react'
import Flights from '../components/Flights'
import { Link } from 'react-router-dom'

export default function HomePage() {

  return (
    <>
      <HeroSection />
      
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 py-6 gap-6 mx-auto">
        <div className="text-center">
          <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Plane className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Wide Selection  </h3>
          <p className="text-gray-600">
            Choose from thousands of flights to destinations worldwide
          </p>
        </div>
        <div className="text-center">
          <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <svg
              className="h-8 w-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Best Prices</h3>
          <p className="text-gray-600">
            Get competitive prices and special deals on flights
          </p>
        </div>
        <div className="text-center">
          <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <svg
              className="h-8 w-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Secure Booking</h3>
          <p className="text-gray-600">
            Book with confidence using our secure payment system
          </p>
        </div>
      </div>

      <Flights show={3} />

      <section className="relative bg-[#f9f9f9] px-6 py-12 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className="space-y-4 max-w-xl">
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight flex items-center gap-2">
                It's time to discover
                <span role="img" aria-label="airplane" className="inline-block">
                  ✈️
                </span>
              </h1>
              <p className="text-muted-foreground text-sm">
                He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy.
              </p>
            </div>
            <div className=" hidden lg:block">
              <svg
                width="100"
                height="50"
                viewBox="0 0 100 50"
                fill="none"
                className="text-indigo-500"
              >
                <path
                  d="M0,25 Q25,25 50,25 T100,25"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  fill="none"
                />
                <polygon
                  points="90,20 100,25 90,30"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="mt-3">

              <Link
               to="/flights"
               className="bg-blue-700 text-white hover:bg-blue-700/80 px-3 py-2 rounded-lg transition-colors">
                Book a Flight
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}


