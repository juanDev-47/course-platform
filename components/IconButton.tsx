import React from 'react';

type Props = {
  icon: string;
  color: string;
  size: string;
  onClick: () => void;
};

const IconButton = ({ icon, color, size, onClick }: Props) => (
  <button type='button' onClick={onClick}>
    <i
      className={`fas fa-${icon} text-[${size}px] text-${color}-500 hover:text-${color}-700 cursor-pointer `}
    />
  </button>
);

export default IconButton;
