import React, { useState } from 'react';
import Button from './Button';

interface ButtonInterface {
  onClick?: () => void;
  text: string;
  textButton: string;
  children: JSX.Element;
}

const Modal = ({ onClick, text, textButton, children }: ButtonInterface) => (
  <div className='flex flex-col items-center gap-10 px-20 py-8'>
    <div className='text-2xl text-gray-900 font-semibold mx-10'>
      <h1>{text}</h1>
    </div>

    <div className='flex flex-col items-center gap-1'>
      <h2 className='text-lg text-gray-900 font-semibold'>
        Upload certificate
      </h2>
      {children}
    </div>

    <Button onClick={onClick} text={textButton} isSubmit={false} />
  </div>
);

export default Modal;
