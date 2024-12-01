import { createContext, useContext, useReducer, useEffect } from 'react';
import { getCookie } from '../utils/cookie';
import { toast } from 'react-toastify';
import { ActionTypes, flightReducer } from '../reducer/flightReducer';
const token = getCookie("token");

// Define the initial state
const initialState = {
  flights: [],
  loading: false,
  error: null,
};

// Create context
const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [state, dispatch] = useReducer(flightReducer, initialState);

  const fetchFlights = async () => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/flights`);

      if (!response.ok) {
        throw new Error('Failed to fetch flights');
      }

      const flightsData = await response.json();
      dispatch({ type: ActionTypes.SET_FLIGHTS, payload: flightsData });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
  };

  // Use useEffect to fetch flights on component mount
  useEffect(() => {
    fetchFlights();
  }, []);

  const searchFlights = async (origin, destination, date) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      // Fetch flight data from the search API
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/flights/search?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&date=${encodeURIComponent(date)}`);
      const flightsData = await response.json();
      if (response.ok) {
        dispatch({ type: ActionTypes.SET_FLIGHTS, payload: flightsData });
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      } else {
        // toast.error(flightsData.message)
      }

    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
  };

  const addFlight = async (flight) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/flight`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(flight),
      });

      const newFlight = await response.json();
      if (response.ok) {
        dispatch({ type: ActionTypes.ADD_FLIGHT, payload: newFlight });
        toast.success(newFlight.message || 'Flight added successfully!')
        return newFlight
      } else {
        toast.error(newFlight.message)
      }

    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
      toast.error('Error adding flight: ' + error.message)
    }
  };

  const updateFlight = async (id, flightUpdate) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/flight/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(flightUpdate),
      });
      const updatedFlight = await response.json();
      if (response.ok) {
        dispatch({
          type: ActionTypes.UPDATE_FLIGHT,
          payload: { id, data: updatedFlight },
        });
        toast.success(updateFlight.message || 'Flight updated successfully!')
        return updateFlight
      } else {
        toast.error(updateFlight.message)
      }

    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
  };

  const deleteFlight = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/flight/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: ActionTypes.DELETE_FLIGHT, payload: id });
        toast.success(data.message || 'Flight deleted successfully!');
        // window.location.reload();

      } else {
        toast.error(data.message)
      }
      await fetchFlights();

    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
  };

  return (
    <FlightContext.Provider
      value={{
        flights: state.flights,
        loading: state.loading,
        error: state.error,
        fetchFlights,
        searchFlights,
        addFlight,
        updateFlight,
        deleteFlight,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};

// Custom hook for accessing the context
export const useFlights = () => {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error('useFlights must be used within a FlightProvider');
  }
  return context;
};
