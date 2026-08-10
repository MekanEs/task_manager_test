import { useParams, useNavigate } from 'react-router';
import { type FC, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTaskById, deleteTask } from '../api/tasks';
import { QueryWrapper } from '../components/ui/QueryWrapper';
import { TaskDetailed } from '../components/TaskDetailed';
import { Modal } from '../components/ui/Modal';
import { TaskFormContainer } from '../components/TaskFormContainer';

const TaskDetailedPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const {
    isPending,
    error,
    data: task,
  } = useQuery({
    queryKey: ['task', id],
    queryFn: () => getTaskById(id!),
    enabled: !!id,
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteTask(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      navigate('/');
    },
  });

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      deleteMutation.mutate();
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className='max-w-3xl mx-auto py-8 px-4'>
      <QueryWrapper isLoading={isPending} error={error}>
        <TaskDetailed task={task} onEdit={handleEditClick} onDelete={handleDeleteClick} />
      </QueryWrapper>

      {task && (
        <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal} title='Редактировать задачу'>
          <TaskFormContainer task={task} onSuccess={handleEditSuccess} />
        </Modal>
      )}
    </div>
  );
};
export default TaskDetailedPage;
