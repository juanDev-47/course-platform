import React from 'react';
import TableItem from 'components/TableItem';
import Button from 'components/Button';

type Props = {
  tittles: {
    title: string; // titulo de la columna
    customClass?: string; // clase de la columna entera, evitar poner estilos a menos que quiera que se aplique a toda la columna
    keyCol: string; // propiedad representada de la columna
  }[];
  colsClass?: string; // enviar la clase de la cantidad de columnas aqui
  data: any[]; // arreglo de datos
  title: string;
  textButtonCreate?: string;
  onClickCreate?: () => {};
};

const Table = ({
  tittles,
  colsClass,
  data,
  title,
  textButtonCreate,
  onClickCreate,
}: Props) => (
  <div className='px-5 py-3 bg-gray-100  rounded-3xl shadow-xl w-full'>
    <div className='flex flex-row items-center justify-between pb-6 px-24'>
      <h2 className='text-gray-600 font-semibold'>{title}</h2>
      <div className='w-[200px]'>
        <Button
          isSubmit={false}
          text={textButtonCreate}
          onClick={onClickCreate}
        />
      </div>
    </div>
    <div className='flex flex-col w-full gap-[2px] px-2 mb-5'>
      <div
        className={` grid ${
          colsClass || 'grid-flow-col auto-cols-auto'
        } items-center w-full px-3`}
      >
        {tittles.map((t) => (
          <span className={`${t.customClass || ''}`} key={t.keyCol}>
            {t.title}
          </span>
        ))}
      </div>
    </div>
    {data.map((d) => (
      <TableItem
        key={d.id}
        tittles={tittles}
        colsClass={colsClass}
        itemData={d}
      />
    ))}
  </div>
);

export default Table;
