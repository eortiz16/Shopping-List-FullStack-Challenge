import { Item } from "./Item";

export interface EditItemModalProps {
  open: boolean;
  handleClose: () => void;
  item: Item;
}
