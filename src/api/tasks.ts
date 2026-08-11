import { api } from './api';
import type { TaskType, GetTasksParams, TaskFormData } from '../types';

export const getTasks = async (
  params?: GetTasksParams,
): Promise<{ data: TaskType[]; total: number }> => {
  const queryParams: Record<string, string | number> = { _limit: 5, _page: params?.page || 1 };
  if (params?.status && params.status !== 'all') {
    queryParams.status = params.status;
  }
  if (params?.search) {
    queryParams.title_like = params.search;
  }
  const response = await api.get<TaskType[]>('tasks', { params: queryParams });
  const total = response.headers['x-total-count'] || 0;
  return { data: response.data, total };
};

export const getTaskById = async (id: string): Promise<TaskType> => {
  const response = await api.get<TaskType>(`tasks/${id}`);
  return response.data;
};

export const createTask = async (data: TaskFormData): Promise<TaskType> => {
  const newTask = {
    ...data,
    createdAt: new Date().toISOString(),
  };
  const response = await api.post<TaskType>('tasks', newTask);
  return response.data;
};

export const updateTask = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<TaskFormData>;
}): Promise<TaskType> => {
  const response = await api.patch<TaskType>(`tasks/${id}`, data);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`tasks/${id}`);
};
