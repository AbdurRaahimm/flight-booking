
import React from 'react'
import { useFlights } from '../context/FlightContext'
import { Link } from 'react-router-dom';

export default function Flights({ show }) {
    const { flights } = useFlights();
    // console.log(flights)
    return (
        <div className='py-8'>
            <div className="text-center">
                <h2 className='text-xl sm:text-2xl font-bold capitalize'>popular destination</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8 px-4">
                {flights.slice(0, show).map((flight) => (
                    <div key={flight._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-semibold">{flight.airline}</h3>
                                <p className="text-gray-600 text-sm">Flight {flight.flightNumber}</p>
                            </div>
                            <span className="text-lg font-bold text-blue-600">${flight.price}</span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">From:</span>
                                <span className="font-medium">{flight.origin}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">To:</span>
                                <span className="font-medium">{flight.destination}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Date:</span>
                                <span className="font-medium">{new Date(flight.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Time:</span>
                                <span className="font-medium">
                                    {new Date(`2000-01-01 ${flight.time}`).toLocaleTimeString('en-US', {
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        hour12: true
                                    })}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Available Seats:</span>
                                <span className="font-medium">{flight.availableSeats}</span>
                            </div>
                            <div className="mt-4">
                                <Link
                                    to={`/flight/${flight._id}`}
                                    className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
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
