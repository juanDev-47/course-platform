import React, { useState } from 'react';
import { Dialog } from '@mui/material';
import DeleteDialog from 'components/DeleteDialog';
import { useTableContext } from 'context/TableContext';

type Props = {
  id: string;
};

const TableActions = ({ id }: Props) => {
  const tableContext = useTableContext();
  const onDelete = async () => {
    if (tableContext.onDelete) tableContext.onDelete(id);
  };
  const onEdit = () => {
    if (tableContext.onEdit) tableContext.onEdit(id);
  };

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const closeDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <div className='flex flex-row gap-12'>
      <button type='button' onClick={onEdit}>
        <i
          className={`fas fa-pen text-[20px] text-yellow-500 hover:text-yellow-700 cursor-pointer `}
        />
      </button>
      <button
        type='button'
        onClick={() => {
          setOpenDeleteDialog(true);
        }}
      >
        <i
          className={`fas fa-trash text-[20px] text-red-500 hover:text-red-700 cursor-pointer `}
        />
      </button>
      <Dialog open={openDeleteDialog} onClose={closeDialog}>
        <DeleteDialog onDelete={onDelete} closeDialog={closeDialog} />
      </Dialog>
    </div>
  );
};

export default TableActions;
