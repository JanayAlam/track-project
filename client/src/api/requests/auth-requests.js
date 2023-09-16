import axios from '../axios';

const authRequests = {};

authRequests.login = ({ email, password }) => {
    return axios.post('/auth/login', {
        email,
        password,
    });
};

authRequests.logout = (accessToken) => {
    return axios.get('/auth/logout', {
        headers: {
            Authorization: accessToken,
        },
    });
};

export default authRequests;
