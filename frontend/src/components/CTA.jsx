import { Link } from 'react-router-dom';
import { Plane } from 'lucide-react'

export default function CTA() {
    return (
        <div className="container py-0">
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/20 backdrop-blur-xl " />
                <div className="relative flex flex-col md:flex-row items-center justify-between p-12 md:p-16">
                    <div className="mb-8 md:mb-0 max-w-lg">
                        <h2 className="text-4xl font-bold mb-4 flex items-center gap-4">
                            It&apos;s time to discover
                            <div className="relative">
                                <div className="absolute inset-0 animate-ping bg-blue-600/20 rounded-full" />
                                <Plane className="h-10 w-10 text-blue-600 transform -rotate-45" />
                            </div>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Start your journey today and explore amazing destinations around the world with our exclusive deals and premium service.
                        </p>
                    </div>
                    <Link to="/flights">
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-sm shadow-lg shadow-blue-600/20 transition-transform hover:scale-105"
                        >
                            Book a Flight
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

