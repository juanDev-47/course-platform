import React from 'react';
import Select from 'react-select';

type Props = {
  options: {
    value: string;
    label: string;
  }[];
  onChange: (e: any) => void;
  value: any,
  title: string;
  disabled?: boolean;
};

const SelectForm = ({ options, onChange, title, value, disabled = false }: Props) => (
  <div className='flex flex-col w-full px-3'>
    <span className='text-xs font-semibold px-1'>{title}</span>
    <Select
      className='block border  border-grey-light w-full rounded mb-4'
      options={options}
      onChange={onChange}
      value={value}
      isDisabled={disabled}
    />
  </div>
);

export default SelectForm;
