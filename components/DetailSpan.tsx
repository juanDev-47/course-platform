import React from 'react';

type Props = {
  title: string;
  data: string;
};

const DetailSpan = ({ title, data }: Props) => (
  <div className='flex flex-col gap-3 rounded-lg border-2 px-3 py-5 border-b border-gray-200 bg-white text-base w-full items-center'>
    <span>{title}</span>
    {data}
  </div>
);

export default DetailSpan;
