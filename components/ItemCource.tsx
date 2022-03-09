import React from 'react';

const ItemCource = ({ name, platform, onClick, key }: any) => (
  <button type='button' onClick={onClick}>
    <div
      key={key}
      className='flex justify-between px-2 py-2 bg-gray-300 rounded-lg border-2 cursor-pointer hover:border-indigo-500'
    >
      <p className='flex text-gray-700'>
        <svg
          className='h2 w-2 text-indigo-500 mx-2'
          viewBox='0 0 8 8'
          fill='currentColor'
        >
          <circle cx='4' cy='4' r='3' />
        </svg>
        {name}
      </p>
      <p className='text-gray-500 font-thin'>{platform}</p>
    </div>
  </button>
);

export default ItemCource;
