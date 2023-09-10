import { action, thunk } from 'easy-peasy';
import apiRequests from '../../api';

const initialState = { token: '', isAuthenticated: '' };

const authModel = {
    data: { ...initialState },
    isAuthenticated: false,
    isLoading: false,
    loadToken: action((state, _payload) => {
        const token = localStorage.getItem('auth-token');
        if (!token) return;
        state.data = {
            token: `Bearer ${token}`,
            isAuthenticated: true,
        };
    }),
    addToken: action((state, payload) => {
        const type = payload.token_type;
        state.data = {
            token: `${type.charAt(0).toUpperCase() + type.slice(1)} ${
                payload.token
            }`,
            isAuthenticated: true,
        };
    }),
    removeToken: action((state, _payload) => {
        state.data = { ...initialState };
    }),
    setLoading: action((state, payload) => {
        state.isLoading = !!payload;
    }),
    login: thunk(async (actions, payload) => {
        actions.setLoading(true);
        try {
            const res = await apiRequests.auth.login({
                email: payload.email,
                password: payload.password,
            });
            actions.addToken(res.data.data);
        } catch (e) {
            if (e.response) {
                return e.response.data.message;
            }
            return e.message;
        } finally {
            actions.setLoading(false);
        }
        return '';
    }),
};

export default authModel;
