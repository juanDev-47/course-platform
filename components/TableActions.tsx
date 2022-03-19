import React, { useState } from 'react';
import IconButton from 'components/IconButton';
import { Dialog } from '@mui/material';
import DeleteDialog from 'components/DeleteDialog';
import { useActionsContext } from 'context/actionsContext';
import { useRouter } from 'next/router';

type Props = {
  id: string;
};

const TableActions = ({ id }: Props) => {
  const actionsContext = useActionsContext();
  const router = useRouter();
  const onDelete = async () => {
    actionsContext.onDelete(id);
  };
  const onEdit = () => {
    actionsContext.onEdit(id);
  };
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const closeDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <div className='flex flex-row gap-12'>
      <IconButton h='20' onClick={onEdit} icon='faPen' color='yellow' />
      <IconButton
        h='20'
        icon='faTrash'
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
