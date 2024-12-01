import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFlights } from '../context/FlightContext';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const { flights, loading, error, deleteFlight } = useFlights();
  // console.log(flights)
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');


  const filteredFlights = flights?.filter((flight) =>
    flight?.airline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight?.flightNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight?.origin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight?.destination?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6 px-4 py-5">
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-bold text-gray-900">Flight Management</h1>
        <Link
          to="add-flight"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-1" />
          <span className='hidden sm:block'>Add Flight</span>
        </Link>
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
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
             
              {filteredFlights.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center">
                    <div className="text-gray-500">
                      No flights found
                    </div>
                  </td>
                </tr>
              )}
              {filteredFlights.map((flight) => (
                <tr key={flight._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {flight.airline}
                      </div>
                      <div className="text-sm text-gray-500">
                        {flight.flightNumber}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {flight.origin} → {flight.destination}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {format(new Date(flight.date), 'PPP')}
                    </div>
                    <div className="text-sm text-gray-500">
                      {
                        new Date(`2000-01-01 ${flight.time}`)
                          .toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
                      }
                      {/* {format(new Date(flight.time), 'p')} */}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      ${flight.price.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {flight.availableSeats}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-blue-600 hover:text-blue-900" >
                      <Link to={`update-flight?id=${flight._id}`} state={flight}>
                        <Edit2 className="h-5 w-5" />
                      </Link>
                    </button>
                    <button
                      onClick={() => deleteFlight(flight._id)}
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
  );
};

export default AdminDashboard;