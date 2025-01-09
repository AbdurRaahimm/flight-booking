import React from 'react'
import HeroSection from '../components/HeroSection'
import { Plane } from 'lucide-react'
import Flights from '../components/Flights'
import { Link } from 'react-router-dom'
import Features from '../components/Features'

export default function HomePage() {

  return (
    <>
      <HeroSection />

      <Features />
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


