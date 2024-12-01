// Define action types
export const ActionTypes = {
  SET_FLIGHTS: 'SET_FLIGHTS',
  ADD_FLIGHT: 'ADD_FLIGHT',
  UPDATE_FLIGHT: 'UPDATE_FLIGHT',
  DELETE_FLIGHT: 'DELETE_FLIGHT',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
};

// Create a reducer function
export const flightReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_FLIGHTS:
      return { ...state, flights: action.payload, loading: false, error: null };
    case ActionTypes.ADD_FLIGHT:
      return { ...state, flights: [...state.flights, action.payload] };
    case ActionTypes.UPDATE_FLIGHT:
      return {
        ...state,
        flights: state.flights.map((flight) =>
          flight.id === action.payload.id
            ? { ...flight, ...action.payload.data }
            : flight
        ),
      };
    case ActionTypes.DELETE_FLIGHT:
      return {
        ...state,
        flights: state.flights.filter((flight) => flight.id !== action.payload),
      };
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
