import React from 'react';
import Button from 'components/Button';

const Form = ({ title, children, onCancel, textSubmit, onSubmit }: any) => (
  <form onSubmit={onSubmit}>
    <div className='flex flex-col w-max py-10 px-5 md:px-10 bg-gray-100  rounded-3xl shadow-xl mx-auto mt-16'>
      <h1 className='font-bold text-3xl text-gray-900 text-center mb-10'>
        {title}
      </h1>

      {children}

      <div className='flex flex-row gap-3 mt-10'>
        <Button isSubmit text={textSubmit} />
        <Button isSubmit={false} text='Cancel' onClick={onCancel} />
      </div>
    </div>
  </form>
);

export default Form;
