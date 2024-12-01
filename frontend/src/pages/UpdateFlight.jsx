import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFlights } from '../context/FlightContext';

export default function UpdateFlight() {
    const state = useLocation().state;
    const navigate = useNavigate();
    const { updateFlight,fetchFlights } = useFlights();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        const response = await updateFlight(state._id, data)
        if (response) {
            navigate('/admin')
            // window.location.reload()
            
        }
        // Fetch updated flights after successful update
        await fetchFlights();
    }
    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Update Flight</h2>
                <p className="mt-2 text-gray-600 text-center">Enter the details for update flight</p>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="flightNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Flight Number
                        </label>
                        <input
                            type="text"
                            id="flightNumber"
                            name="flightNumber"
                            placeholder="e.g., AA123"
                            defaultValue={state.flightNumber}
                            required
                            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        />
                    </div>

                    <div>
                        <label htmlFor="airline" className="block text-sm font-medium text-gray-700 mb-1">
                            Airline
                        </label>
                        <input
                            type="text"
                            id="airline"
                            name="airline"
                            placeholder="e.g., American Airlines"
                            defaultValue={state.airline}
                            required
                            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        />
                    </div>

                    <div>
                        <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">
                            Origin
                        </label>
                        <input
                            type="text"
                            id="origin"
                            name="origin"
                            placeholder="e.g., Dhaka"
                            defaultValue={state.origin}
                            required
                            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        />
                    </div>

                    <div>
                        <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                            Destination
                        </label>
                        <input
                            type="text"
                            id="destination"
                            name="destination"
                            placeholder="e.g., New York"
                            defaultValue={state.destination}
                            required
                            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        />
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            defaultValue={new Date(state.date).toISOString().split('T')[0]}
                            required
                            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        />
                    </div>

                    <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                            Time
                        </label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            defaultValue={state.time}
                            required
                            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        />
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            min="0"
                            step="0.01"
                            placeholder="e.g., 299.99"
                            defaultValue={state.price}
                            required
                            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        />
                    </div>

                    <div>
                        <label htmlFor="availableSeats" className="block text-sm font-medium text-gray-700 mb-1">
                            Available Seats
                        </label>
                        <input
                            type="number"
                            id="availableSeats"
                            name="availableSeats"
                            min="0"
                            placeholder="e.g., 150"
                            defaultValue={state.availableSeats}
                            required
                            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white font-semibold bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300"
                    >
                        Update Flight
                    </button>
                </div>
            </form>
        </div>
    )
}
