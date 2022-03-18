import { createContext, useContext } from 'react';
import { DialogDeleteData } from 'interfaces/DialogDeleteData';

export const DialogDeleteContext = createContext<DialogDeleteData>({
  title: '',
  textDelete: '',
  question: '',
  onDelete: () => {},
});

export const useDialogDelete = () => useContext(DialogDeleteContext);
