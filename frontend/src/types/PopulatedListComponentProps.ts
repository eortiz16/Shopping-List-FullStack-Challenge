import { Item } from './Item';

/**
 * Props for the PopulatedListComponent
 */
export interface PopulatedListComponentProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  handleOpenAdd: () => void;
  handleDeleteItem: (_: number) => void;
  handleEditItem: (id: number, item: Partial<Item>) => void;
}
