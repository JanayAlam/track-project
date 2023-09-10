import axios from 'axios';

const authRequests = {};

authRequests.login = ({ email, password }) => {
    return axios.post('/auth/login', {
        email,
        password,
    });
};

export default authRequests;
