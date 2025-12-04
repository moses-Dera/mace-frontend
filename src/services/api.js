import axios from 'axios';

// Auto-detect environment and use appropriate API URL
const getApiUrl = () => {
  // Check if we're in development (localhost)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return import.meta.env.VITE_API_URL_LOCAL || 'http://localhost:5000/api';
  }
  // Production environment
  return import.meta.env.VITE_API_URL_PRODUCTION || 'https://mace-backend.onrender.com/api';
};

const api = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json'
  }
});

// Log which API URL is being used
console.log('🔗 API URL:', getApiUrl());

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;