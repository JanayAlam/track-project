import axios from 'axios';

const BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        common: {
            ['Accept']: 'application/json',
        },
        post: {
            ['Content-Type']: 'application/json',
        },
    },
});
