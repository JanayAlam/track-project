import { useStoreActions, useStoreState } from 'easy-peasy';

const useAuth = () => {
    const auth = useStoreState((state) => state.auth);
    const authActions = useStoreActions((actions) => actions.auth);

    const logout = async () => {
        return await authActions.logout();
    };

    return {
        isAuthenticated: !!auth.data.accessToken,
        logout,
    };
};

export default useAuth;
