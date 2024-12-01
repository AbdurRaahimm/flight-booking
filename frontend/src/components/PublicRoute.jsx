import { Navigate } from 'react-router-dom';
import { getCookie } from '../utils/cookie';

export default function PublicRoute({ children }) {
    let token = getCookie("token");
    return (
        <>
            {
                !token ? (
                    children
                ) : (
                    <Navigate to='/' />
                )
            }
        </>
    )
}
