export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface TaskType {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
}
export type TaskFormData = Omit<TaskType, 'id' | 'createdAt'>;

export interface GetTasksParams {
  status?: TaskStatus | 'all';
  search?: string;
}
