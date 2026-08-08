import type { FC } from 'react';
import type { TaskType } from '../types';
import { Link } from 'react-router';

export const TaskCard: FC<{ task: TaskType }> = ({ task }) => {
  const { title, description, priority, status, id } = task;

  return (
    <div className='mt-3 flex flex-col bg-slate-300'>
      <h3>{title}</h3>
      <p>{description}</p>
      <strong>👀 {priority}</strong> <strong>✨ {status}</strong>
      <Link className='text-white bg-slate-600 p-2' to={`/tasks/${id}`}>
        Открыть задачу
      </Link>
    </div>
  );
};
