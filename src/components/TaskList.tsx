import type { FC } from 'react';
import type { TaskType } from '../types';
import { TaskCard } from './TaskCard';

export const TaskList: FC<{ tasks?: TaskType[] }> = ({ tasks = [] }) => {
  return (
    <div className='task-list'>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};
