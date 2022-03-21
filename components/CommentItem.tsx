/* eslint-disable @next/next/no-img-element */
import React from 'react';

type Props = {
  itemData: any;
};

const CommentItem = ({ itemData }: Props) => (
  <div className='flex flex-row my-1 rounded-lg border-2 px-3 py-5 border-b border-gray-200 bg-white text-sm gap-8 items-center'>
    <img
      src={itemData.user.image}
      alt='profile'
      width='60'
      height='50'
      className='border-2 border-gray-400'
    />

    <div className='flex flex-col gap-2'>
      <span className='text-base text-gray-900 font-semibold'>
        {itemData.user.name}
      </span>
      <span className='text-gray-900 font-semibold'>{itemData.comment}</span>
    </div>
  </div>
);

export default CommentItem;
