import { useFlights } from '../context/FlightContext'
import { Link } from 'react-router-dom';
import { ArrowRight, Plane, Calendar, Clock, Users } from 'lucide-react'

// eslint-disable-next-line react/prop-types
export default function Flights({ show }) {
    const { flights } = useFlights();
    // console.log(flights)
    return (
        <div className='py-8'>
            <div className="text-center">
                <h2 className='text-xl sm:text-3xl font-bold capitalize'>popular destination</h2>
                <p className="text-gray-600 "> Discover our most booked routes with exclusive deals and competitive prices</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8 px-4">
        {flights.slice(0, show).map((flight) => (
          <div 
            key={flight._id} 
            className="group relative overflow-hidden rounded-3xl shadow-lg transition-all duration-300 hover:shadow-2xl bg-white border border-gray-200"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-blue-600" />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-2">
                    {flight.airline}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{flight.origin} to {flight.destination}</h3>
                  <p className="text-gray-600">Flight {flight.flightNumber}</p>
                </div>
                <div className="text-right">
                  {/* <p className="text-sm text-gray-500">from</p> */}
                  <p className="text-3xl font-bold text-blue-600">${flight.price}</p>
                </div>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                  <span>{new Date(flight.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2 text-blue-500" />
                  <span>{new Date(`2000-01-01 ${flight.time}`).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    })}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2 text-blue-500" />
                  <span>{flight.availableSeats} seats available</span>
                </div>
              </div>
              <Link to={`/flight/${flight._id}`}>
              <button 
                className="flex justify-center items-center py-2 rounded-md w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
              >
                <Plane className="mr-2 h-4 w-4" />
                View Details
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              </Link>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </div>
        ))}
      </div>
            {flights.length > show && (
                <div className="flex justify-center mt-8">
                    <Link 
                        to="/flights"
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        See More Flights
                    </Link>
                </div>
            )}
        </div>
    )
}
