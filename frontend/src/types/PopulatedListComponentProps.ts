import { Item } from './Item';

/**
 * Props for the PopulatedListComponent
 */
export interface PopulatedListComponentProps {
  items: Item[];
  handleOpenAdd: () => void;
  handleOpenDelete: (item: Item) => void;
  handleOpenEdit: (item: Item) => void;
  handlePurchased: (id: number) => void;
}
