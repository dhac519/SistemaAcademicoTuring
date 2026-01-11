import axios from 'axios';

// Create an Axios instance with default configuration
const client = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust if your backend port differs
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the auth token to every request
client.interceptors.request.use(
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

// Response interceptor to handle errors (e.g., global 401 handling)
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized, you might want to redirect to login or clear token
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default client;
