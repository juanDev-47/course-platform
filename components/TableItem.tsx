import React from 'react';
import TableActions from 'components/TableActions';

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
const tableItem = ({ itemData, tittles, colsClass, colsMobile }: Props) => (
  <div
    className={` grid ${
      colsClass || 'grid-flow-col auto-cols-auto'
    } my-1 rounded-lg border-2 px-3 py-5 border-b border-gray-200 bg-white text-sm`}
  >
    {tittles.map((t) => (
      <span className={`${t.customClass || ''}`} key={t.keyCol}>
        {itemData[t.keyCol]}
      </span>
    ))}
    <TableActions id={itemData.id} />
  </div>
);

export default tableItem;
