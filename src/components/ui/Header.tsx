import { CheckSquare } from 'lucide-react';
import type { FC } from 'react';

export const Header: FC = () => {
  return (
    <header className='flex items-center justify-between mb-8 pb-4 border-b border-gray-200'>
      <div className='flex items-center gap-3'>
        <div className='p-2.5 bg-blue-600 text-white rounded-xl shadow-sm'>
          <CheckSquare className='w-6 h-6' />
        </div>
        <div>
          <h1 className='text-2xl font-bold text-gray-950'>Менеджер задач</h1>
          <p className='text-sm text-gray-600'>
            Управляйте вашими задачами и отслеживайте прогресс
          </p>
        </div>
      </div>
    </header>
  );
};
