// Action types
export const ActionTypes = {
    ADD_BOOKING: 'ADD_BOOKING',
    FETCH_BOOKINGS: 'FETCH_BOOKINGS',
    FETCH_USER_BOOKINGS: 'FETCH_USER_BOOKINGS',
    UPDATE_BOOKING: 'UPDATE_BOOKING',
    DELETE_BOOKING: 'DELETE_BOOKING',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
};

// Reducer function
export const bookingReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.ADD_BOOKING:
            return {
                ...state,
                bookings: [...state.bookings, action.payload],
                loading: false,
                error: null,
            };
        case ActionTypes.FETCH_BOOKINGS:
            return {
                ...state,
                bookings: action.payload,
                loading: false,
                error: null,
            };
        case ActionTypes.FETCH_USER_BOOKINGS:
            return {
                ...state,
                userBookings: action.payload,
                loading: false,
                error: null,
            };
        case ActionTypes.UPDATE_BOOKING:
            return {
                ...state,
                bookings: state.bookings.map((booking) =>
                    booking._id === action.payload._id ? action.payload : booking
                ),
                loading: false,
                error: null,
            };
        case ActionTypes.DELETE_BOOKING:
            return {
                ...state,
                bookings: state.bookings.filter((booking) => booking._id !== action.payload),
                loading: false,
                error: null,
            };
        case ActionTypes.SET_LOADING:
            return { ...state, loading: action.payload };
        case ActionTypes.SET_ERROR:
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};
