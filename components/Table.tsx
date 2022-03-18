import React from 'react';
import TableItem from 'components/TableItem';
import Button from 'components/Button';
import { DialogDeleteData } from 'interfaces/DialogDeleteData';
import { DialogDeleteContext } from 'context/dialogDelete';

type Props = {
  tittles: {
    title: string; // titulo de la columna
    customClass?: string; // clase de la columna entera, evitar poner estilos a menos que quiera que se aplique a toda la columna
    keyCol: string; // propiedad representada de la columna
  }[];
  colsClass?: string; // enviar la clase de la cantidad de columnas aqui
  data: any[]; // arreglo de datos
  title: string;
  textButtonCreate: string;
  onClickCreate?: () => void;
  dialogDeleteData: DialogDeleteData;
};

const Table = ({
  tittles,
  colsClass,
  data,
  title,
  textButtonCreate,
  onClickCreate,
  dialogDeleteData,
}: Props) => (
  <div className='px-5 pt-3 pb-12 bg-gray-100  rounded-3xl shadow-xl w-full'>
    <div className='flex flex-row items-center justify-between p-6 px-24'>
      <h2 className='text-gray-600 font-semibold'>{title}</h2>
      <div className='w-[200px]'>
        <Button
          isSubmit={false}
          text={textButtonCreate}
          onClick={onClickCreate}
        />
      </div>
    </div>
    <div
      className={` grid ${
        colsClass || 'grid-flow-col auto-cols-auto'
      } px-3 py-3 border-b-2 border-gray-400 bg-gray-300 text-xs font-semibold text-gray-700 uppercase tracking-wider`}
    >
      {tittles.map((t) => (
        <span className={`${t.customClass || ''}`} key={t.keyCol}>
          {t.title}
        </span>
      ))}
    </div>
    <DialogDeleteContext.Provider value={dialogDeleteData}>
      {data.map((d) => (
        <TableItem
          key={d.id}
          tittles={tittles}
          colsClass={colsClass}
          itemData={d}
        />
      ))}
    </DialogDeleteContext.Provider>
  </div>
);

export default Table;
