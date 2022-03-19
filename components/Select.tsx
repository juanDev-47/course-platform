import React from 'react';
import Select from 'react-select';

const SelectForm = ({
  options,
  onChange,
  title,
  disabled = false,
  defaultValue = null,
}) => (
  <div className='flex flex-col w-full px-3'>
    <span className='text-xs font-semibold px-1'>
      {title}
    </span>
    <Select
      className='block border  border-grey-light w-full rounded mb-4'
      options={options}
      onChange={onChange}
      isDisabled={disabled}
      defaultValue={defaultValue}
    />
  </div>
);

export default SelectForm;