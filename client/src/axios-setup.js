import axios from 'axios';

const axiosSetup = () => {
    axios.defaults.baseURL =
        import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
    axios.defaults.headers.common['Accept'] = 'application/json';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
};

export default axiosSetup;
