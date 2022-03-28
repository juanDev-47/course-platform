import ClipLoader from 'react-spinners/ClipLoader';

const Loading = () => (
  <div className='flex flex-row items-center gap-10 justify-center w-full'>
    <span className='text-3xl'>LOADING...</span>
    <ClipLoader size={70} color='white' />
  </div>
);

export default Loading;
