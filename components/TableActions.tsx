import React, { useState } from 'react';
import IconButton from 'components/IconButton';
import { Dialog } from '@mui/material';
import DeleteDialog from 'components/DeleteDialog';
import { useActionsContext } from 'context/actionsContext';

type Props = {
  id: string;
};

const TableActions = ({ id }: Props) => {
  const actionsContext = useActionsContext();
  const onDelete = async () => {
<<<<<<< Updated upstream
    actionsContext.onDelete(id);
  };
  const onEdit = () => {
    actionsContext.onEdit(id);
=======
    if (tableContext.onDelete) tableContext.onDelete(id);
  };
  const onEdit = () => {
    if (tableContext.onEdit) tableContext.onEdit(id);
>>>>>>> Stashed changes
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
      <Dialog open={openDeleteDialog} onClose={closeDialog}>
        <DeleteDialog onDelete={onDelete} closeDialog={closeDialog} />
      </Dialog>
    </div>
  );
};

export default TableActions;
