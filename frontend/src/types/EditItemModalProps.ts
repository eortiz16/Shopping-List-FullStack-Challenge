import { Item } from "./Item";

/**
 * Props for the EditItemModal component
 */
export interface EditItemModalProps {
  open: boolean;
  handleClose: () => void;
  item: Item;
}
