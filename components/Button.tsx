import React from 'react';

interface ButtonInterface {
  isSubmit: boolean;
  onClick?: () => void;
  text: string;
}

const Button = ({ isSubmit, onClick, text }: ButtonInterface) => (
  <button
    className='block w-full bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold'
    type={isSubmit ? 'submit' : 'button'}
    onClick={onClick}
  >
    {text}
  </button>
);

export default Button;
