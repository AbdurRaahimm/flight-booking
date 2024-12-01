import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { FlightProvider } from './context/FlightContext.jsx';
import { BookingProvider } from './context/BookingContext.jsx';
// import { FlightProvider } from './context/FlightContext';


createRoot(document.getElementById('root')).render(
  <>
    <BookingProvider>
      <FlightProvider>
        <AuthProvider>
          <App />
          <ToastContainer />
        </AuthProvider>
      </FlightProvider>
    </BookingProvider>
  </>
);
