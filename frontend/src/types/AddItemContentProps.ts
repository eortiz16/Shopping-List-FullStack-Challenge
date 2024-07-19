import { Item } from './Item';

/**
 * Props for the AddItemContent component
 */
export interface AddItemContentProps {
  handleCancel: () => void;
  handleAddItem: (item: Omit<Item, 'id' | 'purchased'>) => void;
}
