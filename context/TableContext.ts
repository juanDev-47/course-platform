import { createContext, useContext } from 'react';
import { TableContextType } from 'interfaces/TableContext';

export const TableContext = createContext<TableContextType>({
  title: '',
  textDelete: '',
  question: '',
  onDelete: () => {},
  onViewNotes: () => {},
  onClickItem: () => {},
});

export const useTableContext = () => useContext(TableContext);
