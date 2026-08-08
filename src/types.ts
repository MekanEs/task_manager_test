export type TaskStatus = 'done' | 'in-progress' | 'todo' | 'backlog';
export type TaskPriority = 'high' | 'medium' | 'low';

export interface TaskType {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
}
