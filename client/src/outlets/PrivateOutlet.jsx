import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateOutlet = ({ children }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? children : <Navigate to={'/signin'} />;
};

export default PrivateOutlet;
