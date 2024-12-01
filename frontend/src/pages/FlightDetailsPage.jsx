import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFlights } from '../context/FlightContext';
import { useAuth } from '../context/AuthContext';
import { Plane, Clock, Calendar, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';
import { getCookie } from '../utils/cookie';

const FlightDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { flights } = useFlights();
  const { user } = useAuth();
  const token = getCookie("token");

  const flight = flights.find((f) => f._id === id);

  if (!flight) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Flight not found.</p>
      </div>
    );
  }

  const handleBooking = () => {
    if (!token) {
      navigate('/login');
    } else {
      navigate(`/booking/${flight._id}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Plane className="h-8 w-8 mr-3" />
              <div>
                <h1 className="text-2xl font-bold">
                  {flight.airline} - {flight.flightNumber}
                </h1>
                <p className="text-blue-100">
                  {flight.origin} → {flight.destination}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">${flight.price.toFixed(2)}</p>
              <p className="text-blue-100">per person</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Departure</p>
                  <p className="font-medium">
                    {format(new Date(flight.date), 'PPP')}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-medium">
                    {new Date(`2000-01-01 ${flight.time}`).toLocaleTimeString(
                      'en-US',
                      { hour: 'numeric', minute: '2-digit', hour12: true }
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Route</p>
                  <p className="font-medium">
                    {flight.origin}  →{' '}
                    {flight.destination}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-600">Available Seats</p>
                  <p className="font-medium">{flight.availableSeats}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <button
              onClick={handleBooking}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {token ? 'Book Now' : 'Sign in to Book'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsPage