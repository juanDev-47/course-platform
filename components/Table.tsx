import React from 'react';
import TableItem from 'components/TableItem';

type Props = {
  tittles: {
    title: string; // titulo de la columna
    customClass?: string; // clase de la columna entera, evitar poner estilos a menos que quiera que se aplique a toda la columna
    keyCol: string; // propiedad representada de la columna
  }[];
  colsClass?: string; // enviar la clase de la cantidad de columnas aqui
  data: any[]; // arreglo de datos
};

const Table = ({ tittles, colsClass, data }: Props) => {
  return (
    <div>
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
};

export default Table;
