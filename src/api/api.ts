import axios from 'axios';
import type { AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 5000,
});
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.request);
      return Promise.reject({ message: 'Нет соединения с сервером' });
    } else {
      console.error('Request Error:', error.message);
      return Promise.reject({ message: error.message });
    }
  },
);
