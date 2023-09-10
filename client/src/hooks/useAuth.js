import { useStoreActions, useStoreState } from 'easy-peasy';
import { LOCALSTORAGE_AUTH_TOKEN_KEY as L_KEY } from '../constants';

const useAuth = () => {
    const auth = useStoreState((state) => state.auth);
    const authActions = useStoreActions((actions) => actions.auth);

    const loadToken = () => {
        if (localStorage.getItem(L_KEY)) {
            authActions.addToken({
                type: 'bearer',
                token: localStorage.getItem(L_KEY),
            });
        }
    };

    return {
        isAuthenticated: auth.isAuthenticated,
        loadToken,
    };
};

export default useAuth;
