import { Plane } from 'lucide-react'
import React from 'react'

export default function Loading() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <Plane className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Booking</span>
        </div>
    )
}
