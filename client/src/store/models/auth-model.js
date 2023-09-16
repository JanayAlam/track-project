import { action, thunk } from 'easy-peasy';
import apiRequests from '../../api';
import axios from '../../api/axios';

const initialState = { accessToken: '', user: {} };

const authModel = {
    data: { ...initialState },
    isLoading: false,
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
    setUser: action((state, payload) => {
        state.data = {
            ...state.data,
            user: payload,
        };
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
    refreshUser: thunk(async (actions, _payload, helpers) => {
        actions.setLoading(true);
        const { getState } = helpers;
        try {
            await axios.get('/auth/user', {
                headers: {
                    Authorization: getState().data.accessToken,
                },
            });
        } catch (e) {
            if (!e?.response) {
                return e.message;
            }
            return 'User fetching failed';
        } finally {
            actions.setLoading(false);
        }
    }),
};

export default authModel;
