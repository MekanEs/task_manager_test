import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '../api/tasks';
import type { TaskFormData, TaskStatus, TaskType } from '../types';

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<TaskType>) => updateTask({ id: data.id || '', data }),
    onMutate: ({ id, ...data }) => {
      queryClient.cancelQueries({ queryKey: ['task', id] });

      const previousData: TaskType | undefined = queryClient.getQueryData(['task', id]);

      queryClient.setQueryData(['task', id], (oldData: TaskType) => {
        return {
          ...oldData,
          ...data,
        };
      });

      return { previousData };
    },
    onSuccess: (data, { id }, context) => {
      queryClient.setQueryData(['task', id], { ...context?.previousData, ...data });
    },
    onError: (error, { id }, context) => {
      queryClient.setQueryData(['task', id], context?.previousData);
    },
  });
};
