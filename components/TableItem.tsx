import React from 'react';
import TableActions from 'components/TableActions';
import PrivateComponent from 'components/PrivateComponent';
<<<<<<< Updated upstream
=======
import { useTableContext } from 'context/TableContext';
import { nanoid } from 'nanoid';
>>>>>>> Stashed changes

type Props = {
  tittles: {
    title: string;
    customClass?: string;
    keyCol: string;
    mobileClass?: string;
  }[];
  colsClass?: string;
  itemData: any;
};

<<<<<<< Updated upstream
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
    <PrivateComponent roleList={['Admin']}>
      <TableActions id={itemData.id} />
    </PrivateComponent>
  </div>
);
=======
const TableItem = ({ itemData, tittles, colsClass }: Props) => {
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
      <PrivateComponent roleList={['Admin']}>
        <TableActions id={itemData.id} />
      </PrivateComponent>
    </div>
  );
};
>>>>>>> Stashed changes

export default TableItem;
