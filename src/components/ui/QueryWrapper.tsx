import type { ReactNode, FC } from 'react';

interface QueryWrapperProps {
  isLoading: boolean;
  error: Error | null;
  children: ReactNode;
  loadingFallback?: ReactNode;
  errorFallback?: (error: Error) => ReactNode;
}

export const QueryWrapper: FC<QueryWrapperProps> = ({
  isLoading,
  error,
  children,
  loadingFallback = <div>Загрузка...</div>,
  errorFallback = (error: Error) => <div className='text-red-500'>Ошибка: {error.message}</div>,
}) => {
  if (isLoading) return loadingFallback;
  if (error) return errorFallback(error);
  return children;
};
