import React from 'react';
import type { TaskType, TaskStatus } from '../types';
import { Link } from 'react-router';
import { Trash2, Edit, Calendar, ArrowUpRight } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask, deleteTask } from '../api/tasks';
import { useUpdateTaskMutation } from '../hooks/useMutations';

interface TaskCardProps {
  task: TaskType;
  onEdit: (task: TaskType) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const queryClient = useQueryClient();
  const { title, description, priority, status, id, createdAt } =
    queryClient.getQueryData<TaskType>(['task', task.id]) || task;
  // const statusMutation = useMutation({
  //   mutationFn: (newStatus: TaskStatus) => updateTask({ id, data: { status: newStatus } }),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['tasks'] });
  //     queryClient.invalidateQueries({ queryKey: ['task', id] });
  //   },
  // });
  const statusMutation = useUpdateTaskMutation();

  const handleStatusChange = (status: TaskStatus) => {
    statusMutation.mutate({ ...task, status });
  };

  const deleteMutation = useMutation({
    mutationFn: () => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const priorityColors = {
    low: 'bg-slate-100 text-slate-700 border-slate-200',
    medium: 'bg-amber-50 text-amber-700 border-amber-200',
    high: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const priorityLabels = {
    low: 'Низкий',
    medium: 'Средний',
    high: 'Высокий',
  };

  const statusColors = {
    todo: 'bg-gray-100 text-gray-700',
    in_progress: 'bg-blue-50 text-blue-700',
    done: 'bg-emerald-50 text-emerald-700',
  };

  const formattedDate = new Date(createdAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className='flex flex-col justify-between bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 group'>
      <div>
        <div className='flex items-start justify-between gap-2 mb-3'>
          <Link
            to={`/tasks/${id}`}
            className='text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-1 flex items-center gap-1 group-hover:underline'
          >
            {title}
            <ArrowUpRight className='w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600' />
          </Link>
        </div>

        <p className='text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]'>
          {description || 'Нет описания'}
        </p>
      </div>

      <div>
        <div className='flex items-center gap-2 mb-4'>
          <span
            className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
              priorityColors[priority]
            }`}
          >
            {priorityLabels[priority]}
          </span>
          <div className='flex items-center gap-1 text-xs text-gray-400 ml-auto'>
            <Calendar className='w-3.5 h-3.5' />
            {formattedDate}
          </div>
        </div>

        <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
            disabled={statusMutation.isPending}
            className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 cursor-pointer ${
              statusColors[status]
            }`}
          >
            <option value='todo'>К выполнению</option>
            <option value='in_progress'>В процессе</option>
            <option value='done'>Выполнено</option>
          </select>

          <div className='flex items-center gap-1'>
            <button
              onClick={() => onEdit(task)}
              title='Редактировать'
              className='p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
            >
              <Edit className='w-4 h-4' />
            </button>
            <button
              onClick={() => {
                if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
                  deleteMutation.mutate();
                }
              }}
              disabled={deleteMutation.isPending}
              title='Удалить'
              className='p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors'
            >
              <Trash2 className='w-4 h-4' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
