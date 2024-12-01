import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useFlights } from '../context/FlightContext';
import { Clock, Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const { flights, searchFlights } = useFlights();
  const hasFetched = useRef(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  // const origin = searchParams.get('origin')?.toLowerCase();
   // const destination = searchParams.get('destination')?.toLowerCase();
  const origin = decodeURIComponent(searchParams.get('origin')).toLowerCase();
  const destination = decodeURIComponent(searchParams.get('destination')).toLowerCase();
  const date = searchParams.get('date');
  console.log(origin, destination, date)

  // Trigger flight search on load
  // useEffect(() => {
  //   if (origin && destination && date) {
  //     searchFlights(origin, destination, date);
  //   }
  // }, [origin, destination, date, searchFlights]);
  useEffect(() => {
    if (!hasFetched.current && origin && destination && date) {
      searchFlights(origin, destination, date);
      hasFetched.current = true;
    }
  }, [origin, destination, date, searchFlights]);


  // Filter flights based on search criteria (case-insensitive)
  const filteredFlights = flights.filter((flight) =>
      flight.origin.toLowerCase() === origin &&
      flight.destination.toLowerCase() === destination
  );

  // Pagination logic
  const paginatedFlights = filteredFlights.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Available Flights</h1>
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Modify Search
        </Link>
      </div>

      {filteredFlights.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">
            No flights found for your search criteria.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Sorting and results header */}
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
            {/* <div className="flex space-x-4">
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => {
                  const sortedFlights = [...filteredFlights];
                  if (e.target.value === 'price-asc') {
                    sortedFlights.sort((a, b) => a.price - b.price);
                  } else if (e.target.value === 'price-desc') {
                    sortedFlights.sort((a, b) => b.price - a.price);
                  } else if (e.target.value === 'time') {
                    sortedFlights.sort(
                      (a, b) =>
                        new Date(`2000-01-01 ${a.time}`) -
                        new Date(`2000-01-01 ${b.time}`)
                    );
                  }
                }}
              >
                <option value="">Sort by</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="time">Departure Time</option>
              </select>
            </div> */}
            <div className="text-sm text-gray-600">
              {filteredFlights.length}{' '}
              {filteredFlights.length === 1 ? 'flight' : 'flights'} found
            </div>
          </div>

          {/* Flight list */}
          {paginatedFlights.map((flight) => (
            <div
              key={flight._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {flight.airline} - {flight.flightNumber}
                  </h2>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {flight.origin} → {flight.destination}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {format(new Date(flight.date), 'PPP')}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {new Date(`2000-01-01 ${flight.time}`).toLocaleTimeString(
                        'en-US',
                        { hour: 'numeric', minute: '2-digit', hour12: true }
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    ${flight.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {flight.availableSeats} seats left
                  </p>
                  <Link
                    to={`/flight/${flight._id}`}
                    className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <nav className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {[...Array(Math.ceil(filteredFlights.length / itemsPerPage))].map(
                (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded border ${currentPage === i + 1
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    {i + 1}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, Math.ceil(filteredFlights.length / itemsPerPage))
                  )
                }
                disabled={
                  currentPage === Math.ceil(filteredFlights.length / itemsPerPage)
                }
                className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
