import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFlights } from '../context/FlightContext';
import { useAuth } from '../context/AuthContext';
import { Plane, Users, CreditCard, Minus, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { useBooking } from '../context/BookingContext';


const BookingPage = () => {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const { flights } = useFlights();
  const { user } = useAuth();
  const { addBooking } = useBooking();
  const [seats, setSeats] = useState(1);


  const flight = flights.find((f) => f._id === flightId);

  if (!flight) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Flight not found.</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      userId: user._id,
      flightId: flight._id,
      numberOfSeats: seats,
      totalPrice: flight.price * seats
    };

    const response = await addBooking(bookingData);
    if (response) {
      navigate('/profile');
    }

  };

  return (
    <div className="max-w-4xl mx-auto py-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-5 text-white">
          <div className="flex items-center">
            <Plane className="h-8 w-8 mr-3" />
            <div>
              <h1 className="text-2xl font-bold">Complete Your Booking</h1>
              <p className="text-blue-100">
                {flight.airline} - {flight.flightNumber}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-8 bg-gray-50 p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Flight Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
              <div>
                <p className="text-sm text-gray-600">From - To</p>
                <p className="font-medium">
                  {flight.origin} → {flight.destination}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-medium">
                  {format(new Date(flight.date), 'PPP')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Time</p>
                <p className="font-medium">
                  {new Date(`2000-01-01 ${flight.time}`).toLocaleTimeString(
                    'en-US',
                    { hour: 'numeric', minute: '2-digit', hour12: true }
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Price per person</p>
                <p className="font-medium">${flight.price.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row items-center justify-around mb-4">
                <div className="">
                  <h2 className="text-lg font-semibold">Available  Seats</h2>
                  <h4 className='font-bold text-xl'> {flight.availableSeats}</h4>
                </div>


                <div className="mt-4">
                  <label htmlFor="seats" className="text-lg font-semibold">
                    Number of Seats to Book
                  </label>
                  <div className="mt-1 flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => setSeats(prev => Math.max(1, prev - 1))}
                      className="p-2 rounded-md border border-gray-300 hover:bg-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <input
                      type="number"
                      id="seats"
                      name="seats"
                      min="1"
                      max={flight.availableSeats}
                      value={seats}
                      onChange={(e) => setSeats(Math.min(flight.availableSeats, Math.max(1, parseInt(e.target.value) || 1)))}
                      className="block w-20 text-center rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-bold text-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setSeats(prev => Math.min(flight.availableSeats, prev + 1))}
                      className="p-2 rounded-md border border-gray-300 hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-lg font-semibold">Total Price</p>
                  <p className="text-sm text-gray-600">
                    {/* {passengers.length} passenger{passengers.length > 1 ? 's' : ''} */}
                    {seats} seat{seats > 1 ? 's' : ''} × ${flight.price.toFixed(2)}
                  </p>
                </div>
                <p className="text-2xl font-bold">
                  {/* ${(flight.price * passengers.length).toFixed(2)} */}
                  ${(flight.price * seats).toFixed(2)}
                </p>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Proceed to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default BookingPage