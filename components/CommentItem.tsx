import React from 'react';
import Image from 'next/image';

type Props = {
  itemData: any;
};

const CommentItem = ({ itemData }: Props) => (
  <div className='flex flex-row rounded-lg border-2 px-3 py-5 border-b border-gray-200 bg-white text-sm gap-8 items-center'>
    <Image
      src={itemData.user.image}
      alt='profile'
      width={55}
      height={55}
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
