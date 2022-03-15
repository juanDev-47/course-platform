import React from 'react';

type Props = {
  tittles: {
    title: string;
    customClass?: string;
    keyCol: string;
    mobileClass?: string;
  }[];
  colsClass?: string;
  colsMobile?: string;
  itemData: any;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tableItem = ({ itemData, tittles, colsClass, colsMobile }: Props) => {
  return (
    <div className='flex flex-col w-full gap-[2px] px-2 my-1 border-gray-500 rounded-lg border-2'>
      <div
        className={` grid ${
          colsClass || 'grid-flow-col auto-cols-auto'
        } items-center w-full px-3`}
      >
        {tittles.map((t) => (
          <span className={`${t.customClass || ''}`} key={t.keyCol}>
            {itemData[t.keyCol]}
          </span>
        ))}
      </div>
    </div>
  );
};

export default tableItem;
