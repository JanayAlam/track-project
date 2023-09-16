import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const OnlyUnauthorized = () => {
    const { isAuthenticated } = useAuth();
    return !isAuthenticated ? <Outlet /> : <Navigate to={'/'} />;
};

export default OnlyUnauthorized;
