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
  const onViewNotes = (e) => {
    e.stopPropagation();
    if (tableContext.onViewNotes) tableContext.onViewNotes(id);
  };

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const changeDialog = (e) => {
    setOpenDeleteDialog(!openDeleteDialog);
    if (e) e.stopPropagation();
  };

  return (
    <div className='flex flex-row gap-6 md:gap-12'>
      <button type='button' onClick={onViewNotes}>
        <i className={`fas fa-sticky-note text-[20px] text-yellow-500 hover:text-yellow-700 cursor-pointer `}></i>
      </button>
      <button type='button' onClick={changeDialog}>
        <i
          className={`fas fa-trash text-[20px] text-red-500 hover:text-red-700 cursor-pointer `}
        />
      </button>
      <Dialog open={openDeleteDialog} onClose={changeDialog}>
        <DeleteDialog onDelete={onDelete} closeDialog={changeDialog} />
      </Dialog>
    </div>
  );
};

export default TableActions;
