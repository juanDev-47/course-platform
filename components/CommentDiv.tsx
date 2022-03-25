import React, { useState } from 'react';
import Button from 'components/Button';
import PrivateComponent from 'components/PrivateComponent';
import Image from 'next/image';

type Props = {
  title: string;
  comments: any;
  ItemComponent: ({ itemData }: any) => JSX.Element;
  imageUser: string;
  onSend: (comment: string) => void;
};

const CommentDiv = ({
  title,
  comments,
  ItemComponent,
  imageUser,
  onSend,
}: Props) => {
  const [comment, setComment] = useState('');

  const onClick = () => {
    onSend(comment);
  };
  return (
    <div className='px-5 pt-3 pb-12 bg-gray-100  rounded-3xl shadow-xl w-full'>
      <h2 className='text-gray-600 font-semibold p-6 px-24'>{title}</h2>
      {comments.map((itemData: any) => (
        <ItemComponent key={itemData.id} itemData={itemData} />
      ))}
      <PrivateComponent roleList={['Employee']}>
        <div className='flex flex-col my-1 rounded-lg border-2 px-3 py-2 border-b border-gray-400 bg-slate-200 text-sm gap-2 items-center'>
          <div className='flex flex-row gap-8 w-full'>
            <Image
              src={imageUser}
              alt='profile'
              width={60}
              height={50}
              className='border-2 border-gray-400'
            />
            <input
              value={comment}
              onChange={(e: any) => {
                setComment(e.target.value);
              }}
              className='w-full px-3 py-4 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
              placeholder='Write a comment here...'
            />
          </div>
          <Button isSubmit={false} text='Send comment' onClick={onClick} />
        </div>
      </PrivateComponent>
    </div>
  );
};

export default CommentDiv;
