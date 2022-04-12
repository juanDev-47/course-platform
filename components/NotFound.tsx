import React from 'react';
import Loading from '@components/Loading';
import useRedirect from 'hooks/useRedirect';

const NotFoundComponent = () => {
  const { loading, push } = useRedirect();

  if (loading) return <Loading />;

  return (
    <div className='flex h-screen justify-center flex-col items-center'>
      <div className='font-bold text-white m-5 text-3xl'>
        404 - PAGE NOT FOUND
      </div>
      <h4 className='text-white m-3 text-sm'>
        Please contact the system administrator to check what went wrong
      </h4>

      <button
        type='button'
        className='border border-transparent hover:border-blue-500 text-blue-500 px-3 py-2 rounded-md text-sm font-medium'
        onClick={() => push('/')}
      >
        Go to Main Page
      </button>
    </div>
  );
};

export default NotFoundComponent;
