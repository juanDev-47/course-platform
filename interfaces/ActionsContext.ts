export type ActionsContextType = {
  title: string;
  textDelete: string;
  question: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};
