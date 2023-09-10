import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const OnlyUnauthorized = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    return !isAuthenticated ? <Outlet /> : <Navigate to={'/'} />;
};

export default OnlyUnauthorized;
