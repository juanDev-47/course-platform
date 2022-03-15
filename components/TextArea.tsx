import React from 'react';

const TextArea = ({ text, placeholder, value, onChange }: any) => (
  <div className='flex flex-col w-full px-3'>
    <span className='text-xs font-semibold px-1'>{text}</span>
    <textarea
      rows={5}
      placeholder={placeholder}
      className='w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
      value={value}
      onChange={onChange}
    />
  </div>
);

export default TextArea;
