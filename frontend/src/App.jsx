import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Loading from './components/Loading';
import { lazy, Suspense } from 'react';
import RootLayout from './components/RootLayout';
import ProtectRoute from './components/ProtectRoute';
import PublicRoute from './components/PublicRoute';
import NotFound from './components/NotFound';
import AdminLayout from './components/AdminLayout';
const FlightsPage = lazy(() => import('./pages/FlightsPage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const FlightDetailsPage = lazy(() => import('./pages/FlightDetailsPage'));
const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage'));
const UpdateFlight = lazy(() => import('./pages/UpdateFlight'));
const AdminBookHistory = lazy(() => import('./pages/AdminBookHistory'));
const AddFlight = lazy(() => import('./pages/AddFlight'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const HomePage = lazy(() => import('./pages/HomePage'));

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<RootLayout />} errorElement={<ErrorPage />} >
        <Route index element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/flight/:id" element={<FlightDetailsPage />} />
        <Route path="/flights" element={<FlightsPage />} />
        <Route path="/booking/:flightId" element={<BookingPage />} />

        <Route path='admin' element={<AdminLayout />} errorElement={<ErrorPage />} >
          <Route index element={<ProtectRoute> <AdminDashboard /> </ProtectRoute>} />
          <Route path='booking' element={<ProtectRoute> <AdminBookHistory /> </ProtectRoute>} />
          <Route path='add-flight' element={<ProtectRoute> <AddFlight /> </ProtectRoute>} />
          <Route path='update-flight' element={<ProtectRoute> <UpdateFlight /> </ProtectRoute>} />
        </Route>

        <Route path='profile' element={<ProtectRoute> <ProfilePage /> </ProtectRoute>} />

      </Route>

      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /> </PublicRoute>} />
      <Route path="*" element={<NotFound />} />
    </>
  )
)

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={routes} />
      </Suspense>
    </>
  )
}

export default App
