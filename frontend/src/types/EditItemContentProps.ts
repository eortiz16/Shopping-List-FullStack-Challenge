import { Item } from './Item';

/**
 * Props for the EditItemContent component
 */
export interface EditItemContentProps {
  handleCancel: () => void;
  handleEditItem: (id: number, item: Partial<Item>) => void;
  item: Item;
}
