import { createContext, useContext } from 'react';
import { ActionsContextType } from 'interfaces/ActionsContext';

export const ActionsContext = createContext<ActionsContextType>({
  title: '',
  textDelete: '',
  question: '',
  onDelete: () => {},
  onEdit: () => {},
});

export const useActionsContext = () => useContext(ActionsContext);
