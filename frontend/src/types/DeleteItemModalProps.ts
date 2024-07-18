/**
 * Props for the DeleteItemModal component
 */
export interface DeleteItemModalProps {
  open: boolean;
  handleClose: () => void;
  onDelete: () => void;
}
