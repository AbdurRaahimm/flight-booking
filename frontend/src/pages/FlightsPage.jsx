import React, { useState, useEffect } from 'react'
import { useFlights } from '../context/FlightContext';
import { Link } from 'react-router-dom';

export default function FlightsPage() {
  const { flights } = useFlights();
  const [currentPage, setCurrentPage] = useState(1);
  const [flightsPerPage] = useState(5);
  const [filteredFlights, setFilteredFlights] = useState(flights);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [minSeats, setMinSeats] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    filterFlights();
  }, [priceRange, selectedAirlines, minSeats, flights]);

  const filterFlights = () => {
    const filtered = flights.filter(flight => 
      flight.price >= priceRange[0] && 
      flight.price <= priceRange[1] &&
      (selectedAirlines.length === 0 || selectedAirlines.includes(flight.airline)) &&
      flight.availableSeats >= minSeats
    );
    setFilteredFlights(filtered);
    setCurrentPage(1);
  };

  // Get current flights
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = filteredFlights.slice(indexOfFirstFlight, indexOfLastFlight);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const airlines = [...new Set(flights.map(flight => flight.airline))];

  return (
    <div className='py-8 flex'>
      {/* Sidebar */}
      <div className={`fixed inset-y-10 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-20 md:relative md:translate-x-0`}>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Filters</h3>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-2 right-2 p-2 text-2xl font-bold text-gray-500 hover:text-gray-700 md:hidden"
          >
            &times;
          </button>
          <div className="mb-4">
            <h4 className="font-medium mb-2">Price Range</h4>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="100000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm font-medium text-gray-900">${priceRange[1]}</span>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="font-medium mb-2">Airlines</h4>
            {airlines.map(airline => (
              <div key={airline} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={airline}
                  checked={selectedAirlines.includes(airline)}
                  onChange={() => {
                    setSelectedAirlines(prev => 
                      prev.includes(airline) 
                        ? prev.filter(a => a !== airline)
                        : [...prev, airline]
                    )
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={airline} className="ml-2 text-sm font-medium text-gray-900">{airline}</label>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h4 className="font-medium mb-2">Minimum Available Seats</h4>
            <input
              type="number"
              value={minSeats}
              onChange={(e) => setMinSeats(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <div className="text-center">
          <h2 className='text-xl sm:text-2xl font-bold capitalize'>All flights</h2>
        </div>
        {!isSidebarOpen && (
          <button 
            className="md:hidden fixed top-4 left-4 z-30 bg-blue-600 text-white p-2 rounded mt-10"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            Open
          </button>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8 px-4">
          {currentFlights.map((flight) => (
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

        <div className="flex justify-center mt-8">
          {Array.from({ length: Math.ceil(filteredFlights.length / flightsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
