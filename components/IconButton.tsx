import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faX } from '@fortawesome/free-solid-svg-icons';

type Props = {
  icon: string;
  color: string;
  h: string;
  onClick: () => void;
};

const IconButton = ({ icon, color, h, onClick }: Props) => {
  let module;
  switch (icon) {
    case 'faPen': {
      module = faPen;
      break;
    }
    case 'faTrash': {
      module = faTrash;
      break;
    }
    default: {
      module = faX;
      break;
    }
  }
  return (
    <button type='button' onClick={onClick}>
      <FontAwesomeIcon
        icon={module}
        className={`h-[${h}px] text-${color}-500 hover:text-${color}-700 cursor-pointer `}
      />
    </button>
  );
};

export default IconButton;
