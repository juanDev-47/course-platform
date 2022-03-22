import React from 'react';

type Props = {
  title: string;
  children: JSX.Element;
};

const DetailDiv = ({ title, children }: Props) => (
  <div className='flex flex-col gap-5 w-full px-5 pt-7 pb-12 bg-gray-100  rounded-3xl shadow-xl items-center'>
    <h1 className='text-gray-600 font-semibold uppercase text-2xl'>{title}</h1>
    {children}
  </div>
);

export default DetailDiv;
