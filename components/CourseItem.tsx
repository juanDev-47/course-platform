import React from 'react';
import { Course } from 'interfaces/TrainingPlan';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

type Props = {
  item: Course;
  index: number;
  onClick: (index: number) => void;
};

const CourseItem = ({ item, index, onClick }: Props) => (
  <button
    type='button'
    onClick={() => {
      onClick(index);
    }}
  >
    <div className='flex justify-between px-2 py-2 bg-gray-300 rounded-lg border-2 cursor-pointer hover:border-indigo-500'>
      <p className='flex text-gray-700 items-center flex-row gap-3'>
        <FontAwesomeIcon
          icon={faCircle}
          className='h-2 w-2 text-indigo-500 mx-2'
        />
        {item.name}
      </p>
      <p className='text-gray-500 font-thin'>{item.platform}</p>
    </div>
  </button>
);

export default CourseItem;
