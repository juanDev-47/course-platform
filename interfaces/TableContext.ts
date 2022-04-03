export type TableContextType = {
  title?: string;
  textDelete?: string;
  question?: string;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onClickItem?: (id: string) => void;
};
