import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://randomuser.me/api',
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1',
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://esim-backend.vercel.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors for handling requests or responses globally
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add authorization token or other headers if needed
    // const token = localStorage.getItem('token'); // example
    // if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here, like showing a toast for unauthorized access
    if (error.response && error.response.status === 401) {
      // Redirect to login page or handle token expiration
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
