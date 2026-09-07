import axios from 'axios';

// Determine API base URL
const getApiBaseUrl = () => {
  // Use environment variable if available
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // For production builds, use relative path
  if (import.meta.env.PROD) {
    return '/api';
  }
  
  // For development, use full URL to backend
  return 'http://localhost:5000/api';
};

const API = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000 // 30 second timeout
});

// Request interceptor - Add auth token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('medicare_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor - Handle errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login on auth failure
      localStorage.removeItem('medicare_token');
      localStorage.removeItem('medicare_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
