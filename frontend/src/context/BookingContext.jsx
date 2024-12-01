import { createContext, useContext, useEffect, useReducer } from 'react';
import { getCookie } from '../utils/cookie';
import { toast } from 'react-toastify';
import { ActionTypes, bookingReducer } from '../reducer/bookingReducer';

// Get token from cookies
const token = getCookie("token");

// Initial state
const initialState = {
    bookings: [],
    userBookings: [],
    loading: false,
    error: null,
};

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
    const [state, dispatch] = useReducer(bookingReducer, initialState);

    const setLoading = (isLoading) => {
        dispatch({ type: ActionTypes.SET_LOADING, payload: isLoading });
    };

    const handleError = (error, customMessage = 'An error occurred') => {
        dispatch({ type: ActionTypes.SET_ERROR, payload: error.message || customMessage });
        // toast.error(customMessage);
    };

    // Add booking
    const addBooking = async (bookingData) => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(bookingData),
            });

            const data = await response.json();
            if (response.ok) {
                dispatch({ type: ActionTypes.ADD_BOOKING, payload: data.booking });
                toast.success(data.message);
                return data.booking;
            } else {
                handleError(new Error(data.message));
            }
        } catch (error) {
            handleError(error, 'Failed to add booking');
        }
        return null;
    };

    // Fetch all bookings
    const fetchBookings = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/bookings`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            if (response.ok) {
                dispatch({ type: ActionTypes.FETCH_BOOKINGS, payload: data });
                return data;
            } else {
                handleError(new Error(data.message));
            }
        } catch (error) {
            handleError(error, 'Failed to fetch bookings');
        }
        return null;
    };

    // Fetch user-specific bookings
    const fetchUserBookings = async (userId) => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/bookings/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            if (response.ok) {
                dispatch({ type: ActionTypes.FETCH_USER_BOOKINGS, payload: data });
                return data;
            } else {
                handleError(new Error(data.message));
            }
        } catch (error) {
            handleError(error, 'Failed to fetch user bookings');
        }
        return null;
    };

    // Update booking
    const updateBooking = async (bookingId, status) => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/booking/${bookingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });

            const data = await response.json();
            if (response.ok) {
                dispatch({ type: ActionTypes.UPDATE_BOOKING, payload: data.booking });
                toast.success(data.message);
                return data.booking;
            } else {
                handleError(new Error(data.message));
            }
        } catch (error) {
            handleError(error, 'Failed to update booking');
        }
        return null;
    };

    // Delete booking
    const deleteBooking = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/booking/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            if (response.ok) {
                dispatch({ type: ActionTypes.DELETE_BOOKING, payload: id });
                toast.success(data.message);
                return true;
            } else {
                handleError(new Error(data.message));
            }
        } catch (error) {
            handleError(error, 'Failed to delete booking');
        }
        return false;
    };

    // Fetch all bookings when the provider mounts
    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <BookingContext.Provider
            value={{
                bookings: state.bookings,
                userBookings: state.userBookings,
                loading: state.loading,
                error: state.error,
                addBooking,
                fetchBookings,
                fetchUserBookings,
                updateBooking,
                deleteBooking,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};

/**
 * Custom hook to use Booking Context
 */
export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};
