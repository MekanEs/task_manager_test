import { useQuery } from '@tanstack/react-query';
import { api } from '../api/api';
import type { FC } from 'react';
import { TaskList } from '../components/TaskList';
import { QueryWrapper } from '../components/ui/QueryWrapper';

export const TasksPage: FC = () => {
  const {
    isPending,
    error,
    data: tasks,
  } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => api.get('tasks'),
    staleTime: 50000,
  });

  return (
    <QueryWrapper isLoading={isPending} error={error}>
      <TaskList tasks={tasks} />
    </QueryWrapper>
  );
};
