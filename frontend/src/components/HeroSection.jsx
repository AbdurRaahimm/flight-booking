import { Search } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFlights } from '../context/FlightContext';

export default function HeroSection() {
    const navigate = useNavigate();
    const { flights } = useFlights();
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [originSuggestions, setOriginSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);

    useEffect(() => {
        if (origin.length > 0) {
            const suggestions = [...new Set(flights
                .filter(flight => flight.origin.toLowerCase().includes(origin.toLowerCase()))
                .map(flight => flight.origin))];
            setOriginSuggestions(suggestions.length > 0 ? suggestions : ['No matches found']);
        } else {
            setOriginSuggestions([]);
        }
    }, [origin, flights]);

    useEffect(() => {
        if (destination.length > 0) {
            const suggestions = [...new Set(flights
                .filter(flight => flight.destination.toLowerCase().includes(destination.toLowerCase()))
                .map(flight => flight.destination))];
            setDestinationSuggestions(suggestions.length > 0 ? suggestions : ['No matches found']);
        } else {
            setDestinationSuggestions([]);
        }
    }, [destination, flights]);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?origin=${origin}&destination=${destination}&date=${date}`);
    }

    return (
        <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat p-4 md:p-8 py-28 space-y-9">
            <div className="flex flex-col justify-center items-center py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
                    Find Your Perfect Flight
                </h1>
                <p className="text-md font-semibold text-gray-600 text-center">
                    Search through thousands of flights to find the best deals
                </p>

                <div className="bg-white rounded-lg shadow-lg p-8 w-full sm:w-10/12 mx-auto mt-16">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    From
                                </label>
                                <input
                                    type="text"
                                    value={origin}
                                    onChange={(e) => setOrigin(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="City or Airport"
                                />
                                {originSuggestions.length > 0 && (
                                    <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
                                        {originSuggestions.map((suggestion, index) => (
                                            <li 
                                                key={index}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => {
                                                    if (suggestion !== 'No matches found') {
                                                        setOrigin(suggestion);
                                                        setOriginSuggestions([]);
                                                    }
                                                }}
                                            >
                                                {suggestion}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    To
                                </label>
                                <input
                                    type="text"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="City or Airport"
                                />
                                {destinationSuggestions.length > 0 && (
                                    <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
                                        {destinationSuggestions.map((suggestion, index) => (
                                            <li 
                                                key={index}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => {
                                                    if (suggestion !== 'No matches found') {
                                                        setDestination(suggestion);
                                                        setDestinationSuggestions([]);
                                                    }
                                                }}
                                            >
                                                {suggestion}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <Search className="h-5 w-5 mr-2" />
                            Search Flights
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
