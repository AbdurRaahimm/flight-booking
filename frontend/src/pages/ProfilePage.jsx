import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Calendar, Plane } from 'lucide-react';
import { format } from 'date-fns';
import UserEditModal from '../components/UserEditModal';
import { useBooking } from '../context/BookingContext';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user } = useAuth();
  const { fetchUserBookings, userBookings, loading, error } = useBooking();
  // const user = JSON.parse(localStorage.getItem('user')) || []
  console.log(userBookings)

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserBookings(user?._id);
    };
    fetchData();
  }, [])


  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-6">
              <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold">{user?.username}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>

            <div className="space-y-4">
              <button popovertarget="userEditModal" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Edit Profile
              </button>
              <div id='userEditModal' className='w-10/12 sm:w-8/12 md:w-6/12 mx-auto rounded-md shadow-lg' popover="true">
                <UserEditModal user={user} />
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Booking History</h2>
            <div className="space-y-4">
              {userBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Plane className="h-5 w-5 text-blue-600 mr-2" />
                      <div>
                        <h3 className="font-semibold">
                          {booking.flightInfo.airline} - {booking.flightInfo.flightNumber}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {booking.flightInfo.origin} → {booking.flightInfo.destination}
                          (
                          {new Date(`2000-01-01 ${booking.flightInfo.time}`).toLocaleTimeString(
                            'en-US',
                            { hour: 'numeric', minute: '2-digit', hour12: true }
                          )}
                          )
                        </p>

                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                        }`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {format(new Date(booking.flightInfo.date), 'PPP')}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <User className="h-4 w-4 mr-2" />
                      {booking.numberOfSeats} Seat
                      {booking.numberOfSeats > 1 ? 's' : ''}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-3">
                    <Link to={`/flight/${booking.flightId}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View Details
                    </Link>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;