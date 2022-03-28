import Image from 'next/image';
import React from 'react';
import IconButton from 'components/IconButton';

type Props = {
  itemData: any;
  onClickItem: (id: string) => void;
};

const noteItem = ({ itemData, onClickItem }: Props) => {
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
        <IconButton icon='heart' color='red' size='20' onClick={onClick} />
        <span className='text-base text-gray-900 font-semibold'>
          {itemData.numberOfLikes}
        </span>
      </div>
    </div>
  );
};

export default noteItem;
