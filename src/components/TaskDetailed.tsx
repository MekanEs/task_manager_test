import type { FC } from 'react';
import { Link } from 'react-router';
import type { TaskType } from '../types';

interface TaskDetailedProps {
  className?: string;
  task?: TaskType;
}

export const TaskDetailed: FC<TaskDetailedProps> = ({ className, task }) => {
  return (
    <>
      {!task ? (
        <div>что-то не так</div>
      ) : (
        <div className={[className, ''].join('')}>
          <Link to='/'>← Назад к списку</Link>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <div>Статус: {task.status}</div>
          <div>Приоритет: {task.priority}</div>
        </div>
      )}
    </>
  );
};
