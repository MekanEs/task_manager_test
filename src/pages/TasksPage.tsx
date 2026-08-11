import { useCallback, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
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
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(searchQuery, 300);

  const { isPending, error, data } = useQuery({
    queryKey: ['tasks', selectedStatus, debouncedSearch, page],
    queryFn: () => getTasks({ status: selectedStatus, search: debouncedSearch, page: page }),
    placeholderData: keepPreviousData,
    retry: false,
  });

  const { total = 0, data: tasks } = data || {};
  const handleTaskEdit = useCallback((task: TaskType) => setEditingTask(task), []);

  const closeEditModal = () => setEditingTask(undefined);
  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  return (
    <div className='max-w-6xl mx-auto py-6 px-4'>
      <Header />
      <TaskFilters
        className={`${isPending ? 'opacity-50' : ''}`}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onCreateClick={openCreateModal}
      />

      <QueryWrapper isLoading={isPending} error={error}>
        <TaskList
          className={`${isPending ? 'opacity-50' : ''}`}
          tasks={tasks}
          onEdit={handleTaskEdit}
        />
      </QueryWrapper>

      <Modal isOpen={isCreateModalOpen} onClose={closeCreateModal} title='Создать новую задачу'>
        <TaskFormContainer onSuccess={closeCreateModal} />
      </Modal>

      <Modal isOpen={!!editingTask} onClose={closeEditModal} title='Редактировать задачу'>
        {editingTask && <TaskFormContainer task={editingTask} onSuccess={closeEditModal} />}
      </Modal>
      <div>
        <button className='cursor-pointer' onClick={() => setPage((prev) => prev - 1)}>
          prev
        </button>
        <ul className='flex gap-2'>
          {Array.from({ length: Math.ceil(total / 5) }).map((_, ind) => (
            <li
              onClick={() => setPage(ind + 1)}
              className={`cursor-pointer p-2 rounded bg-slate-200 ${ind + 1 === page ? 'text-emerald-600' : 'text-slate-600'}`}
              key={ind}
            >
              {ind + 1}
            </li>
          ))}
        </ul>
        <button className='cursor-pointer' onClick={() => setPage((prev) => prev + 1)}>
          next
        </button>
      </div>
    </div>
  );
};
export default TasksPage;
