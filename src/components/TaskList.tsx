import React from 'react';
import type { TaskType } from '../types';
import { TaskCard } from './TaskCard';
import { ClipboardList } from 'lucide-react';

interface TaskListProps {
  tasks?: TaskType[];
  onEdit: (task: TaskType) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks = [], onEdit }) => {
  if (tasks.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-gray-100 text-center shadow-sm'>
        <div className='w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4'>
          <ClipboardList className='w-6 h-6' />
        </div>
        <h3 className='text-lg font-semibold text-gray-800 mb-1'>Задачи не найдены</h3>
        <p className='text-gray-500 text-sm max-w-sm'>
          По вашему запросу или фильтру нет задач. Попробуйте изменить параметры поиска или создайте
          новую задачу.
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} />
      ))}
    </div>
  );
};
