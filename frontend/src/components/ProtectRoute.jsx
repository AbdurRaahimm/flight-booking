import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../utils/cookie';

export default function ProtectRoute({ children }) {
    const token = getCookie("token");
    const user = token ? JSON.parse(localStorage.getItem('user')) : null;
    const location = useLocation(); 

    if (!token || !user) {
        return <Navigate to="/" />;
    }

    // Admin routes
    const adminRoutes = ['/admin', '/admin/add-flight','/admin/booking', '/admin/update-flight'];

    // Admin role access check
    if (user.role === 'admin') {
        if (!adminRoutes.includes(location.pathname)) {
            return <Navigate to="/admin" />;
        }
    } else {
        // Non-admin users can only access the profile page
        if (location.pathname !== '/profile') {
            return <Navigate to="/profile" />;
        }
    }

    // Render children if user is authorized
    return children;
}
