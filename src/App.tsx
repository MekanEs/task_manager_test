import { useIsFetching } from '@tanstack/react-query';
import './App.css';

import { Outlet } from 'react-router';

function App() {
  const fetchingNumber = useIsFetching();
  return (
    <div className='w-full min-h-screen h-full p-2 bg-slate-100 '>
      <div
        data-visible={fetchingNumber > 0}
        className='fixed top-0 left-0 right-0 h-3 bg-red-500 z-50 transform transition-transform duration-300 ease-in-out -translate-y-full data-[visible=true]:translate-y-0 shadow-md'
      />
      <main className='relative p-3'>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
