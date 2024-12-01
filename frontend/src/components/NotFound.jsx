import React from 'react'

export default function NotFound() {
    return (
        <div class="flex flex-col items-center justify-center h-screen ">
            <img aria-hidden="true" alt="Page Not Found" src="https://placehold.co/300?text=404" class="mb-8" />
            <h1 class="text-4xl font-bold mb-4">Oops! Page Not Found</h1>
            <p class="text-lg text-center mb-6">The page you are looking for might have been removed or its name changed.</p>
            <a href="/" class="px-6 py-3 rounded-lg transition-colors duration-300 ">Go Back Home</a>
        </div>
    )
}
