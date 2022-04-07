import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TrainingPlan } from '@prisma/client';
import React from 'react';

type Props = {
  item: TrainingPlan;
  index: number;
  onClick: (index: number) => void;
};

const TrainingPlanItem = ({ index, item, onClick }: Props) => (
  <button
    type='button'
    onClick={() => {
      onClick(index);
    }}
  >
    <div className='flex px-2 py-2 bg-gray-300 rounded-lg border-2 cursor-pointer hover:border-indigo-500'>
      <p className='flex text-gray-700 items-center flex-row gap-3'>
        <FontAwesomeIcon
          icon={faCircle}
          className='h-2 w-2 text-indigo-500 mx-2'
        />
        {item.name}
      </p>
    </div>
  </button>
);

export default TrainingPlanItem;
