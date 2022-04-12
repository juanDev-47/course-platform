export type TableContextType = {
  title?: string;
  textDelete?: string;
  question?: string;
  onDelete?: (id: string) => void;
  onViewNotes?: (id: string) => void;
  onClickItem?: (id: string) => void;
};
