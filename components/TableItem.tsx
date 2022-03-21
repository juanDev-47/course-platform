/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import TableActions from 'components/TableActions';
import PrivateComponent from 'components/PrivateComponent';
import { useTableContext } from 'context/TableContext';

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
  const actionsContext = useTableContext();
  const onClickItem = (id: string) => {
    if (actionsContext.onClickItem) actionsContext.onClickItem(id);
  };
  return (
    <div
      onClick={onClickItem}
      className={` grid ${
        colsClass || 'grid-flow-col auto-cols-auto'
      } my-1 rounded-lg border-2 px-3 py-5 border-b border-gray-200 bg-white text-sm hover:bg-slate-300 cursor-pointer`}
    >
      {tittles.map((t) => (
        <span className={`${t.customClass || ''}`} key={t.keyCol}>
          {itemData[t.keyCol]}
        </span>
      ))}
      <PrivateComponent roleList={['Admin']}>
        <TableActions id={itemData.id} />
      </PrivateComponent>
    </div>
  );
};

export default tableItem;
