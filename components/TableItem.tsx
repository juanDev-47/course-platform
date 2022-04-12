import React from 'react';
import TableActions from 'components/TableActions';
import PrivateComponent from 'components/PrivateComponent';
import { useTableContext } from 'context/TableContext';
import { nanoid } from 'nanoid';

type Props = {
  tittles: {
    title: string;
    customClass?: string;
    keyCol: string;
    mobileClass?: string;
  }[];
  colsClass?: string;
  itemData: any;
  extraActions?: boolean | ((id: string) => void);
};

const TableItem = ({ itemData, tittles, colsClass, extraActions }: Props) => {
  const actionsContext = useTableContext();
  const onClickItem = () => {
    if (actionsContext.onClickItem) actionsContext.onClickItem(itemData.id);
  };
  return (
    <div
      onClick={onClickItem}
      role='button'
      tabIndex={0}
      onKeyPress={onClickItem}
      className={` grid ${
        colsClass || 'grid-flow-col auto-cols-auto'
      } my-1 rounded-lg border-2 px-3 py-5 border-b border-gray-200 bg-white text-sm hover:bg-slate-300 cursor-pointer`}
    >
      {tittles.map((t) => (
        <span className={`${t.customClass || ''}`} key={nanoid()}>
          {itemData[t.keyCol]}
        </span>
      ))}
      {extraActions && (
        <PrivateComponent roleList={['Admin']}>
          <TableActions id={itemData.id} />
        </PrivateComponent>
      )}
    </div>
  );
};

export default TableItem;
