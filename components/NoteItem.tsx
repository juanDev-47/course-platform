import Image from 'next/image';
import React from 'react';

type Props = {
  itemData: any;
  onClickItem: (id: string) => void;
};

const NoteItem = ({ itemData, onClickItem }: Props) => {
  const onClick = () => {
    onClickItem(itemData.id);
  };

  return (
    <div className='flex flex-row rounded-lg border-2 px-3 py-5 border-b border-gray-200 bg-white text-sm gap-8 items-center justify-between'>
      <Image
        src={itemData.user.image}
        alt='profile'
        width={55}
        height={55}
        className='border-2 border-gray-400'
      />

      <div className='flex flex-col gap-2 w-full'>
        <span className='text-base text-gray-900 font-semibold'>
          {itemData.user.name}
        </span>
        <span className='text-gray-900 font-semibold text-left'>
          {itemData.note}
        </span>
      </div>
      <div className='flex flex-col gap-2 mr-10 items-center'>
        {itemData.isLike ? (
          <button type='button' onClick={onClick}>
            <i className='fas fa-heart text-[30px] text-red-500 hover:text-red-700 cursor-pointer' />
          </button>
        ) : (
          <button type='button' onClick={onClick}>
            <i className='fas fa-heart text-[30px] text-gray-400 hover:text-gray-700 cursor-pointer' />
          </button>
        )}
        <span className='text-base text-gray-900 font-semibold'>
          {itemData.numberOfLikes}
        </span>
      </div>
    </div>
  );
};

export default NoteItem;
