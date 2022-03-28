import ClipLoader from 'react-spinners/ClipLoader';

const Loading = () => (
  <div className='flex flex-row gap-10 items-center  justify-center'>
    <span className='text-3xl text-white'>LOADING...</span>
    <ClipLoader size={70} color='#ffffff' />
  </div>
);

export default Loading;
