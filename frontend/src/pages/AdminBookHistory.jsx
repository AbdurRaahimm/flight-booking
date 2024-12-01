import { Edit2, Search, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import { format } from 'date-fns';

export default function AdminBookHistory() {
  const { bookings, loading, error, updateBooking, deleteBooking } = useBooking();
  const [searchTerm, setSearchTerm] = useState('');
  console.log(bookings)

  const filteredBookings = bookings?.filter(booking =>
    booking.flightInfo.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.flightInfo.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.flightInfo.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteBooking = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this booking?");
    if (confirmed) {
      await deleteBooking(id);
    }
  }



  return (
    <div className="space-y-6 px-4 py-5">
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>

      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search flights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Flight Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">

              {/* {filteredFlights.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">
                    <div className="text-gray-500">
                      No flights found
                    </div>
                  </td>
                </tr>
              )} */}

              {loading && (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    <div className="text-gray-500">Loading bookings...</div>
                  </td>
                </tr>
              )}

              {error && (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    <div className="text-red-500">Error: {error}</div>
                  </td>
                </tr>
              )}

              {!loading && !error && bookings.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    <div className="text-gray-500">No bookings found</div>
                  </td>
                </tr>
              )}

              {!loading && !error && filteredBookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {booking.flightInfo.airline}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.flightInfo.flightNumber}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {booking.flightInfo.origin} → {booking.flightInfo.destination}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {format(new Date(booking.flightInfo.date), 'PPP')}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(`2000-01-01 ${booking.flightInfo.time}`)
                        .toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      ${booking.totalPrice.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {booking.numberOfSeats}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}>
                      {booking.status}
                    </span>
                  </td>
                  {/* <td className="px-6 py-4 text-right">
                    <select
                      value={booking.status}
                      onChange={(e) => updateBooking(booking._id, e.target.value)}
                      className="text-sm border border-gray-300 rounded-md p-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </td> */}
                  <td className="px-6 py-4 text-right space-x-3">
                    <select
                      value={booking.status}
                      onChange={(e) => updateBooking(booking._id, e.target.value)}
                      className="text-sm border border-gray-300 rounded-md p-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="canceled">Canceled</option>
                    </select>
                    {/* <button className="text-blue-600 hover:text-blue-900" >
                      <Link
                        to={`update-flight?id=${booking._id}`} state={booking}>
                        <Edit2 className="h-5 w-5" />
                      </Link>
                    </button> */}
                    <button
                      onClick={() => handleDeleteBooking(booking._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
