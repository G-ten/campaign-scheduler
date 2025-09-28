import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const loginUser = (data) => api.post('auth/login', data);
export const registerUser = (data) => api.post('auth/createUser', data);

export const createCampaign = (data) => api.post('campaign/createCampaign', data);
export const getCampaigns = () => api.get('campaign/getCampaignList');
export const getCampaignById = (id) => api.get(`campaign/getCampaignDetails/${id}`);

export default api;