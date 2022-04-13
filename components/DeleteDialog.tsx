import React from 'react';
import Button from 'components/Button';
import { useTableContext } from 'context/TableContext';

type Props = {
  onDelete: (e?) => void;
  closeDialog: (e?) => void;
};

const DeleteDialog = ({ onDelete, closeDialog }: Props) => {
  const tableContext = useTableContext();
  const cancel = (e) => {
    e.stopPropagation();
    closeDialog();
  };

  const deleteFunction = async (e) => {
    e.stopPropagation();
    onDelete();
    closeDialog();
  };
  return (
    <div className='flex flex-col items-center gap-10 px-20 py-8'>
      <h2 className='text-2xl text-gray-900 font-semibold'>
        {tableContext.title}
      </h2>
      <span className='text-gray-600 font-semibold text-lg'>
        {tableContext.question}
      </span>
      <div className='flex flex-row gap-5 w-full'>
        <Button
          isSubmit={false}
          text={tableContext.textDelete || ''}
          onClick={deleteFunction}
        />
        <Button isSubmit={false} text='Cancel' onClick={cancel} />
      </div>
    </div>
  );
};

export default DeleteDialog;
