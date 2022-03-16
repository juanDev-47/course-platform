/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Course } from 'interfaces/TrainingPlan';

type Props = {
  item: any;
  index: number;
  onClick: (index: number) => void;
};

const ListItem = ({ item, onClick, index }: Props) => {
  const typeItem = typeof item;
  console.log(typeItem, 'aaa');
  let itemComponent;
  const aux = true;

  switch (aux) {
    case true: {
      itemComponent = <ListItemCourse item={item} />;
      break;
    }

    default: {
      itemComponent = <ListItemCourse item={item} />;
      break;
    }
  }

  return (
    <button
      type='button'
      onClick={() => {
        onClick(index);
      }}
    >
      {itemComponent}
    </button>
  );
};

export default ListItem;

const ListItemCourse = ({ item }: any) => (
  <div className='flex justify-between px-2 py-2 bg-gray-300 rounded-lg border-2 cursor-pointer hover:border-indigo-500'>
    <p className='flex text-gray-700'>
      <svg
        className='h2 w-2 text-indigo-500 mx-2'
        viewBox='0 0 8 8'
        fill='currentColor'
      >
        <circle cx='4' cy='4' r='3' />
      </svg>
      {item.name}
    </p>
    <p className='text-gray-500 font-thin'>{item.platform}</p>
  </div>
);
