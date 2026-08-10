import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { TaskType } from '../types';

const taskSchema = z.object({
  title: z.string().min(1, 'Название обязательно').max(100, 'Слишком длинное название'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['todo', 'in_progress', 'done']),
});

export type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskFormProps {
  initialData?: TaskType;
  onSubmit: (data: TaskFormValues) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      priority: initialData?.priority || 'medium',
      status: initialData?.status || 'todo',
    },
  });

  const isEditing = !!initialData?.id;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
          Название задачи *
        </label>
        <input
          id='title'
          type='text'
          {...register('title')}
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          placeholder='Введите название задачи'
        />
        {errors.title && <p className='mt-1 text-sm text-red-600'>{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
          Описание
        </label>
        <textarea
          id='description'
          rows={4}
          {...register('description')}
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          placeholder='Введите описание задачи'
        />
        {errors.description && (
          <p className='mt-1 text-sm text-red-600'>{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor='priority' className='block text-sm font-medium text-gray-700'>
          Приоритет
        </label>
        <select
          id='priority'
          {...register('priority')}
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
        >
          <option value='low'>Низкий</option>
          <option value='medium'>Средний</option>
          <option value='high'>Высокий</option>
        </select>
      </div>

      <div>
        <label htmlFor='status' className='block text-sm font-medium text-gray-700'>
          Статус
        </label>
        <select
          id='status'
          {...register('status')}
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
        >
          <option value='todo'>К выполнению</option>
          <option value='in_progress'>В процессе</option>
          <option value='done'>Выполнено</option>
        </select>
      </div>

      <div className='flex gap-3 pt-4'>
        <button
          type='submit'
          disabled={isLoading}
          className='flex-1 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors'
        >
          {isLoading ? 'Сохранение...' : isEditing ? 'Обновить задачу' : 'Создать задачу'}
        </button>
        {onCancel && (
          <button
            type='button'
            onClick={onCancel}
            className='rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
          >
            Отмена
          </button>
        )}
      </div>
    </form>
  );
};
