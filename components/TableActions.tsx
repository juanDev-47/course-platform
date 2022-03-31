import React, { useState } from 'react';
import IconButton from 'components/IconButton';
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

  const onView = () => {
    if (tableContext.onView) tableContext.onView(id);
  };
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const closeDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <div className='flex flex-row gap-12'>
      <IconButton size='20' onClick={onEdit} icon='pen' color='yellow' />
      <IconButton
        size='20'
        icon='trash'
        color='red'
        onClick={() => {
          setOpenDeleteDialog(true);
        }}
      />
      <IconButton size='20' onClick={onView} icon='eye' color='blue' />
      <Dialog open={openDeleteDialog} onClose={closeDialog}>
        <DeleteDialog onDelete={onDelete} closeDialog={closeDialog} />
      </Dialog>
    </div>
  );
};

export default TableActions;
