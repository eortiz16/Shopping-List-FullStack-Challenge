import { Item } from "./Item";

/**
 * Props for the EditItemContent component
 */
export interface EditItemContentProps {
  handleCancel: () => void;
  item: Item;
}
