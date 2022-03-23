import React from 'react';

type Props = {
  text: string;
  name: string;
  placeholder: string;
  value?: string;
  isRequired?: boolean;
  onChange?: (e: any) => void;
};

const TextArea = ({
  text,
  placeholder,
  value,
  name,
  isRequired,
  onChange,
}: Props) => (
  <div className='flex flex-col w-full px-3'>
    <label htmlFor={name} className='text-xs font-semibold px-1'>
      <span>{text}</span>
    </label>
    <textarea
      rows={5}
      placeholder={placeholder}
      className='w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
      value={value}
      onChange={onChange}
      required={isRequired}
    />
  </div>
);

export default TextArea;
