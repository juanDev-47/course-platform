import React from 'react';
import Button from 'components/Button';

type Props = {
  title: string;
  children: JSX.Element;
  onCancel?: () => void;
  textSubmit: string;
  onSubmit: (e: any) => Promise<void>;
  refForm?;
  onChange?;
};

const Form = ({
  title,
  children,
  onCancel,
  textSubmit,
  onSubmit,
  refForm,
  onChange,
}: Props) => (
  <form
    onSubmit={onSubmit}
    ref={refForm}
    onChange={onChange}
    className='flex flex-col  bg-gray-100  rounded-3xl shadow-xl my-5 sm:my-10 py-5 sm:py-10 px-5 sm:px-10  mx-1 sm:mx-5 md:mx-10 lg:mx-16 2xl:mx-52'
  >
    <h1 className='font-bold text-3xl text-gray-900 text-center mb-10'>
      {title}
    </h1>

    {children}

    <div className='flex flex-row gap-3 mt-10'>
      <Button isSubmit text={textSubmit || 'Save'} />
      <Button isSubmit={false} text='Cancel' onClick={onCancel} />
    </div>
  </form>
);

export default Form;
