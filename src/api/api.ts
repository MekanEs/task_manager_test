import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { TaskType } from '../types';
export type TaskFormData = Omit<TaskType, 'id' | 'createdAt'>;

export const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 5000,
});
