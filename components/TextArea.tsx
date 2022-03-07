import React from 'react';

const TextArea = ({ text, name, placeholder }: any) => (
  <div className='flex flex-col w-full px-3'>
    <label htmlFor={name} className='text-xs font-semibold px-1'>
      {text}
    </label>
    <textarea
      rows={10}
      placeholder={placeholder}
      className='w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
    />
  </div>
);

export default TextArea;
