import React from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import type { TaskStatus } from '../types';

interface TaskFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatus: TaskStatus | 'all';
  onStatusChange: (status: TaskStatus | 'all') => void;
  onCreateClick: () => void;
  className?: string;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  onCreateClick,
  className,
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 ${className}`}
    >
      <div className='relative w-full md:w-80'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder='Поиск задач по названию...'
          className='w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm'
        />
      </div>

      <div className='flex flex-wrap items-center gap-3 w-full md:w-auto'>
        <div className='flex items-center gap-1 bg-gray-50 p-1 rounded-lg border border-gray-200 w-full md:w-auto overflow-x-auto'>
          <Filter className='w-4 h-4 text-gray-400 ml-2 hidden md:block' />
          {(['all', 'todo', 'in_progress', 'done'] as const).map((status) => {
            const labels: Record<string, string> = {
              all: 'Все',
              todo: 'К выполнению',
              in_progress: 'В процессе',
              done: 'Выполнено',
            };
            return (
              <button
                key={status}
                onClick={() => onStatusChange(status)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  selectedStatus === status
                    ? 'bg-white text-blue-600 shadow-sm font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {labels[status]}
              </button>
            );
          })}
        </div>

        <button
          onClick={onCreateClick}
          className='flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow transition-all w-full md:w-auto'
        >
          <Plus className='w-4 h-4' />
          Новая задача
        </button>
      </div>
    </div>
  );
};
