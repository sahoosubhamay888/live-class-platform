import axios from 'axios';

// Create an axios instance with base configuration
const api = axios.create({
    // In Vite projects, use import.meta.env.VITE_API_URL
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3002/api',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

// Response interceptor - handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const isPublicPath = ['/', '/login', '/register'].includes(window.location.pathname);
            const isMeRequest = error.config?.url?.includes('/auth/me');
            if (!isPublicPath && !isMeRequest) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
