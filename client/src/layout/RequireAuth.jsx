import PropTypes from 'prop-types';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAuthUser from '../hooks/useAuthUser';

const RequireAuth = ({ isAdminRequired = false }) => {
    const { isAuthenticated } = useAuth();
    const authUser = useAuthUser();
    const location = useLocation();

    if (isAuthenticated) {
        if (isAdminRequired) {
            if (authUser.isAdmin) {
                return <Outlet />;
            } else {
                return (
                    <Navigate
                        to={'/unauthorized'}
                        state={{ from: location }}
                        replace
                    />
                );
            }
        } else {
            return <Outlet />;
        }
    } else {
        return <Navigate to={'/signin'} state={{ from: location }} replace />;
    }
};

RequireAuth.propTypes = {
    isAdminRequired: PropTypes.bool,
};

export default RequireAuth;
