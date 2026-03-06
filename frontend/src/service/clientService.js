// src/services/axiosClient.js
import axios from 'axios';

const API_URL = `${import.meta.env.REACT_API_BASE_URL}/api/v1`;

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Xử lý dữ liệu trả về (Optional)
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('Lỗi API:', error);
    return Promise.reject(error);
  },
);

export default axiosClient;
