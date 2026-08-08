import { useParams } from 'react-router';
import { type FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/api';
import { QueryWrapper } from '../components/ui/QueryWrapper';
import type { TaskType } from '../types';
import { TaskDetailed } from '../components/TaskDetailed';

export const TaskDetailedPage: FC = () => {
  const { id } = useParams();

  const {
    isPending,
    error,
    data: task,
  } = useQuery({
    queryKey: [`task/${id}`],
    queryFn: () => api.get(`tasks/${id}`),
    staleTime: 30000,
  });

  return (
    <QueryWrapper isLoading={isPending} error={error}>
      <TaskDetailed task={task} />
    </QueryWrapper>
  );
};
