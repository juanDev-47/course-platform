import React from 'react';
import Button from 'components/Button';
import { useActionsContext } from 'context/actionsContext';

type Props = {
  onDelete: () => void;
  closeDialog: () => void;
};

const DeleteDialog = ({ onDelete, closeDialog }: Props) => {
  const dialogDeleteData = useActionsContext();
  const cancel = () => {
    closeDialog();
  };

  const deleteFunction = async () => {
    onDelete();
    closeDialog();
  };
  return (
    <div className='flex flex-col items-center gap-10 px-20 py-8'>
      <h2 className='text-2xl text-gray-900 font-semibold'>
        {dialogDeleteData.title}
      </h2>
      <span className='text-gray-600 font-semibold text-lg'>
        {dialogDeleteData.question}
      </span>
      <div className='flex flex-row gap-5 w-full'>
        <Button
          isSubmit={false}
          text={dialogDeleteData.textDelete}
          onClick={deleteFunction}
        />
        <Button isSubmit={false} text='Cancel' onClick={cancel} />
      </div>
    </div>
  );
};

export default DeleteDialog;
