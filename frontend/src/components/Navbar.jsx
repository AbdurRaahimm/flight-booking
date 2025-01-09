import { LogIn, Plane, User, LogOut } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteCookie, getCookie } from "../utils/cookie";
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const token = getCookie('token');

  function handleLogout() {
    deleteCookie('token');
    navigate('/')
    localStorage.removeItem('user');
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-12">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Plane className="size-6 text-sm sm:text-xl text-blue-600" />
              <span className="ml-2 text-sm sm:text-xl font-bold text-gray-900">Booking</span>
            </Link>
          </div>
          <div className="flex items-center">
            {token ? (
              <>
                {
                  user.role === 'admin' ? (
                    <Link
                      to={`/admin`}
                      className="flex px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
                    >

                      {/* Admin  <span className='hidden sm:block ml-1'>Profile</span> */}
                      <span className='hidden sm:flex capitalize'>  <User className="h-5 w-5 mr-1" /> {user.username}</span>

                      <div className="sm:hidden flex items-center justify-center h-screen">
                        <div className="relative">
                          {/* <div className="size-10 bg-zinc-200 rounded-full flex items-center justify-center shadow-md">
                            <span className="text-2xl font-bold text-zinc-800">{user.username[0]}</span>
                          </div> */}
                          <div className="flex justify-center items-center p-3 bg-blue-100 rounded-full ">
                            <User className="size-4 text-blue-600" />
                          </div>

                        </div>
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to="/profile"
                      className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
                    >

                      <User className="h-5 w-5 mr-1" />
                      {/* User  <span className='hidden sm:block ml-1'>Profile</span> */}
                      <span className='capitalize'> {user.username}</span>
                    </Link>
                  )
                }
                <button
                  onClick={handleLogout}
                  className=" px-3 py-2 rounded-md text-sm font-medium text-blue-600 bg-[#5143d91a] hover:bg-blue-700 hover:text-white capitalize flex justify-between items-center"
                >
                  <LogOut className="size-5 mr-1" />
                  <span className='hidden sm:block'>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-blue-600 bg-[#5143d91a] hover:bg-blue-700 hover:text-white capitalize flex justify-between items-center"
                >
                  <LogIn className='size-4 mr-1' />
                  Sign up
                </Link>

              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  )
}
