import { action, thunk } from 'easy-peasy';
import apiRequests from '../../api';

const initialState = { accessToken: '', user: {} };

const authModel = {
    data: { ...initialState },
    isLoading: false,
    // loadToken: action((state, _payload) => {
    //     const token = localStorage.getItem(L_KEY);
    //     if (!token) return;
    //     state.data = {
    //         token: `Bearer ${token}`
    //     };
    // }),
    addData: action((state, payload) => {
        const type = payload.tokenType;
        state.data = {
            accessToken: `${type.charAt(0).toUpperCase() + type.slice(1)} ${
                payload.accessToken
            }`,
            user: payload.user,
        };
    }),
    removeData: action((state, _payload) => {
        state.data = { ...initialState };
    }),
    setLoading: action((state, payload) => {
        state.isLoading = !!payload;
    }),
    login: thunk(async (actions, payload) => {
        actions.setLoading(true);
        try {
            const response = await apiRequests.auth.login({
                email: payload.email,
                password: payload.password,
            });
            actions.addData(response.data.data);
        } catch (e) {
            if (!e?.response) {
                return e.message;
            } else if (
                e.response?.status === 402 ||
                e.response?.status === 401
            ) {
                const errors = e.response.data.errors;
                return {
                    email: errors.email[0],
                    password: errors.password[0],
                };
            } else {
                return 'Login failed';
            }
        } finally {
            actions.setLoading(false);
        }
        return '';
    }),
    logout: thunk(async (actions, _payload, helpers) => {
        actions.setLoading(true);
        const { getState } = helpers;
        try {
            await apiRequests.auth.logout(getState().data.accessToken);
            actions.removeData();
        } catch (e) {
            if (!e?.response) {
                return e.message;
            }
            return 'Logout failed';
        } finally {
            actions.setLoading(false);
        }
    }),
};

export default authModel;
