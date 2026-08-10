import type { FC } from 'react';
import { Link } from 'react-router';
import type { TaskType, TaskStatus } from '../types';
import { Calendar, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '../api/tasks';

interface TaskDetailedProps {
  task?: TaskType;
  onEdit: () => void;
  onDelete: () => void;
}

export const TaskDetailed: FC<TaskDetailedProps> = ({ task, onEdit, onDelete }) => {
  const queryClient = useQueryClient();

  const statusMutation = useMutation({
    mutationFn: (newStatus: TaskStatus) => updateTask({ id: task!.id, data: { status: newStatus } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task', task!.id] });
    },
  });

  if (!task) {
    return (
      <div className='text-center py-12'>
        <h2 className='text-xl font-semibold text-gray-800 mb-2'>Задача не найдена</h2>
        <Link to='/' className='text-blue-600 hover:underline'>
          ← Вернуться к списку задач
        </Link>
      </div>
    );
  }

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

  const formattedDate = new Date(task.createdAt).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8'>
      <div className='flex items-center justify-between mb-6'>
        <Link
          to='/'
          className='inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors'
        >
          <ArrowLeft className='w-4 h-4' />
          Назад к списку
        </Link>

        <div className='flex items-center gap-2'>
          <button
            onClick={onEdit}
            className='inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors'
          >
            <Edit className='w-4 h-4' />
            Редактировать
          </button>
          <button
            onClick={onDelete}
            className='inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors'
          >
            <Trash2 className='w-4 h-4' />
            Удалить
          </button>
        </div>
      </div>

      <div className='flex flex-wrap items-center gap-3 mb-4'>
        <select
          value={task.status}
          onChange={(e) => statusMutation.mutate(e.target.value as TaskStatus)}
          disabled={statusMutation.isPending}
          className={`text-xs font-semibold px-3 py-1.5 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 cursor-pointer ${
            statusColors[task.status]
          }`}
        >
          <option value='todo'>К выполнению</option>
          <option value='in_progress'>В процессе</option>
          <option value='done'>Выполнено</option>
        </select>

        <span
          className={`text-xs px-3 py-1.5 rounded-full border font-medium ${
            priorityColors[task.priority]
          }`}
        >
          Приоритет: {priorityLabels[task.priority]}
        </span>
      </div>

      <h1 className='text-3xl font-bold text-gray-900 mb-4'>{task.title}</h1>

      <div className='flex items-center gap-2 text-sm text-gray-400 mb-6 pb-6 border-b border-gray-100'>
        <Calendar className='w-4 h-4' />
        Создано: {formattedDate}
      </div>

      <div>
        <h3 className='text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2'>
          Описание
        </h3>
        <p className='text-gray-700 whitespace-pre-wrap leading-relaxed bg-gray-50/50 p-4 rounded-xl border border-gray-100'>
          {task.description || 'Описание отсутствует'}
        </p>
      </div>
    </div>
  );
};
