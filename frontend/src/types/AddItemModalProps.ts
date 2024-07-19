import { Item } from './Item';

/**
 * Props for the AddItemModal component
 */
export interface AddItemModalProps {
  open: boolean;
  handleClose: () => void;
  handleAddItem: (_: Item) => void;
}
