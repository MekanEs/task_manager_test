import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask, updateTask } from '../api/tasks';
import type { TaskFormValues } from './TaskForm';
import { TaskForm } from './TaskForm';
import type { TaskType } from '../types';
import { useUpdateTaskMutation } from '../hooks/useMutations';

interface TaskFormContainerProps {
  task?: TaskType;
  onSuccess?: () => void;
}

export const TaskFormContainer: React.FC<TaskFormContainerProps> = ({ task, onSuccess }) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      onSuccess?.();
    },
  });

  const updateMutation = useUpdateTaskMutation();

  const handleSubmit = (data: TaskFormValues) => {
    if (task) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <TaskForm
      initialData={task}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      onCancel={onSuccess}
    />
  );
};
