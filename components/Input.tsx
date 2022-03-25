import React from 'react';

type Props = {
  text: string;
  name: string;
  placeholder: string;
  type: string;
  value?: string;
  isRequired?: boolean;
  onChange?: (e: any) => void;
};

const input = ({
  text,
  name,
  placeholder,
  type,
  value,
  isRequired,
  onChange,
}: Props) => (
  <div className='flex flex-col w-full px-3'>
    <label htmlFor={name} className='text-xs font-semibold px-1'>
      <span>{text}</span>
    </label>
    <input
      type={type}
      className='w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      id={name}
      required={isRequired}
    />
  </div>
);

export default input;
