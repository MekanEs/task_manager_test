import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../api/tasks';
import type { FC } from 'react';
import { TaskList } from '../components/TaskList';
import { TaskFilters } from '../components/TaskFilters';
import { TaskFormContainer } from '../components/TaskFormContainer';
import { QueryWrapper } from '../components/ui/QueryWrapper';
import { Modal } from '../components/ui/Modal';
import { useDebounce } from '../hooks/useDebounce';
import type { TaskStatus, TaskType } from '../types';
import { Header } from '../components/ui/Header';

const TasksPage: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | 'all'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskType | undefined>(undefined);

  const debouncedSearch = useDebounce(searchQuery, 300);

  const {
    isPending,
    error,
    data: tasks,
  } = useQuery({
    queryKey: ['tasks', selectedStatus, debouncedSearch],
    queryFn: () => getTasks({ status: selectedStatus, search: debouncedSearch }),
  });

  const handleTaskEdit = useCallback((task: TaskType) => setEditingTask(task), []);

  const closeEditModal = () => setEditingTask(undefined);
  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  return (
    <div className='max-w-6xl mx-auto py-6 px-4'>
      <Header />
      <TaskFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onCreateClick={openCreateModal}
      />

      <QueryWrapper isLoading={isPending} error={error}>
        <TaskList tasks={tasks} onEdit={handleTaskEdit} />
      </QueryWrapper>

      <Modal isOpen={isCreateModalOpen} onClose={closeCreateModal} title='Создать новую задачу'>
        <TaskFormContainer onSuccess={closeCreateModal} />
      </Modal>

      <Modal isOpen={!!editingTask} onClose={closeEditModal} title='Редактировать задачу'>
        {editingTask && <TaskFormContainer task={editingTask} onSuccess={closeEditModal} />}
      </Modal>
    </div>
  );
};
export default TasksPage;
