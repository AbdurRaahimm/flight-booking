import React from 'react'
import { toast } from 'react-toastify';
import { getCookie } from '../utils/cookie';
import { useNavigate } from 'react-router-dom';

export default function UserEditModal({ user }) {
    const navigate = useNavigate();
    const token = getCookie("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user-update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });

            const item = await res.json();
            if (res.ok) {
                toast.success(item.message);
                const existingUser = JSON.parse(localStorage.getItem('user')) || [];
                const updatedUser = {
                    ...existingUser,
                    ...item.user, // Overwrite only the updated fields
                };

                // Save updated user object to localStorage
                localStorage.setItem('user', JSON.stringify(updatedUser));
                navigate(0);
            } else {
                toast.error(item.message);
            }
        } catch (error) {
            toast.error(error.message || "An error occurred");
        }
    };

    return (
        <div className="px-5 py-4  ">
            <div className="mb-8 flex justify-between">
                {/* <UserPlus className="h-12 w-12 text-blue-600 mx-auto mb-4" /> */}
                <h1 className="text-2xl font-bold text-gray-900">Update Information</h1>
                <button popovertarget="userEditModal" className='font-bold text-xl'>&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name='username'
                        defaultValue={user.username}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name='email'
                        defaultValue={user.email}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Update
                </button>
            </form>
        </div>
    )
}
